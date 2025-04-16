export type IMessageSentByCampaign = {
  id: string;
  bucketId: string; // Represents a 15-minute window
  sender: string; // sender ID
  receiver: string;
  text: string;
  teamId: string;
  companyId: string;
  campaignId: string;
  smsType: 'GSM' | 'UNICODE';
  status: 'PENDING' | 'SENT' | 'FAILED' | 'DELIVERED' | 'REJECTED';
  isCharged: boolean;
  createdAt: Date; // When user initiated it
  processedAt: Date; // When it first reached database
  updatedAt: Date | null; // When status was updated
};

export type IMessageSentByType = {
  id: string;
  bucketId: string; // Represents a 1-hour window
  sender: string; // sender ID
  receiver: string;
  text: string;
  teamId: string;
  companyId: string;

  smsType: 'GSM' | 'UNICODE';
  serviceType: 'API' | 'OTP' | 'AUTO_RESPOND';
  status: 'PENDING' | 'SENT' | 'FAILED' | 'DELIVERED' | 'REJECTED';

  ischarged: boolean;
  createdAt: Date; // When user initiated it
  processedAt: Date; // When it first reached database
  updatedAt: Date | null; // When status was updated
};
