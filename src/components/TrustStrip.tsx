/*!
 * SplitPay QR - Shows calm payment safety guidance near generated results.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import { ShieldCheck } from "lucide-react";
export function TrustStrip() { return <aside className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-50/70 p-4 text-sm text-amber-950 dark:bg-amber-400/10 dark:text-amber-100"><div className="flex gap-2"><ShieldCheck size={19} className="mt-.5 shrink-0"/><div><p className="font-bold">Pay safely</p><p className="mt-1">Payers: check the name shown in your UPI app before paying. Test with ₹1 first.</p><p className="mt-1">Estimates only. Fees are decided by your bank or PSP. Not legal or financial advice.</p></div></div></aside>; }
