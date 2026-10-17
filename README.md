# Task API

A small REST API for managing users and tasks, built with Express and TypeORM (SQLite).

## Setup

```
npm install
cp .env.example .env
npm run dev
```

Server starts on the port in `.env` (default `4000`).

## Endpoints

- `POST /users` — create a user (`name`, `email`)
- `GET /users/:id` — get a user
- `POST /tasks` — create a task (`title`, `description?`, `priority?`, `dueDate?`, `assigneeId`)
- `POST /tasks/bulk` — create multiple tasks at once (`tasks: [...]`)
- `GET /tasks` — list tasks, supports `status`, `page`, `limit` query params
- `GET /tasks/:id` — get a task
- `GET /tasks/overdue` — list tasks past their due date that aren't done
- `PATCH /tasks/:id` — update a task
- `POST /tasks/:id/complete` — mark a task as done (writes an activity log entry)
- `DELETE /tasks/:id` — remove a task

## Notes

This is a sample/practice project — not production code.
