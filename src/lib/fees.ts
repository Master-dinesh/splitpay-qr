/*!
 * SplitPay QR - Calculates transparent fee estimates in integer paise.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import config from "@/config/fees.json";

export type FeeOptions = { eligibleSmallMerchant?: boolean; categoryFee?: boolean };
export type FeeEstimate = { feePaise: number; baseFeePaise: number; categoryFeePaise: number };

export function estimateMdr(amountPaise: number, options: FeeOptions = {}): FeeEstimate {
  const threshold = config.thresholdRupees * 100;
  if (amountPaise <= threshold || options.eligibleSmallMerchant) return { feePaise: 0, baseFeePaise: 0, categoryFeePaise: 0 };
  const basisPoints = Math.round(config.mdrPercent * 100);
  const baseFeePaise = Math.min(Math.round((amountPaise * basisPoints) / 10_000), config.capRupees * 100);
  const categoryFeePaise = options.categoryFee ? config.flatCategoryFeeRupees * 100 : 0;
  return { feePaise: baseFeePaise + categoryFeePaise, baseFeePaise, categoryFeePaise };
}
