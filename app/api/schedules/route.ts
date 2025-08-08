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
      const classes = await prisma.studentClass.findMany({
        where: { studentId: userId },
        include: { class: { include: { subjects: true } } },
      })
      const schedule = classes.flatMap((c) =>
        c.class.subjects.map((s, i) => ({ title: s.name, time: `${9 + i}:00`, room: `R-${100 + i}` }))
      )
      return NextResponse.json({ schedule })
    }

    if (role === 'TEACHER') {
      const classes = await prisma.class.findMany({
        where: { teacherId: userId },
        include: { subjects: true },
      })
      const schedule = classes.flatMap((c) =>
        c.subjects.map((s, i) => ({ title: `${c.name} • ${s.name}`, time: `${9 + i}:00`, room: `T-${200 + i}` }))
      )
      return NextResponse.json({ schedule })
    }

    const all = await prisma.class.findMany({ include: { subjects: true }, take: 5 })
    const schedule = all.flatMap((c) => c.subjects.map((s, i) => ({ title: `${c.name} • ${s.name}`, time: `${9 + i}:00`, room: `A-${300 + i}` })))
    return NextResponse.json({ schedule })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
