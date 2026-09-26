/*!
 * SplitPay QR - Visualizes an estimated UPI fee beside a zero-fee bank transfer.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import { formatRupees } from "@/lib/validators";

export function FeeCompare({ feePaise }: { feePaise: number }) {
  const width = Math.min(100, Math.max(4, feePaise / 300));
  return (
    <section className="mt-4 rounded-2xl border border-white/30 bg-white/35 p-4 dark:bg-slate-950/30">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold">Who pays what</h3>
        <span className="rounded-full bg-indigo-500/12 px-2 py-1 text-[11px] font-bold text-indigo-700 dark:text-cyan-300">Illustrative estimate</span>
      </div>
      <div className="mt-4 space-y-3 text-sm">
        <div>
          <div className="mb-1 flex justify-between"><span>Extra fee added by this QR</span><b>₹0.00</b></div>
          <div className="bar"><span className="!bg-emerald-500" style={{ width: "3%" }} /></div>
        </div>
        <div>
          <div className="mb-1 flex justify-between"><span>Merchant UPI (est. MDR)</span><b>{formatRupees(feePaise)}</b></div>
          <div className="bar"><span style={{ width: `${width}%` }} /></div>
        </div>
        <div>
          <div className="mb-1 flex justify-between"><span>Bank transfer charges</span><b>Varies*</b></div>
          <div className="bar"><span className="!bg-emerald-500" style={{ width: "3%" }} /></div>
        </div>
      </div>
      <p className="mt-3 text-xs muted">The QR does not add the estimated merchant fee to the payer&apos;s amount. Actual merchant and bank-transfer fees vary by provider and account. *Check your bank&apos;s NEFT/IMPS terms.</p>
    </section>
  );
}
