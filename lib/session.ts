import { auth } from './auth'
import { unauthorized, forbidden } from './errors'

export async function requireSession(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) throw unauthorized()
  return session
}

export async function requireRole(req: Request, role: 'admin') {
  const session = await requireSession(req)
  if (session.user.role !== role) throw forbidden()
  return session
}
