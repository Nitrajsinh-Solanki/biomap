// biomap\src\app\api\auth\validate\route.ts


import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { valid: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    // verify token
    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    return NextResponse.json(
      { valid: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { valid: false, message: 'Invalid token' },
      { status: 401 }
    );
  }
}
