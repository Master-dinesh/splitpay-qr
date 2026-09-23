# SplitPay QR

A free, static, privacy-first helper for requesting UPI payments in India. It generates standard UPI QR codes locally in the browser and can suggest sharing bank-transfer details for larger amounts. It never moves money, verifies a payment, or promises fee savings.

## Setup

This project uses **npm** and Node.js 24 (see `.nvmrc`). The project-local Python environment was created without pip because Python 3.14's bundled `ensurepip` failed on this machine; it is not used by the Next.js app.

```powershell
cd F:\UPI
.\.venv\Scripts\Activate.ps1
npm install
npm run dev
```

If PowerShell blocks activation for the current session, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

Run checks and create the static deployment folder:

```powershell
npm test
npm run build
```

`next build` produces the fully static `out` folder. `npm install` creates and commits `package-lock.json` on the machine where dependencies are installed.

## How the logic works

- Every monetary value is represented as integer paise. Decimal user input is parsed into paise before calculations.
- Small requests (up to ₹1,999) use one QR. Larger requests can be split exactly into multiple QR amounts, with an optional max-first strategy in `src/lib/split.ts`.
- Fee estimates come from `src/config/fees.json`; they are illustrative merchant-side estimates only. Set the published values and `effectiveFrom` there when rules change.
- UPI links encode only the entered VPA, name, amount, and note. All processing and optional remembered details stay in the browser.

## Deploy

Build first with `npm run build`, then publish the contents of `out`.

- **Vercel:** import the repository; build command `npm run build`, output directory `out`.
- **Netlify:** build command `npm run build`, publish directory `out`.
- **Cloudflare Pages:** build command `npm run build`, build output directory `out`, Node version 24.

## Manual test checklist

- Test a ₹1 payment in GPay, PhonePe, and Paytm, confirming the name in each UPI app.
- Check print preview and the downloaded PNG/PDF sheet.
- Test light and dark modes, reduced-motion settings, mobile Safari, and Chrome.
- Confirm remembered data remains only on the same browser, and that **Clear** removes it.

## Author and License

Copyright (c) 2026 Dinesh Suresh. Licensed under the [MIT License](LICENSE). Others may copy and reuse this code provided the copyright notice is kept.
