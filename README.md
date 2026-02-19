# CoinFlip

A cryptocurrency coin flip betting simulator built as a frontend assessment project.

**Live demo → [coinflip](https://coinflip-ca437.web.app/)**

---

## What it does

- Flip a coin and bet any amount from your balance (50/50 chance, win doubles your bet)
- Three currencies — **BTC**, **ETH**, **SOL** — each with a separate balance
- **Auto Bet** mode with configurable Stop Win / Stop Loss limits
- Live bet history (last 20 bets) and a statistics panel
- Everything persists in `localStorage` — your balance and history survive a refresh

---

## Tech stack

|               |                       |
| ------------- | --------------------- |
| Framework     | React 19 + TypeScript |
| Data fetching | TanStack Query v5     |
| Animations    | Framer Motion         |
| Styling       | SCSS                  |
| Notifications | Sonner                |
| Build         | Vite                  |

---

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Other commands

```bash
npm run build       # Production build
npm run preview     # Preview the production build locally
npm run typecheck   # TypeScript check without emitting
npm run lint        # ESLint
npm run lint:fix    # ESLint with auto-fix
npm run test        # Jest tests
```

---

## How to use

1. **Enter a username** — a popup appears on first visit. Type any name and hit Confirm.
2. **Pick a side** — choose Heads or Tails.
3. **Pick a currency** — select BTC, ETH, or SOL from the tabs.
4. **Set your bet** — type an amount, use the quick-set buttons (5, 25, 100), or use ½ / ×2 / MAX.
5. **Place the bet** — click the Bet button and watch the coin flip.
6. **Auto Bet** — toggle the Auto Bet switch, optionally set a Stop Win and/or Stop Loss threshold, then click Auto Bet. Click Stop at any time to end the session.

Your balance, history, and statistics update automatically after each flip.

---

## Project structure

```
src/
├── app/
│   ├── providers/       # QueryProvider (TanStack Query + global error toasts)
│   └── App.tsx
├── features/
│   ├── auth/            # Login popup, useAuth hook
│   ├── betting/         # Bet controls, amount inputs, auto bet config
│   ├── game/            # Coin animation, useCoinFlip hook
│   ├── history/         # Bet history list
│   └── statistics/      # Stats panel
└── shared/
    ├── api/             # mockApi + localStorage storage layer
    ├── types/           # Shared TypeScript types
    └── ui/              # Header, LoadingPage
```

Architecture follows [Feature-Sliced Design](https://feature-sliced.design/).
