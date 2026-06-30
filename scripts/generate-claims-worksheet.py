#!/usr/bin/env python3

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo


ROOT = Path(__file__).resolve().parent.parent
MATRIX_PATH = ROOT / "lib" / "claims" / "deduction-matrix.json"
OUTPUT_PATH = ROOT / "public" / "retailer-deduction-triage-worksheet.xlsx"
FIXED_ZIP_TIME = (1980, 1, 1, 0, 0, 0)
FIXED_ISO_TIME = "2026-06-30T00:00:00Z"


def excel_column_name(index: int) -> str:
    result = ""
    while index > 0:
        index, remainder = divmod(index - 1, 26)
        result = chr(65 + remainder) + result
    return result


def xml_text(value: object) -> str:
    return escape("" if value is None else str(value))


def inline_string_cell(ref: str, value: object, style: int | None = None) -> str:
    style_attr = f' s="{style}"' if style is not None else ""
    return f'<c r="{ref}" t="inlineStr"{style_attr}><is><t>{xml_text(value)}</t></is></c>'


def number_cell(ref: str, value: int | float, style: int | None = None) -> str:
    style_attr = f' s="{style}"' if style is not None else ""
    return f'<c r="{ref}"{style_attr}><v>{value}</v></c>'


def formula_cell(ref: str, formula: str, style: int | None = None) -> str:
    style_attr = f' s="{style}"' if style is not None else ""
    return f'<c r="{ref}"{style_attr}><f>{xml_text(formula)}</f></c>'


def row_xml(row_number: int, cells: list[str]) -> str:
    return f'<row r="{row_number}">{"".join(cells)}</row>'


def build_start_here_sheet() -> str:
    rows = [
        row_xml(
            1,
            [
                inline_string_cell("A1", "Retailer deduction triage worksheet", 1),
                inline_string_cell("B1", "Use the Claim Ledger tab for live line items.", 2),
            ],
        ),
        row_xml(
            2,
            [
                inline_string_cell("A2", "Purpose", 1),
                inline_string_cell(
                    "B2",
                    "Triage remittance, debit note, or portal lines as supportable, missing proof, worth challenging, or Code risk.",
                    2,
                ),
            ],
        ),
        row_xml(
            3,
            [
                inline_string_cell("A3", "Method", 1),
                inline_string_cell(
                    "B3",
                    "Pick the deduction type, enter delivery and claim dates, and let the matrix formulas fill the baseline verdict, evidence, Code check, and neutral query.",
                    2,
                ),
            ],
        ),
        row_xml(
            4,
            [
                inline_string_cell("A4", "Timing", 1),
                inline_string_cell(
                    "B4",
                    "Shortfall and damaged-goods lines flag when the claim date is more than 30 days after delivery.",
                    2,
                ),
            ],
        ),
        row_xml(
            5,
            [
                inline_string_cell("A5", "Coverage", 1),
                inline_string_cell(
                    "B5",
                    "The Deduction Type Matrix tab mirrors the JSON matrix used on the claims pages.",
                    2,
                ),
            ],
        ),
    ]
    return worksheet_xml(
        rows=rows,
        columns=[
            (1, 1, 26),
            (2, 2, 120),
        ],
    )


