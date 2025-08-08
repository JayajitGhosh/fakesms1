import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id || !session.user.role) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const role = (session.user.role as string).toUpperCase()

    const where = role === 'ADMIN' ? {} : { isPublic: true }
    const announcements = await prisma.announcement.findMany({ where, orderBy: { createdAt: 'desc' }, take: 20 })
    return NextResponse.json({ notifications: announcements })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
