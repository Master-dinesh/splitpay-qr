/*!
 * SplitPay QR - Verifies exact UPI, fee, split and validation logic.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import { describe, expect, it } from "vitest";
import { estimateMdr } from "@/lib/fees";
import { splitAmount } from "@/lib/split";
import { buildUpiLink } from "@/lib/upi";
import { maxPerQrPaise, recommendRoute } from "@/lib/route";
import { isValidIfsc, isValidUpi, parseAmountToPaise } from "@/lib/validators";

describe("exact payment splitting", () => {
  it("splits ₹4,500 into parts that sum exactly", () => { const result = splitAmount(450_000, 199_900); expect(result.parts.reduce((a, b) => a + b, 0)).toBe(450_000); });
  it("splits ₹3,000 evenly or max-first", () => { expect(splitAmount(300_000, 199_900).parts).toEqual([150_000, 150_000]); expect(splitAmount(300_000, 199_900, "max-first").parts).toEqual([199_900, 100_100]); });
  it("keeps ₹1,999 as one QR and splits ₹2,000", () => { expect(splitAmount(199_900, 199_900).parts).toHaveLength(1); expect(splitAmount(200_000, 199_900).parts).toHaveLength(2); });
});
describe("payment route boundary", () => {
  it("uses one QR at the limit and recommends bank details above it when available", () => {
    expect(recommendRoute(maxPerQrPaise, false).route).toBe("single-qr");
    expect(recommendRoute(maxPerQrPaise + 1, true).route).toBe("bank-transfer");
    expect(recommendRoute(maxPerQrPaise + 1, false).route).toBe("split-qr");
  });
});
describe("fee estimate", () => {
  it.each([[200_000, 0], [300_000, 1_200], [500_000, 2_000], [5_000_000, 20_000], [10_000_000, 30_000]])("estimates ₹%i as %i paise", (amount, expected) => expect(estimateMdr(amount).feePaise).toBe(expected));
  it("honours the eligible merchant toggle", () => expect(estimateMdr(500_000, { eligibleSmallMerchant: true }).feePaise).toBe(0));
});
describe("safe links and validation", () => {
  it("encodes special UPI values", () => expect(buildUpiLink({ vpa: "hi.there@bank", name: "A & B", amountPaise: 12345, note: "Tea & cake" })).toContain("pn=A%20%26%20B"));
  it("rejects invalid UPI IDs, IFSC codes and amounts", () => { expect(isValidUpi("bad@1")).toBe(false); expect(isValidUpi("a@bank")).toBe(false); expect(isValidIfsc("hdfc0123456")).toBe(true); expect(isValidIfsc("HDFC1123456")).toBe(false); expect(parseAmountToPaise("0")).toBeNull(); expect(parseAmountToPaise("1.999")).toBeNull(); expect(parseAmountToPaise("199901")).toBeNull(); });
});
