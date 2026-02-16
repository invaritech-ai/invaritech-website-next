
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

const results = [];

function auditFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relPath = path.relative(DIST_DIR, filePath);

    // Regex matchers - simple but effective for static HTML
    const titleMatch = content.match(/<title>([^<]*)<\/title>/);
    const title = titleMatch ? titleMatch[1] : null;

    const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/) || 
                      content.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/);
    const description = descMatch ? descMatch[1] : null;

    const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/) ||
                           content.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/);
    const canonical = canonicalMatch ? canonicalMatch[1] : null;

    const robotsMatch = content.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/);
    const robots = robotsMatch ? robotsMatch[1] : null;

    const issues = [];

    if (!title) issues.push('Missing <title>');
    else if (title.length < 10) issues.push(`Title too short: "${title}"`);
    
    if (!description) issues.push('Missing meta description');
    else if (description.length < 50) issues.push(`Description too short: "${description}"`);

    if (!canonical) issues.push('Missing canonical tag');

    // Check for "Premium Digital Solutions" legacy text
    if (title && title.includes('Premium Digital Solutions')) issues.push('Contains legacy "Premium Digital Solutions" in title');

    // Check for localhost in canonical
    if (canonical && canonical.includes('localhost')) issues.push('Canonical points to localhost');

    results.push({
        file: relPath,
        title,
        description: description ? description.substring(0, 50) + '...' : 'MISSING',
        canonical,
        robots: robots || 'index,follow (default)',
        issues
    });
}

function traverseDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverseDir(fullPath);
        } else if (file.endsWith('.html') && file !== '404.html') {
            auditFile(fullPath);
        }
    }
}

if (!fs.existsSync(DIST_DIR)) {
    console.error(`dist/ directory not found at ${DIST_DIR}`);
    process.exit(1);
}

console.log('Starting metadata audit (Regex Mode)...');
traverseDir(DIST_DIR);

console.log('\n--- AUDIT RESULTS ---\n');
let issuesFound = 0;

results.forEach(res => {
    if (res.issues.length > 0) {
        issuesFound++;
        console.log(`[FAIL] ${res.file}`);
        res.issues.forEach(i => console.log(`  - ${i}`));
        console.log(`  Canonical: ${res.canonical}`);
        console.log('');
    }
});

if (issuesFound === 0) {
    console.log('No metadata issues found!');
} else {
    console.log(`Found issues in ${issuesFound} files.`);
}

// Special check for duplicate Sprint pages
const sprintAlias = results.find(r => r.file.includes('ai-automation-sprint/index.html'));
const sprintService = results.find(r => r.file.includes('services/ai-automation-sprint/index.html'));

console.log('\n--- SPRINT PAGE CHECK ---');
if (sprintAlias) {
    console.log(`Alias Route (/ai-automation-sprint/):`);
    console.log(`  Canonical: ${sprintAlias.canonical}`);
    console.log(`  Robots: ${sprintAlias.robots}`);
} else {
    console.log('Alias route not found (Good if intentional, bad if missing redirection)');
}

if (sprintService) {
    console.log(`Service Route (/services/ai-automation-sprint/):`);
    console.log(`  Canonical: ${sprintService.canonical}`);
} else {
    console.log('Service route not found!');
}
