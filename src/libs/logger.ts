import winston from 'winston';
import util from 'util';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Determine log level based on environment
const level = () => (process.env.NODE_ENV === 'development' ? 'debug' : 'warn');

// Define color scheme for log levels
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Apply colors to Winston
winston.addColors(colors);

// Custom log format that ensures metadata is displayed correctly
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const coloredLevel = winston.format
      .colorize()
      .colorize(level, level.toUpperCase());

    // If message is an object, convert it to a string properly
    let formattedMessage = message;
    if (typeof message === 'object') {
      formattedMessage = util.inspect(message, { colors: true, depth: null });
    }

    // If no message and only metadata exists, use metadata as the message
    if (!formattedMessage && Object.keys(meta).length) {
      formattedMessage = util.inspect(meta, { colors: true, depth: null });
      meta = {}; // Clear meta to prevent double printing
    }

    // Remove internal Symbol properties
    const cleanedMeta = JSON.parse(
      JSON.stringify(meta, (key, value) =>
        typeof key === 'symbol' ? undefined : value,
      ),
    );

    // Format metadata correctly
    const metaString = Object.keys(cleanedMeta).length
      ? ` ${util.inspect(cleanedMeta, { colors: true, depth: null })} ` //mind the space at the start and end
      : '';

    return `${timestamp} ${coloredLevel}: ${formattedMessage}${metaString}`;
  }),
);

// Define transports
const transports: (
  | winston.transports.ConsoleTransportInstance
  | winston.transports.FileTransportInstance
)[] = [new winston.transports.Console()];

// TODO enable this if file logging is required in production
// if (process.env.NODE_ENV === 'production') {
//   transports.push(
//     new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
//   );
//   transports.push(new winston.transports.File({ filename: 'logs/all.log' }));
// }

// Create and export the logger
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

// Ensure Console transport logs all levels
Logger.transports.forEach((t) => {
  if (t instanceof winston.transports.Console) {
    t.level = 'debug'; // Allow all levels in console (Look at the table below to configure)
  }
});

export default Logger;

/*
 * Winston log levels are hierarchical. Each level includes the levels below it:
 *
 * - `error`: Logs only `error`.
 * - `warn`: Logs `warn` and `error`.
 * - `info`: Logs `info`, `warn`, and `error`.
 * - `http`: Logs `http`, `info`, `warn`, and `error`.
 * - `debug`: Logs everything: `debug`, `http`, `info`, `warn`, and `error`.
 *
 * Example:
 * const Logger = winston.createLogger({
 *   level: 'info', // Logs 'info', 'warn', and 'error'.
 *   levels,
 *   format,
 *   transports,
 * });
 */
