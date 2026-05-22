# Product Requirements

## What
A versioned REST API for "Posts": authenticated users create / list / update / delete
their own posts; admins can publish any post.

## Endpoints
| Method | Path                  | Auth          | Body           | Returns |
|--------|-----------------------|---------------|----------------|---------|
| GET    | /api/v1/posts         | optional      | —              | Post[]  |
| POST   | /api/v1/posts         | session       | CreatePostBody | Post    |
| GET    | /api/v1/posts/:id     | optional      | —              | Post    |
| PATCH  | /api/v1/posts/:id     | session+owner | UpdatePostBody | Post    |
| DELETE | /api/v1/posts/:id     | session+admin | —              | 204     |

## Constraints
- Zod validation on every input
- Auth inside every mutation
- Pagination on list endpoints (limit/offset, max 100)