def build_ledger_sheet(matrix_length: int) -> str:
    headers = [
        "Retailer",
        "Invoice / remittance date",
        "Delivery date",
        "Claim raised date",
        "Deduction type",
        "Reason note",
        "Amount",
        "Verdict",
        "Evidence",
        "Code check",
        "Neutral query",
        "Gap",
        "Priority",
        "Owner",
        "Status",
    ]
    rows = [row_xml(1, [inline_string_cell(f"{excel_column_name(i)}1", label, 1) for i, label in enumerate(headers, start=1)])]

    last_matrix_row = matrix_length + 1
    matrix_id_range = f"'Deduction Type Matrix'!$A$2:$A${last_matrix_row}"
    verdict_range = f"'Deduction Type Matrix'!$C$2:$C${last_matrix_row}"
    evidence_range = f"'Deduction Type Matrix'!$D$2:$D${last_matrix_row}"
    code_check_range = f"'Deduction Type Matrix'!$E$2:$E${last_matrix_row}"
    query_range = f"'Deduction Type Matrix'!$F$2:$F${last_matrix_row}"

    for row_number in range(2, 42):
        match_formula = f'MATCH($E{row_number},{matrix_id_range},0)'
        verdict_formula = f'IF($E{row_number}="","",INDEX({verdict_range},{match_formula}))'
        evidence_formula = f'IF($E{row_number}="","",INDEX({evidence_range},{match_formula}))'
        code_check_formula = f'IF($E{row_number}="","",INDEX({code_check_range},{match_formula}))'
        query_formula = f'IF($E{row_number}="","",INDEX({query_range},{match_formula}))'
        deadline_formula = (
            f'IF(AND(OR($E{row_number}="shortfall",$E{row_number}="damaged-goods"),'
            f'$C{row_number}<>"",$D{row_number}<>"",$D{row_number}-$C{row_number}>30),'
            '"Claim raised more than 30 days after delivery.",'
            f'IF($H{row_number}="missing proof","Await line-level proof from the retailer.",'
            f'IF($H{row_number}="Code risk","Check Code coverage, agreement basis, and retailer conditions.",'
            f'IF($H{row_number}="worth challenging","Reconcile this line against prior credits, timing, and support.",""))))'
        )
        priority_formula = (
            f'IF($E{row_number}="","",'
            f'IF(AND(OR($E{row_number}="shortfall",$E{row_number}="damaged-goods"),$C{row_number}<>"",$D{row_number}<>"",$D{row_number}-$C{row_number}>30),"High",'
            f'IF(OR($H{row_number}="Code risk",$G{row_number}>=5000),"High",'
            f'IF(OR($H{row_number}="missing proof",$G{row_number}>=1000),"Medium","Low"))))'
        )
        rows.append(
            row_xml(
                row_number,
                [
                    inline_string_cell(f"A{row_number}", ""),
                    inline_string_cell(f"B{row_number}", "", 4),
                    inline_string_cell(f"C{row_number}", "", 4),
                    inline_string_cell(f"D{row_number}", "", 4),
                    inline_string_cell(f"E{row_number}", ""),
                    inline_string_cell(f"F{row_number}", "", 2),
                    number_cell(f"G{row_number}", 0, 3),
                    formula_cell(f"H{row_number}", verdict_formula),
                    formula_cell(f"I{row_number}", evidence_formula, 2),
                    formula_cell(f"J{row_number}", code_check_formula, 2),
                    formula_cell(f"K{row_number}", query_formula, 2),
                    formula_cell(f"L{row_number}", deadline_formula, 2),
                    formula_cell(f"M{row_number}", priority_formula),
                    inline_string_cell(f"N{row_number}", ""),
                    inline_string_cell(f"O{row_number}", ""),
                ],
            )
        )

    return worksheet_xml(
        rows=rows,
        columns=[
            (1, 1, 18),
            (2, 4, 18),
            (5, 5, 20),
            (6, 6, 28),
            (7, 7, 14),
            (8, 8, 18),
            (9, 11, 34),
            (12, 12, 32),
            (13, 15, 16),
        ],
        freeze_ref="A2",
    )


def build_matrix_sheet(matrix: list[dict[str, object]]) -> str:
    headers = [
        "id",
        "label",
        "default verdict",
        "short evidence",
        "Code check",
        "neutral query",
        "deadline helper",
        "family",
        "deadline rule",
        "deadline days",
    ]
    rows = [row_xml(1, [inline_string_cell(f"{excel_column_name(i)}1", label, 1) for i, label in enumerate(headers, start=1)])]

    for row_number, item in enumerate(matrix, start=2):
        deadline_rule = item.get("deadlineRule") or {}
        rows.append(
            row_xml(
                row_number,
                [
                    inline_string_cell(f"A{row_number}", item.get("id", "")),
                    inline_string_cell(f"B{row_number}", item.get("label", "")),
                    inline_string_cell(f"C{row_number}", item.get("defaultVerdict", "")),
                    inline_string_cell(f"D{row_number}", item.get("shortEvidence", ""), 2),
                    inline_string_cell(f"E{row_number}", item.get("codeCheck", ""), 2),
                    inline_string_cell(f"F{row_number}", item.get("neutralQuery", ""), 2),
                    inline_string_cell(f"G{row_number}", item.get("deadlineHelper", ""), 2),
                    inline_string_cell(f"H{row_number}", item.get("family", "")),
                    inline_string_cell(f"I{row_number}", deadline_rule.get("kind", "")),
                    inline_string_cell(f"J{row_number}", deadline_rule.get("days", "")),
                ],
            )
        )

    return worksheet_xml(
        rows=rows,
        columns=[
            (1, 1, 22),
            (2, 2, 24),
            (3, 3, 18),
            (4, 7, 42),
            (8, 8, 22),
            (9, 10, 16),
        ],
        freeze_ref="A2",
    )


