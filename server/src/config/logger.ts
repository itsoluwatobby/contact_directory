import winston from 'winston'

const { combine, timestamp, label, printf } = winston.format;
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
})

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: combine(
    label({ label: 'CONTACT'}),
    timestamp(), logFormat
  ),
  defaultMeta: { service: 'contact-directory' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log', level: 'info' })
  ]
})