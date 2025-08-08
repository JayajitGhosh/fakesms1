import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const created = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { source: source ?? 'blog' },
      create: { email, source: source ?? 'blog' },
      select: { id: true, email: true, createdAt: true },
    })

    return NextResponse.json({ ok: true, subscriber: created })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
