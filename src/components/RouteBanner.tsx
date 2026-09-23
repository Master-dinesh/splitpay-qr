/*!
 * SplitPay QR - Communicates the current route recommendation clearly.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import { Building2, QrCode, Split } from "lucide-react";
import type { RouteRecommendation } from "@/lib/route";
const icon = { "single-qr": QrCode, "bank-transfer": Building2, "split-qr": Split };
const title = { "single-qr": "One UPI QR is ready", "bank-transfer": "Bank transfer is recommended", "split-qr": "Split QR is available" };
export function RouteBanner({ recommendation }: { recommendation: RouteRecommendation }) { const Icon = icon[recommendation.route]; return <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 p-[1px]"><div className="rounded-[15px] bg-white/90 p-4 dark:bg-slate-950/85"><div className="flex gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20"><Icon size={20}/></span><div><p className="font-bold">{title[recommendation.route]}</p><p className="mt-1 text-sm muted">{recommendation.reason}</p></div></div></div></div>; }
