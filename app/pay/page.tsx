/*!
 * SplitPay QR - Displays a shareable UPI payment request.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import { QrCard } from "@/components/QrCard";
import { AuroraBackground } from "@/components/AuroraBackground";
import { buildUpiLink } from "@/lib/upi";
import { formatRupees, isValidName, isValidUpi, parseAmountToPaise } from "@/lib/validators";

type PaymentRequest = { vpa: string; name: string; amountPaise: number; note: string };

export default function PaymentPage() {
  const [request, setRequest] = useState<PaymentRequest | null>(null);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vpa = params.get("vpa")?.trim() ?? "";
    const name = params.get("name")?.trim() ?? "";
    const amountPaise = parseAmountToPaise(params.get("amount") ?? "");
    if (!isValidUpi(vpa) || !isValidName(name) || !amountPaise) {
      setInvalid(true);
      return;
    }
    setRequest({ vpa, name, amountPaise, note: (params.get("note") ?? "").slice(0, 50) });
  }, []);

  const upiLink = request ? buildUpiLink({ ...request }) : "";

  return <main className="relative min-h-screen">
    <AuroraBackground />
    <div className="shell mx-auto max-w-3xl">
      <header className="flex items-center justify-between py-3">
        <a href="/" className="headline text-lg font-extrabold">SplitPay <span className="text-indigo-500">QR</span></a>
        <a href="/" className="button secondary text-sm"><ArrowLeft size={16} />Create request</a>
      </header>
      {!request && !invalid ? <section className="glass card mt-12 p-8 text-center" aria-live="polite">Loading payment request…</section> : invalid ? <section className="glass card mt-12 p-8 text-center">
        <h1 className="headline text-2xl font-bold">This payment link is invalid</h1>
        <p className="muted mt-2">Ask the sender to create and share a new payment request.</p>
      </section> : request && <section className="glass card mt-8 p-5 sm:p-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-cyan-300">Payment request</p>
          <h1 className="headline mt-3 text-3xl font-extrabold">{request.name}</h1>
          <p className="mono mt-2 text-4xl font-bold">{formatRupees(request.amountPaise)}</p>
          {request.note && <p className="muted mt-3">{request.note}</p>}
          <p className="mono mt-3 text-sm muted">{request.vpa}</p>
        </div>
        <div className="mx-auto mt-6 max-w-sm">
          <QrCard link={upiLink} name={request.name} vpa={request.vpa} paise={request.amountPaise} index={1} total={1} />
        </div>
        <a className="button primary mt-5 w-full" href={upiLink}><ArrowUpRight size={18} />Open in UPI app</a>
        <p className="muted mt-4 flex items-start justify-center gap-2 text-center text-xs"><ShieldCheck size={16} className="shrink-0" />Review the recipient and amount in your UPI app before paying. This page does not verify payment.</p>
      </section>}
    </div>
  </main>;
}