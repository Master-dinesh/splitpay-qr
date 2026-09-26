/*!
 * SplitPay QR - Renders a safe, high-contrast UPI QR payment ticket.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
"use client";
import { useEffect, useState } from "react";
import { Download, LoaderCircle } from "lucide-react";
import { formatRupees } from "@/lib/validators";

export function QrCard({ link, name, vpa, paise, index, total }: { link: string; name: string; vpa: string; paise: number | null; index: number; total: number }) {
  const [image, setImage] = useState(""); const safePaise = paise ?? 0;
  useEffect(() => { let live = true; import("qrcode").then(({ toDataURL }) => toDataURL(link, { errorCorrectionLevel: "M", margin: 2, width: 640, color: { dark: "#000000", light: "#ffffff" } })).then((url) => live && setImage(url)); return () => { live = false; }; }, [link]);
  const download = () => { const a = document.createElement("a"); a.href = image; a.download = `splitpay-qr-${index}.png`; a.click(); };
  return <article className="ticket print-qr rounded-3xl p-5" id={`qr-${index}`}><div className="flex items-center justify-between"><span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-200">Payment {index} of {total}</span><span className="text-xs muted">Works with any UPI app</span></div><div className="my-5 grid place-items-center">{image ? <div className="qr-white"><img src={image} alt={`UPI QR for ${name}, ${formatRupees(safePaise)}`} width="240" height="240" className="aspect-square h-auto w-full max-w-60"/></div> : <div className="grid aspect-square w-full max-w-60 place-items-center rounded-2xl bg-white"><LoaderCircle className="animate-spin text-indigo-500"/></div>}</div><p className="text-center text-xs muted">Paying {name}</p><p className="mono mt-1 text-center text-lg font-bold">{formatRupees(safePaise)}</p><p className="mono mt-1 truncate text-center text-xs muted">{vpa}</p><button className="button secondary no-print mt-5 w-full" onClick={download} disabled={!image}><Download size={16}/>Download PNG</button></article>;
}
