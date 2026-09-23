/*!
 * SplitPay QR - Visualizes an estimated UPI fee beside a zero-fee bank transfer.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import { formatRupees } from "@/lib/validators";
export function FeeCompare({ feePaise }: { feePaise: number }) { const width = Math.min(100, Math.max(4, feePaise / 300)); return <section className="mt-4 rounded-2xl border border-white/30 bg-white/35 p-4 dark:bg-slate-950/30"><div className="flex items-center justify-between"><h3 className="font-bold">Fee comparison</h3>{feePaise > 0 && <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">Saves about {formatRupees(feePaise)}</span>}</div><div className="mt-4 space-y-3 text-sm"><div><div className="mb-1 flex justify-between"><span>UPI fee (est.)</span><b>{formatRupees(feePaise)}</b></div><div className="bar"><span style={{ width: `${width}%` }}/></div></div><div><div className="mb-1 flex justify-between"><span>Bank transfer</span><b>₹0.00</b></div><div className="bar"><span className="!bg-emerald-500" style={{ width: "3%" }}/></div></div></div><p className="mt-3 text-xs muted">Estimate borne by the merchant, not the payer. Person-to-person transfers are free.</p></section>; }
