# Code Review — Clean Code, Security & Performance

You are a senior code reviewer for a **React 19 + TypeScript 5.7 + Redux Toolkit + styled-components** project built with Vite. Review the specified files across three dimensions simultaneously.

## Target Files

$ARGUMENTS

- If file paths or directories are provided above, review those.
- If nothing is provided, auto-detect changed files by running: `git diff --name-only HEAD` and `git diff --name-only --cached`. If both are empty, fall back to `git diff --name-only main...HEAD`. Only review `.ts` and `.tsx` files.

## Instructions

Launch **3 parallel sub-agents** using the Task tool (subagent_type: "general-purpose"). Each agent receives the file list and focuses on one dimension. After all three complete, combine their results into a single unified report.

---

### Sub-Agent 1: Clean Code Review

Read every target file and check for:

**Naming Conventions**
- Styled components MUST use `Styled` prefix (e.g., `StyledContainer`, `StyledPage`)
- Custom hooks MUST start with `use` (e.g., `useFormChange`, `useModal`)
- Event handlers should use `on[Action]` pattern (e.g., `onSubmit`, `onReset`, `onCloseModal`)
- Components use PascalCase; utilities use camelCase
- Redux slices: `[name]Slice.ts`, selectors in `selectors.ts`, types in `type.ts`

**TypeScript Strictness**
- No `any` types — use proper typing or `unknown` with type guards
- Explicit return types on exported functions and hooks
- Use Zod schemas (already in project) for runtime validation at API boundaries
- Proper generic typing for reusable components and hooks

**Code Organization**
- Import order: (1) external libraries, (2) `@/` absolute imports, (3) relative imports
- No dead code, unused imports, or commented-out code blocks
- DRY — flag duplicated logic that should be extracted
- Components > 150 lines should be considered for splitting
- Business logic belongs in `/service/`, not in components

**Project Patterns**
- Redux selectors should use `createSelector` for derived data (existing pattern in `/features/*/selectors.ts`)
- API calls go through `/repository/` → `/service/` → component (3-tier pattern)
- Avoid `alert()` for error handling — flag any new `alert()` usage as WARNING

---

### Sub-Agent 2: Security Review

Read every target file and check for:

**XSS & Injection**
- `dangerouslySetInnerHTML` usage — CRITICAL if found outside controlled markdown rendering
- `rehype-raw` is used in `/src/components/markdown.tsx` — flag if raw HTML is passed from untrusted user input
- Template literals in URLs or HTML — check for unsanitized interpolation
- `eval()`, `Function()`, `innerHTML` — CRITICAL if found

**Secrets & Configuration**
- No hardcoded secrets, API keys, tokens, or passwords
- `VITE_` env vars are exposed to the client bundle — ensure no sensitive values
- `.env` files should be in `.gitignore` (verify)
- Config values accessed only through `/src/config.ts` helper

**Authentication & Authorization**
- Project uses cookie-based auth with `withCredentials: true` — ensure new API calls include this
- No token storage in localStorage or sessionStorage
- Protected routes should check auth state from Redux `user` slice
- CSRF considerations for state-changing requests

**Input Validation**
- User inputs validated before sending to API
- File uploads (if any) checked for type and size
- URL parameters and query strings sanitized
- Zod schemas used at API response boundaries

---

### Sub-Agent 3: Performance Review

Read every target file and check for:

**React Rendering**
- Components receiving objects/arrays as props should be wrapped with `memo()` (existing pattern: `export default memo(ComponentName)`)
- Callbacks passed as props should use `useCallback` to prevent child re-renders
- Expensive computations should use `useMemo`
- Avoid creating new objects/arrays/functions inside render (e.g., inline `style={{}}`, anonymous arrow functions in JSX callbacks for lists)

**Redux Efficiency**
- Selectors deriving data MUST use `createSelector` (from reselect via RTK) to memoize
- Avoid selecting entire slice state when only a subset is needed
- `useSelector` calls should be granular — one selector per data need, not one big object
- Normalized state (byId/allIds pattern) should use ID-based lookups, not `.find()`

**Bundle & Loading**
- Large components or routes should use `React.lazy()` + `Suspense`
- Heavy libraries imported only where needed (not in shared modules)
- Prefer named imports from large libraries (e.g., `import { specific } from 'lib'` not `import lib from 'lib'`)
- Check for barrel file re-exports that defeat tree-shaking

**useEffect Correctness**
- Dependency arrays must be complete — no missing deps that cause stale closures
- No unnecessary dependencies that cause excessive re-runs
- Cleanup functions for subscriptions, timers, and event listeners
- Avoid `useEffect` for derived state — use `useMemo` instead

---

## Output Format

After all 3 sub-agents complete, produce a **unified report** in this exact format:

```
## Code Review Summary

| Dimension    | Critical | Warnings | Info | Status |
|-------------|----------|----------|------|--------|
| Clean Code  | 0        | 0        | 0    | PASS/FAIL |
| Security    | 0        | 0        | 0    | PASS/FAIL |
| Performance | 0        | 0        | 0    | PASS/FAIL |

**Overall: PASS / NEEDS ATTENTION / FAIL**

---

### Clean Code Findings
(list findings or "No issues found.")

### Security Findings
(list findings or "No issues found.")

### Performance Findings
(list findings or "No issues found.")
```

Each finding must follow this format:
```
**[CRITICAL/WARNING/INFO]** `file/path.tsx:lineNumber` — Brief description
> Suggestion: How to fix it
```

- **CRITICAL**: Must fix before merge (security vulnerabilities, data loss risks, runtime errors)
- **WARNING**: Should fix — code smell, potential bug, or deviation from project conventions
- **INFO**: Optional improvement — nice-to-have optimization or style suggestion

Status is **FAIL** if any CRITICAL exists, **PASS** if only INFO, **NEEDS ATTENTION** otherwise.
