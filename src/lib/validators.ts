/*!
 * SplitPay QR - Validates and converts receiver-provided payment information.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
export const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
export const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export const isValidUpi = (value: string) => upiPattern.test(value.trim());
export const isValidIfsc = (value: string) => ifscPattern.test(value.trim().toUpperCase());
export const isValidAccountNumber = (value: string) => /^\d{9,18}$/.test(value.trim());
export const isValidName = (value: string) => value.trim().length >= 2 && value.trim().length <= 50;

/** Converts a decimal rupee string to paise without using floating-point money. */
export function parseAmountToPaise(value: string): number | null {
  const match = value.trim().match(/^(\d+)(?:\.(\d{1,2}))?$/);
  if (!match) return null;
  const rupees = Number(match[1]);
  const paise = Number((match[2] ?? "").padEnd(2, "0"));
  if (!Number.isSafeInteger(rupees) || rupees < 0) return null;
  const total = rupees * 100 + paise;
  return total > 0 && total <= 19_990_000 ? total : null;
}

export const formatRupees = (paise: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(paise / 100);
