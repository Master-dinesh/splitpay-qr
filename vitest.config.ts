/*!
 * SplitPay QR - Configures the browser-like Vitest test environment.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"] },
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } }
});
