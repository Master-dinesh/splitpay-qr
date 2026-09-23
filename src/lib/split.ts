/*!
 * SplitPay QR - Splits a paise amount exactly across safe QR payment parts.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
export type SplitStrategy = "even" | "max-first";
export type SplitResult = { parts: number[]; exceedsCap: boolean };

export function splitAmount(totalPaise: number, maxPerQrPaise: number, strategy: SplitStrategy = "even", maxQrs = 10): SplitResult {
  if (!Number.isInteger(totalPaise) || !Number.isInteger(maxPerQrPaise) || totalPaise <= 0 || maxPerQrPaise <= 0) {
    return { parts: [], exceedsCap: false };
  }
  const count = Math.ceil(totalPaise / maxPerQrPaise);
  if (count > maxQrs) return { parts: [], exceedsCap: true };
  if (strategy === "max-first") {
    const parts = Array.from({ length: count }, (_, index) => index === count - 1 ? totalPaise - maxPerQrPaise * (count - 1) : maxPerQrPaise);
    return { parts, exceedsCap: false };
  }
  const base = Math.floor(totalPaise / count);
  const remainder = totalPaise % count;
  return { parts: Array.from({ length: count }, (_, index) => base + (index < remainder ? 1 : 0)), exceedsCap: false };
}
