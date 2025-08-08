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
    const userId = session.user.id as string

    if (role === 'STUDENT') {
      const records = await prisma.attendance.findMany({
        where: { studentId: userId },
        orderBy: { date: 'desc' },
        take: 30,
      })
      return NextResponse.json({ attendance: records })
    }

    if (role === 'TEACHER') {
      const records = await prisma.attendance.findMany({
        where: { teacherId: userId },
        orderBy: { date: 'desc' },
        take: 50,
      })
      return NextResponse.json({ attendance: records })
    }

    const records = await prisma.attendance.findMany({ take: 50 })
    return NextResponse.json({ attendance: records })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
