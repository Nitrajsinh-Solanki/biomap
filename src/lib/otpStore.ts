// biomap\src\lib\otpStore.ts




import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, 
  },
});

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

export async function storeOTP(email: string, otp: string) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 
  
  await OTP.findOneAndUpdate(
    { email },
    { email, otp, expiresAt },
    { upsert: true, new: true }
  );
}

export async function verifyOTP(email: string, otp: string) {
  const otpRecord = await OTP.findOne({ 
    email, 
    expiresAt: { $gt: new Date() } 
  });
  
  if (!otpRecord) {
    return false;
  }
  
  if (otpRecord.otp !== otp) {
    return false;
  }
  
  await OTP.deleteOne({ email });
  return true;
}

export async function deleteOTP(email: string) {
  await OTP.deleteOne({ email });
}
