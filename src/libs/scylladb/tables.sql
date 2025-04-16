CREATE TABLE sms_dev.message_sent_by_campaign (
    id uuid,
    bucket_id text, -- Represents a 15-minute window
    sender text, -- sender Id
    receiver text,
    text text,
    team_id uuid,
    company_id uuid,
    campaign_id uuid,
    sms_type text, --  'GSM' | 'UNICODE';
    status text, -- 'PENDING' | 'SENT' | 'FAILED' | 'DELIVERED' | 'REJECTED';
    is_charged boolean,
    created_at timestamp,
    processed_at timestamp,
    updated_at timestamp,
    PRIMARY KEY ((campaign_id, bucket_id), created_at, id)
) WITH CLUSTERING ORDER BY (created_at DESC, id ASC)

CREATE TABLE sms_dev.message_sent_by_type (
    id uuid,
    bucket_id text, -- Represents a 1-hour window
    sender text, -- sender Id
    receiver text,
    text text,
    team_id uuid,
    company_id uuid,

    sms_type text, --  'GSM' | 'UNICODE';
    service_type text, --  'API' | 'OTP' | 'AUTO_RESPOND';
    status text, -- 'PENDING' | 'SENT' | 'FAILED' | 'DELIVERED' | 'REJECTED';

    is_charged boolean,
    created_at timestamp,  -- When user initiated it
    processed_at timestamp, -- When it first reached database
    updated_at timestamp, -- When status was updated
    PRIMARY KEY ((sender,bucket_id),team_id, created_at,id)
) WITH CLUSTERING ORDER BY (team_id DESC, created_at DESC)