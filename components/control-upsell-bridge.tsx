import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ControlUpsellBridge() {
  return (
    <div className="mt-12 space-y-6 border border-primary/30 bg-primary/5 p-8 rounded-lg">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-3">
          All controls shown above.
        </h3>
        <p className="text-sm leading-relaxed text-foreground-subtle mb-4">
          These are the exception types and control rules we recommend for your industry and risk profile. The next step is encoding these into your actual workflow—connected to Xero, MYOB, NetSuite, or your internal systems, with exception monitoring and audit trails.
        </p>
        <p className="text-sm leading-relaxed text-foreground-subtle">
          <strong>Have custom rules unique to your business?</strong> We encode those too. (SaaS tools can&apos;t do this.)
        </p>
      </div>

      <Link
        href="/contact?audit=1&src=control-upsell"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-foreground hover:text-background transition-colors font-semibold"
      >
        Let&apos;s build this for your team
        <ArrowRight className="w-4 h-4" />
      </Link>

      <p className="text-xs text-foreground-subtle">
        Or explore more controls — adjust filters above.
      </p>
    </div>
  );
}
