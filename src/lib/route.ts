/*!
 * SplitPay QR - Recommends a collection route without guaranteeing savings.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import { estimateMdr, type FeeOptions } from "./fees";

export type Route = "single-qr" | "bank-transfer" | "split-qr";
export type RouteRecommendation = { route: Route; reason: string; estimatedSavingPaise: number };

export function recommendRoute(amountPaise: number, hasBankDetails: boolean, options: FeeOptions = {}, maxPerQrPaise = 199_900): RouteRecommendation {
  const fee = estimateMdr(amountPaise, options).feePaise;
  if (amountPaise <= maxPerQrPaise) return { route: "single-qr", reason: "One QR is the simplest way for this amount.", estimatedSavingPaise: 0 };
  if (hasBankDetails) return {
    route: "bank-transfer",
    reason: fee >= 5_000 ? "Bank transfer avoids the estimated merchant fee and keeps payment simple." : "Bank transfer avoids repeated QR scans for the payer.",
    estimatedSavingPaise: fee
  };
  return { route: "split-qr", reason: "Bank details are not available. Splitting needs several payer scans.", estimatedSavingPaise: fee };
}
