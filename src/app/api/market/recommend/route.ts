import { NextResponse } from 'next/server';

import { externalApi } from '@/lib/api/external';
import { recommendPlayers } from '@/mock/football';

export async function GET() {
  try {
    // const response = await externalApi.get('/products');FootballPlayers
    // return NextResponse.json(response);

    return NextResponse.json(recommendPlayers);
  } catch (error) {
    console.error('Axios error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
