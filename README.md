# EduSmart — Students Study Planner

EduSmart is a responsive learning and study-planning workspace built on the existing React, TypeScript, Vite, Hono, and Cloudflare Workers starter.

## Current experience

- Student dashboard with study activity, learning stats, course progress, and a daily plan.
- Study task creation, task completion, and task search.
- Navigation for courses, study planner, examinations, and digital library.
- EduAI study buddy interaction prototype.
- Responsive layouts, accessible controls, and a manually toggled dark theme.

## Run locally

```bash
npm install
npm run dev
```

Build and lint the project with:

```bash
npm run build
npm run lint
```

## Next steps

This first UI milestone uses local sample data. Connect authentication and persistent student data, then implement the courses, examinations, library, teacher/admin workflows, and a server-side AI provider integration. Do not expose AI provider secrets in frontend code.
