import winston from 'winston';
import * as os from 'os';
import * as dotenv from 'dotenv';
dotenv.config();

const appSettings = {
  level: 'all',
  LogConfig: {
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
      winston.format.printf(
        (info) =>
          `${info.timestamp} ${info.level} ${os.hostname} ${process.env.NODE_ENV} NRCounter API: ${info.message}`
      )
    ),
    transports: [
      new winston.transports.File({
        filename: `./logs/nrcounter_api_logfile.log`
      }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.align(),
          winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
          winston.format.printf(
            (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
          )
        )
      })
    ]
  },
  log4js: {}
};

export const logger = winston.createLogger(appSettings.LogConfig);