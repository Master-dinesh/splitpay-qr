/*!
 * SplitPay QR - Switches the local visual theme with accessible state labels.
 * Author: Dinesh Suresh
 * Copyright (c) 2026 Dinesh Suresh
 * SPDX-License-Identifier: MIT
 * Licensed under the MIT License (see the LICENSE file in the project root).
 * This file may be copied and reused freely, provided this notice is kept.
 */
"use client";
import { Moon, Sun } from "lucide-react";
export function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) { return <button className="button secondary" onClick={onToggle} aria-label={dark ? "Use light mode" : "Use dark mode"}>{dark ? <Sun size={17}/> : <Moon size={17}/>}<span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span></button>; }
