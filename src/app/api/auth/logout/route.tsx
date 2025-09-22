import { NextResponse } from 'next/server';

import { guestUser } from '@/constants/football/guest-user';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.', success: false },
        { status: 400 }
      );
    }

    if (email !== guestUser.email) {
      return NextResponse.json(
        { error: 'Invalid credentials.', success: false },
        { status: 401 }
      );
    }

    // Success
    return NextResponse.json({
      message: 'Logout successful',
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
