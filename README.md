# Ziwatoon — React Native (Expo) App

## Quick Start

```bash
cd ZiwatoonApp
npm install
npx expo start
```

Press **a** for Android emulator, **i** for iOS simulator, or scan the QR code with the Expo Go app.

## Logo Asset

Place your candle image at:

```
assets/mum.png
```

If the file is missing the app renders a built-in animated candle (CandleLogo.tsx) automatically — no crash.

## Project Structure

```
ZiwatoonApp/
├── App.tsx                        # Entry point
├── app.json                       # Expo config
├── assets/
│   └── mum.png                    # ← add your logo here
└── src/
    ├── theme/index.ts             # Colors, Gradients, Shadows, Typography
    ├── data/series.ts             # Placeholder series data
    ├── screens/
    │   └── HomeScreen.tsx         # Root screen (responsive layout)
    └── components/
        ├── Header.tsx             # Top-region gradient header + nav + auth
        ├── SubNavbar.tsx          # Sub-nav bar aligned to nav center
        ├── CoverflowCarousel.tsx  # Animated 7-slot coverflow with autoplay
        ├── SectionTitle.tsx       # Gradient title box component
        ├── WebtoonCard.tsx        # Standard (2:3) and compact (3:4) cards
        ├── WebtoonGrid.tsx        # Responsive flex-wrap card grid
        ├── SanctuaryFrame.tsx     # Right sidebar with neon corner frame
        ├── CommunitySection.tsx   # Hatırlatma card + Discord widget
        └── CandleLogo.tsx         # Fallback animated candle logo
```

## Dependencies

| Package | Purpose |
|---|---|
| `expo-linear-gradient` | All gradient backgrounds |
| `@expo/vector-icons` | Ionicons (nav, arrows, Discord) |
| `react-native-safe-area-context` | Safe area insets |
| `react-native-screens` | Navigation screen optimization |

## Design Tokens

All colours, gradients, shadows, typography, spacing, and border radii live in `src/theme/index.ts`.
Change them once and the whole UI updates.
