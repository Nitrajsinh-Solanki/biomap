// biomap\src\app\api\auth\verify-otp\route.ts



import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyOTP } from '@/lib/otpStore';

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    
    const { email, otp } = await request.json();
    
    if (!email || !otp) {
      return NextResponse.json(
        { message: 'Email and OTP are required' },
        { status: 400 }
      );
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    const isValid = await verifyOTP(email, otp);
    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid or expired OTP. Please request a new one.' },
        { status: 400 }
      );
    }
    
    user.verified = true;
    await user.save();
    
    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { message: 'An error occurred during OTP verification' },
      { status: 500 }
    );
  }
}
