import asyncHandler from 'express-async-handler';

export const a2pController = asyncHandler(async (req, res) => {
  res.json({
    message: 'message queued successfully',
    id: '1234567890',
  });
});
