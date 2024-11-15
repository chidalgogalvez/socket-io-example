import { format, LoggerOptions } from 'winston';
import { AbstractConfigSet } from 'winston/lib/winston/config';
import { APP_NAME } from '../../config/environment/config-loader';

const { combine, timestamp, errors, label, printf, prettyPrint, metadata } =
  format;

const myCustomLevels: AbstractConfigSet = {
  levels: {
    debug: 3,
    info: 2,
    warn: 1,
    error: 0,
  },
  colors: {
    info: 'green',
    warn: 'yellow',
    error: 'red',
    debug: 'blue',
  },
};

export const loggerOptions: LoggerOptions = {
  levels: myCustomLevels.levels,
  defaultMeta: {
    application_id: APP_NAME,
    domain: 'OPBASE',
  },
  format: combine(
    label({ label: 'LOG' }),
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    prettyPrint(),
    printf(({ label, timestamp, level, message, stack, ...rest }) => {
      return JSON.stringify({
        timestamp,
        label,
        level,
        ...rest,
        message: `${stack ? stack : message}`,
      });
    }),
    metadata(),
  ),
};
