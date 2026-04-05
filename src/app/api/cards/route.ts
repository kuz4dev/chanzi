import { type NextRequest, NextResponse } from 'next/server';
import { fetchCards } from '@/services/api/mockAdapter';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const deckId = searchParams.get('deckId') ?? undefined;
  const hskLevel = searchParams.get('hskLevel');

  const result = await fetchCards({
    deckId,
    hskLevel: hskLevel ? Number(hskLevel) : undefined,
  });

  return NextResponse.json(result);
}
