import asyncHandler from 'express-async-handler';
import { parsePhone } from '@libs/parse-phone';
import { a2pSchema } from '@utils/validation/a2p-schema';
import validate from '@utils/validation/validate';

export const a2pController = asyncHandler(async (req, res) => {
  const data = validate(a2pSchema, req.body);
  res.json({
    message: 'message queued successfully',
    id: '1234567890',
    phone: data.to,
    provider: parsePhone(data.to).data!.provider,
  });
});
