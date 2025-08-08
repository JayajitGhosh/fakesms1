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
      const grades = await prisma.grade.findMany({
        where: { studentId: userId },
        include: { subject: true },
        orderBy: { date: 'desc' },
        take: 20,
      })
      return NextResponse.json({ grades })
    }

    if (role === 'TEACHER') {
      const grades = await prisma.grade.findMany({
        where: { teacherId: userId },
        include: { subject: true },
        orderBy: { date: 'desc' },
        take: 20,
      })
      return NextResponse.json({ grades })
    }

    // ADMIN
    const grades = await prisma.grade.findMany({ include: { subject: true }, take: 50 })
    return NextResponse.json({ grades })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
