import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { fetchDeckById } from '@/services/api/mockAdapter';

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/decks/[id]'>) {
  const { id } = await ctx.params;
  try {
    const result = await fetchDeckById(id);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
