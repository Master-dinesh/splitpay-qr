/*!
 * SplitPay QR - Builds safe UPI payment deep links from validated values.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
export type UpiInput = { vpa: string; name: string; amountPaise: number | null; note?: string };

const clean = (value: string) => value.replace(/[\u0000-\u001F\u007F]/g, "").trim();

export function buildUpiLink({ vpa, name, amountPaise, note = "" }: UpiInput): string {
  const amount = ((amountPaise ?? 0) / 100).toFixed(2);
  const safeNote = clean(note).slice(0, 50);
  return `upi://pay?pa=${encodeURIComponent(clean(vpa))}&pn=${encodeURIComponent(clean(name))}&am=${amount}&cu=INR&tn=${encodeURIComponent(safeNote)}`;
}
