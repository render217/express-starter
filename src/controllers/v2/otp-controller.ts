import asyncHandler from 'express-async-handler';

const verifyOTP = asyncHandler(async (req, res) => {
  res.json({
    message: 'OTP is valid',
  });
});

const sendOTP = asyncHandler(async (req, res) => {
  res.json({
    message: 'OTP message queued successfully',
    id: '1234567890',
  });
});

export const otpController = {
  verifyOTP,
  sendOTP,
};
