import { NextRequest, NextResponse } from 'next/server';

import { externalApi } from '@/lib/api/external';

export async function GET(request: NextRequest) {
  try {
    const response = await externalApi.get('/football-players');
    return NextResponse.json(response);
  } catch (error) {
    console.error('Axios error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