def build_summary_sheet() -> str:
    rows = [
        row_xml(
            1,
            [
                inline_string_cell("A1", "Verdict", 1),
                inline_string_cell("B1", "Total amount", 1),
            ],
        ),
    ]

    verdicts = ["supportable", "missing proof", "worth challenging", "Code risk"]
    for row_number, verdict in enumerate(verdicts, start=2):
        rows.append(
            row_xml(
                row_number,
                [
                    inline_string_cell(f"A{row_number}", verdict),
                    formula_cell(
                        f"B{row_number}",
                        f'SUMIF(\'Claim Ledger\'!$H$2:$H$41,A{row_number},\'Claim Ledger\'!$G$2:$G$41)',
                        3,
                    ),
                ],
            )
        )

    rows.extend(
        [
            row_xml(7, [inline_string_cell("A7", "Claims Desk handoff", 1)]),
            row_xml(
                8,
                [
                    inline_string_cell(
                        "A8",
                        "Send one redacted remittance with claim IDs, line notes, evidence gaps, and the neutral query text you want reviewed.",
                        2,
                    )
                ],
            ),
        ]
    )

    return worksheet_xml(
        rows=rows,
        columns=[
            (1, 1, 24),
            (2, 2, 18),
        ],
    )


def worksheet_xml(rows: list[str], columns: list[tuple[int, int, int]], freeze_ref: str | None = None) -> str:
    sheet_views = '<sheetViews><sheetView workbookViewId="0"/></sheetViews>'
    if freeze_ref:
        sheet_views = (
            '<sheetViews><sheetView workbookViewId="0">'
            f'<pane ySplit="1" topLeftCell="{freeze_ref}" activePane="bottomLeft" state="frozen"/>'
            "</sheetView></sheetViews>"
        )

    cols_xml = "".join(
        f'<col min="{start}" max="{end}" width="{width}" customWidth="1"/>'
        for start, end, width in columns
    )
    dimension_ref = f"A1:{max(cell_ref_from_row(row) for row in rows)}"
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<dimension ref="{dimension_ref}"/>'
        f"{sheet_views}"
        f"<cols>{cols_xml}</cols>"
        f"<sheetData>{''.join(rows)}</sheetData>"
        "</worksheet>"
    )


def cell_ref_from_row(row_xml_text: str) -> str:
    marker = ' r="'
    start = row_xml_text.rfind(marker)
    if start == -1:
        return "A1"
    start += len(marker)
    end = row_xml_text.find('"', start)
    return row_xml_text[start:end]


def workbook_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        "<workbookPr/>"
        "<bookViews><workbookView xWindow=\"0\" yWindow=\"0\" windowWidth=\"28800\" windowHeight=\"17280\"/></bookViews>"
        "<sheets>"
        '<sheet name="Start Here" sheetId="1" r:id="rId1"/>'
        '<sheet name="Claim Ledger" sheetId="2" r:id="rId2"/>'
        '<sheet name="Deduction Type Matrix" sheetId="3" r:id="rId3"/>'
        '<sheet name="Summary" sheetId="4" r:id="rId4"/>'
        "</sheets>"
        "<calcPr calcId=\"191029\"/>"
        "</workbook>"
    )


def workbook_rels_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>'
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet3.xml"/>'
        '<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet4.xml"/>'
        '<Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
        "</Relationships>"
    )


def root_rels_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>'
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>'
        "</Relationships>"
    )


def content_types_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>'
        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        '<Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        '<Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        '<Override PartName="/xl/worksheets/sheet4.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        "</Types>"
    )


def app_properties_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" '
        'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">'
        "<Application>Python</Application>"
        "<DocSecurity>0</DocSecurity>"
        "<ScaleCrop>false</ScaleCrop>"
        "<HeadingPairs><vt:vector size=\"2\" baseType=\"variant\">"
        "<vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant>"
        "<vt:variant><vt:i4>4</vt:i4></vt:variant>"
        "</vt:vector></HeadingPairs>"
        "<TitlesOfParts><vt:vector size=\"4\" baseType=\"lpstr\">"
        "<vt:lpstr>Start Here</vt:lpstr>"
        "<vt:lpstr>Claim Ledger</vt:lpstr>"
        "<vt:lpstr>Deduction Type Matrix</vt:lpstr>"
        "<vt:lpstr>Summary</vt:lpstr>"
        "</vt:vector></TitlesOfParts>"
        "<Company>INVARITECH</Company>"
        "<LinksUpToDate>false</LinksUpToDate>"
        "<SharedDoc>false</SharedDoc>"
        "<HyperlinksChanged>false</HyperlinksChanged>"
        "<AppVersion>1.0</AppVersion>"
        "</Properties>"
    )


