/*!
 * SplitPay QR - Presents bank-transfer details with device-local copy actions.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
"use client";
import { Check, Copy, Landmark } from "lucide-react";
import { useState } from "react";
type Details = { holder: string; account: string; ifsc: string; bank: string };
export function BankCard({ details }: { details: Details }) { const [copied, setCopied] = useState(""); const copy = async (value: string, label: string) => { await navigator.clipboard?.writeText(value); setCopied(label); setTimeout(() => setCopied(""), 1600); }; const row = (label: string, value: string) => <div className="flex items-center justify-between gap-3 border-t border-white/15 py-3"><div className="min-w-0"><p className="text-xs muted">{label}</p><p className="mono truncate font-semibold">{value}</p></div><button className="button secondary !p-2" onClick={() => copy(value, label)} aria-label={`Copy ${label}`}>{copied === label ? <Check size={16} className="text-emerald-500"/> : <Copy size={16}/>}</button></div>; return <article className="ticket rounded-3xl p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/20 text-cyan-700 dark:text-cyan-200"><Landmark size={20}/></span><div><p className="font-bold">Bank transfer</p><p className="text-xs muted">NEFT · IMPS · RTGS</p></div></div><div className="mt-4">{row("Account holder", details.holder)}{row("Account number", details.account)}{row("IFSC", details.ifsc)}{details.bank && row("Bank", details.bank)}</div></article>; }
