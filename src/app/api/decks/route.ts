import { NextResponse } from 'next/server';
import { fetchDecks } from '@/services/api/mockAdapter';

export async function GET() {
  const result = await fetchDecks();
  return NextResponse.json(result);
}
