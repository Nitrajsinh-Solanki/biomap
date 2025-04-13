// biomap\src\app\api\auth\register\route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendOTPEmail } from '@/lib/email';
import { storeOTP } from '@/lib/otpStore';

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    
    const { name, email, password } = await request.json();
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    // Check if a user with the same email already exists or not 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    //generate 6 digit otp 
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    


    // temporary storing otp to mongodb after verification it will automatically deleted from mongodb.
    await storeOTP(email, otp);
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verified: false,
    });
    
    await newUser.save();
    
 // Send OTP to user's email for verification
    await sendOTPEmail(email, name, otp);
    
    return NextResponse.json(
      { message: 'Registration successful. Please verify your email.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
