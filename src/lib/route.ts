/*!
 * SplitPay QR - Recommends a collection route without guaranteeing savings.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import type { FeeOptions } from "./fees";

export type Route = "single-qr" | "bank-transfer" | "split-qr";
export type RouteRecommendation = { route: Route; reason: string; estimatedSavingPaise: number };
export const maxPerQrPaise = 199_900;

export function recommendRoute(amountPaise: number, hasBankDetails: boolean, options: FeeOptions = {}, qrLimitPaise = maxPerQrPaise): RouteRecommendation {
  if (amountPaise <= qrLimitPaise) return { route: "single-qr", reason: "One QR is the simplest way for this amount.", estimatedSavingPaise: 0 };
  if (hasBankDetails) return {
    route: "bank-transfer",
    reason: "Bank transfer avoids repeated QR scans; check your bank's transfer charges.",
    estimatedSavingPaise: 0
  };
  return { route: "split-qr", reason: "Bank details are not available. Splitting needs several scans and does not remove applicable fees.", estimatedSavingPaise: 0 };
}
