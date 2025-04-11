// biomap\src\app\api\auth\resend-otp\route.ts




import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendOTPEmail } from '@/lib/email';
import { storeOTP, deleteOTP } from '@/lib/otpStore';

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
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
    
    await deleteOTP(email);
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    await storeOTP(email, otp);
    
    await sendOTPEmail(email, user.name, otp);
    
    return NextResponse.json(
      { message: 'OTP sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { message: 'An error occurred while resending OTP' },
      { status: 500 }
    );
  }
}
