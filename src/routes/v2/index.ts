import { a2pController } from '@controllers/v2/a2p-controller';
import { otpController } from '@controllers/v2/otp-controller';

import express from 'express';

const router = express();

router.post('/a2p', a2pController);

router.post('/otp', otpController.sendOTP);

router.post('/otp/verify', otpController.verifyOTP);

export default router;
