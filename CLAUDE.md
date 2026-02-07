# Rate of Return — Project Context

## Tech Stack
- **Framework**: React 19 + TypeScript 5.7
- **Build**: Vite 6
- **State**: Redux Toolkit 2.5 (react-redux 9)
- **Styling**: styled-components 6
- **HTTP**: Axios (cookie-based auth, `withCredentials: true`)
- **Charts**: Chart.js + react-chartjs-2
- **Markdown**: react-markdown + rehype-raw + remark-gfm
- **Validation**: Zod
- **Testing**: Jest 29 + React Testing Library + MSW 2
- **Linting**: ESLint 9 + Prettier

## Architecture

```
src/
├── api/            # API type definitions
├── components/     # Shared, reusable UI components
├── features/       # Redux slices (stockList, groups, user, solds, notes, checkedItems, temporalStockList)
├── hooks/          # Global custom hooks
├── layout/         # Layout components (NavBar)
├── network/        # HTTP client (Axios instance)
├── pages/          # Route-level page components
├── repository/     # API call layer (HTTP requests)
├── router/         # React Router config
├── service/        # Business logic layer (between repository and components)
├── styles/         # Global styles, theme
├── typeUtils/      # Shared TypeScript utility types
├── utils/          # Shared utility functions
└── views/          # Feature-specific component trees
```

**Data flow**: Repository (API calls) → Service (business logic) → Components/Views

## Conventions

### Naming
- **Components**: PascalCase (`StockItem`, `GroupButtons`)
- **Styled components**: `Styled` prefix (`StyledPage`, `StyledContainer`)
- **Hooks**: `use[Feature]` (`useFormChange`, `useModal`, `useRouter`)
- **Event handlers**: `on[Action]` (`onSubmit`, `onReset`, `onCloseModal`)
- **Redux slices**: `[name]Slice.ts` with separate `selectors.ts` and `type.ts`

### Imports (3-tier order)
1. External libraries (react, redux, react-router, styled-components)
2. Absolute imports via `@/` alias (features, utils, components)
3. Relative imports (local files)

### Redux
- Feature-based slices in `/features/[name]/`
- Memoized selectors with `createSelector` in `selectors.ts`
- Normalized state with `byId`/`allIds` pattern for collections
- Global actions in `/features/actions.ts`

### Components
- Prefer `memo()` for components receiving object/array props
- styled-components use `.withConfig({ shouldForwardProp })` for prop filtering
- Export pattern: `export default memo(ComponentName)`

## Common Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Run Jest tests
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
```

## Known Patterns & Risks
- `alert()` is used extensively for error handling — prefer toast/notification in new code
- `rehype-raw` in markdown rendering allows raw HTML — ensure inputs are trusted
- Auth is cookie-based (`withCredentials: true`) — no tokens in localStorage
- `VITE_` env vars are client-exposed — never put secrets in them
- Path alias: `@/` maps to `src/`
