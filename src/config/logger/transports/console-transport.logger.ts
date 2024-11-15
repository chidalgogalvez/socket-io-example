import {
  BX_LOG_LEVEL,
  NODE_ENV,
} from '../../../config/environment/config-loader';
import { format, transports } from 'winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

const { combine, colorize } = format;
const { Console } = transports;

const consoleTransportOptions: ConsoleTransportOptions = {
  level: BX_LOG_LEVEL,
  format:
    NODE_ENV === 'local'
      ? combine(colorize(), colorize({ all: true }))
      : combine(),
};

const createConsoleTransport = (
  consoleTransportOptions: ConsoleTransportOptions,
) => {
  return new Console(consoleTransportOptions);
};

export const consoleTransport = createConsoleTransport(consoleTransportOptions);
