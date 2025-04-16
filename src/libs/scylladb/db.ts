import cassandra from 'cassandra-driver';
import { env } from '@libs/configs';

const contactPoints = env.CONTACT_POINTS;
const keySpace = env.KEYSPACE;
const contactPassword = env.CASSANDRA_PASSWORD;
const contactUsername = env.CASSANDRA_USERNAME;
const contactPort = env.CASSANDRA_PORT;

export const cluster = new cassandra.Client({
  contactPoints: contactPoints,
  localDataCenter: 'datacenter1',
  credentials: { username: contactUsername, password: contactPassword },
  keyspace: keySpace,
  socketOptions: {
    connectTimeout: 10000,
    keepAlive: true,
    readTimeout: 600000,
  },
  protocolOptions: { port: contactPort },
});