def core_properties_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/" '
        'xmlns:dcterms="http://purl.org/dc/terms/" '
        'xmlns:dcmitype="http://purl.org/dc/dcmitype/" '
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        "<dc:creator>Codex</dc:creator>"
        "<cp:lastModifiedBy>Codex</cp:lastModifiedBy>"
        "<dcterms:created xsi:type=\"dcterms:W3CDTF\">"
        f"{FIXED_ISO_TIME}"
        "</dcterms:created>"
        "<dcterms:modified xsi:type=\"dcterms:W3CDTF\">"
        f"{FIXED_ISO_TIME}"
        "</dcterms:modified>"
        "<dc:title>Retailer Deduction Triage Worksheet</dc:title>"
        "</cp:coreProperties>"
    )


def styles_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        "<fonts count=\"2\">"
        "<font><sz val=\"11\"/><name val=\"Aptos\"/><family val=\"2\"/></font>"
        "<font><b/><sz val=\"11\"/><name val=\"Aptos\"/><family val=\"2\"/></font>"
        "</fonts>"
        "<fills count=\"3\">"
        "<fill><patternFill patternType=\"none\"/></fill>"
        "<fill><patternFill patternType=\"gray125\"/></fill>"
        "<fill><patternFill patternType=\"solid\"><fgColor rgb=\"FFEFEDE8\"/><bgColor indexed=\"64\"/></patternFill></fill>"
        "</fills>"
        "<borders count=\"1\"><border><left/><right/><top/><bottom/><diagonal/></border></borders>"
        "<cellStyleXfs count=\"1\"><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\"/></cellStyleXfs>"
        "<cellXfs count=\"5\">"
        "<xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\" xfId=\"0\"/>"
        "<xf numFmtId=\"0\" fontId=\"1\" fillId=\"2\" borderId=\"0\" xfId=\"0\" applyFont=\"1\" applyFill=\"1\"/>"
        "<xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\" xfId=\"0\" applyAlignment=\"1\"><alignment wrapText=\"1\" vertical=\"top\"/></xf>"
        "<xf numFmtId=\"4\" fontId=\"0\" fillId=\"0\" borderId=\"0\" xfId=\"0\" applyNumberFormat=\"1\"/>"
        "<xf numFmtId=\"14\" fontId=\"0\" fillId=\"0\" borderId=\"0\" xfId=\"0\" applyNumberFormat=\"1\"/>"
        "</cellXfs>"
        "<cellStyles count=\"1\"><cellStyle name=\"Normal\" xfId=\"0\" builtinId=\"0\"/></cellStyles>"
        "</styleSheet>"
    )


def load_matrix() -> list[dict[str, object]]:
    return json.loads(MATRIX_PATH.read_text(encoding="utf8"))


def write_entry(zip_file: ZipFile, path: str, content: str) -> None:
    info = ZipInfo(path, FIXED_ZIP_TIME)
    info.compress_type = ZIP_DEFLATED
    info.create_system = 0
    info.external_attr = 0
    zip_file.writestr(info, content.encode("utf-8"))


def generate_workbook() -> None:
    matrix = load_matrix()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    with ZipFile(OUTPUT_PATH, "w") as zip_file:
        write_entry(zip_file, "[Content_Types].xml", content_types_xml())
        write_entry(zip_file, "_rels/.rels", root_rels_xml())
        write_entry(zip_file, "docProps/app.xml", app_properties_xml())
        write_entry(zip_file, "docProps/core.xml", core_properties_xml())
        write_entry(zip_file, "xl/_rels/workbook.xml.rels", workbook_rels_xml())
        write_entry(zip_file, "xl/styles.xml", styles_xml())
        write_entry(zip_file, "xl/workbook.xml", workbook_xml())
        write_entry(zip_file, "xl/worksheets/sheet1.xml", build_start_here_sheet())
        write_entry(zip_file, "xl/worksheets/sheet2.xml", build_ledger_sheet(len(matrix)))
        write_entry(zip_file, "xl/worksheets/sheet3.xml", build_matrix_sheet(matrix))
        write_entry(zip_file, "xl/worksheets/sheet4.xml", build_summary_sheet())


if __name__ == "__main__":
    generate_workbook()
