/*!
 * SplitPay QR - Defines global metadata, fonts and the application shell.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "SplitPay QR | Collect big payments smartly",
  description: "Generate private UPI payment QR codes or share bank details, entirely in your browser.",
  authors: [{ name: "Dinesh Suresh" }],
  metadataBase: new URL("https://splitpay-qr.example"),
  alternates: { canonical: "/" },
  openGraph: { title: "SplitPay QR", description: "Private, browser-only UPI collection helper.", type: "website" },
  manifest: "/manifest.webmanifest"
};
export const viewport: Viewport = { themeColor: "#0b1020", colorScheme: "light dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
