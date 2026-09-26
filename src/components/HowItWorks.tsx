/*!
 * SplitPay QR - Offers a concise privacy-first explanation in a modal dialog.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
"use client";
import { X, CircleHelp } from "lucide-react";
import feeConfig from "@/config/fees.json";

export function HowItWorks({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-slate-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="how-title">
      <section className="glass card w-full max-w-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <CircleHelp className="text-indigo-500" />
            <h2 id="how-title" className="headline mt-3 text-2xl font-bold">How it works</h2>
          </div>
          <button className="button secondary" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mt-5 space-y-4 leading-6 muted">
          <p>Each QR contains only a UPI payment link. It asks a payer&apos;s UPI app to send money directly to the UPI ID you entered.</p>
          <p>SplitPay QR runs entirely in this browser. It never sees, moves, stores remotely, or verifies payments.</p>
          <p>The merchant-fee figure is an illustrative estimate using configured assumptions: {feeConfig.mdrPercent}% above ₹{feeConfig.thresholdRupees.toLocaleString("en-IN")}, capped at ₹{feeConfig.capRupees}, from {feeConfig.effectiveFrom}. It is not a quote; the merchant&apos;s bank or payment provider sets actual fees.</p>
          <p>This page does not add the estimated merchant fee to the QR amount. Review any charges shown in your UPI app. Bank-transfer charges vary by bank and account. Split payments do not remove fees and may be restricted by your bank.</p>
        </div>
      </section>
    </div>
  );
}
