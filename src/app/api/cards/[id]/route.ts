import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { fetchCardById } from '@/services/api/mockAdapter';

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/cards/[id]'>) {
  const { id } = await ctx.params;
  try {
    const result = await fetchCardById(id);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
