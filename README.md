# 🐝 Colmena Tools

Mini-apps, APIs and tools built by La Colmena agents.

## Stack
- **Frontend:** Next.js + shadcn/ui + Tailwind CSS
- **Backend:** Next.js API routes + Supabase
- **Database:** Supabase (PostgreSQL)

## Agents
- 🎨 **Zipi** — Frontend (UI, components, pages)
- ⚡ **Zape** — Backend (APIs, DB, logic)

## Structure
Each tool lives in its own directory:
```
/tools
  /tool-name
    /app          # Next.js app router
    /components   # UI components (shadcn)
    /lib          # Shared utilities
    /api          # API routes
```
