export const unauthorized = () => new Response('Unauthorized', { status: 401 })
export const forbidden = () => new Response('Forbidden', { status: 403 })
export const notFound = () => new Response('Not Found', { status: 404 })
export const badRequest = (detail: unknown) =>
  Response.json({ error: 'BadRequest', detail }, { status: 400 })
