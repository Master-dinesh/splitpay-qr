/*!
 * SplitPay QR - Explains the difference between payer amounts and merchant fees.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import { Shield, Store, Landmark } from "lucide-react";
import feeConfig from "@/config/fees.json";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
function prettyDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

const cards = [
  {
    icon: Shield,
    eyebrow: "Payers",
    title: "The QR adds no fee",
    body: "This page puts no extra charge into the payment amount. Review any charges shown by your UPI app before paying."
  },
  {
    icon: Store,
    eyebrow: "Small shops",
    title: "Merchant fees vary",
    body: "Actual processing fees depend on the merchant's bank or payment provider, payment method, and account terms."
  },
  {
    icon: Landmark,
    eyebrow: "Larger invoices",
    title: "Check transfer costs",
    body: "NEFT, IMPS, and RTGS charges vary by bank and account. Check your bank's terms before choosing a transfer."
  }
] as const;

export function UpiClarity() {
  return (
    <section className="no-print mx-auto mb-10 max-w-5xl" aria-labelledby="upi-clarity-title">
      <div className="overflow-hidden rounded-[28px] border border-white/40 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-[1px] shadow-[0_24px_60px_rgba(99,102,241,.28)]">
        <div className="rounded-[27px] bg-white/90 px-5 py-6 dark:bg-slate-950/90 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[.22em] text-indigo-600 dark:text-cyan-300">FROM {prettyDate(feeConfig.effectiveFrom).toUpperCase()}</p>
              <h2 id="upi-clarity-title" className="headline mt-2 text-2xl font-extrabold sm:text-3xl">UPI news, without the panic.</h2>
              <p className="mt-2 max-w-xl text-sm muted">This page shows an illustrative merchant-fee estimate using the configured assumptions: {feeConfig.mdrPercent}% above ₹{feeConfig.thresholdRupees.toLocaleString("en-IN")}, capped at ₹{feeConfig.capRupees}, from {prettyDate(feeConfig.effectiveFrom)}. Your bank or payment provider sets actual fees; this site never adds a fee to the QR.</p>
            </div>
            <a className="button secondary shrink-0 text-sm" href={feeConfig.sourceUrl} target="_blank" rel="noreferrer">NPCI source</a>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-2xl border border-white/40 bg-white/70 p-4 dark:bg-slate-900/50">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/12 text-indigo-600 dark:text-cyan-300"><Icon size={20} /></span>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[.16em] text-indigo-500">{card.eyebrow}</p>
                  <h3 className="headline mt-1 text-lg font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 muted">{card.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
