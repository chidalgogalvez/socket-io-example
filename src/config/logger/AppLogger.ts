import { LoggerOptions, Logger as LoggerWinston, createLogger } from 'winston';
import { loggerOptions } from './loggerOptions';
import { consoleTransport } from './transports/console-transport.logger';

/**
 * Clase `AppLogger` que implementa un logger utilizando el patrón singleton.
 */
export class AppLogger {
  private static instance: AppLogger; // Instancia singleton
  private readonly _logger: LoggerWinston;

  /**
   * Constructor privado para implementar el patrón singleton.
   *
   * @param loggerOptions - Opciones de configuración para el logger.
   */
  private constructor(loggerOptions?: LoggerOptions) {
    this._logger = createLogger(loggerOptions);
  }

  /**
   * Método estático para obtener la instancia del logger.
   *
   * @param loggerOptions - Opciones de configuración para el logger.
   * @returns La instancia única de `AppLogger`.
   */
  public static getInstance(loggerOptions?: LoggerOptions): AppLogger {
    if (!AppLogger.instance) {
      AppLogger.instance = new AppLogger(loggerOptions);
    }
    return AppLogger.instance;
  }

  /**
   * Método para registrar mensajes de información.
   *
   * @param message - Mensaje a registrar.
   * @param meta - Información adicional.
   */
  public info(message: any, ...meta: any[]) {
    this._logger.info(message, meta);
  }

  /**
   * Método para registrar mensajes de error.
   *
   * @param message - Mensaje a registrar.
   * @param meta - Información adicional.
   */
  public error(message: any, ...meta: any[]) {
    this._logger.error(message, meta);
  }

  /**
   * Método para registrar mensajes de depuración.
   *
   * @param message - Mensaje a registrar.
   * @param meta - Información adicional.
   */
  public debug(message: any, ...meta: any[]) {
    this._logger.debug(message, meta);
  }

  /**
   * Método para registrar mensajes de advertencia.
   *
   * @param message - Mensaje a registrar.
   * @param meta - Información adicional.
   */
  public warn(message: any, ...meta: any[]) {
    this._logger.warn(message, meta);
  }
}

/**
 * Logger es una instancia de AppLogger configurada con las opciones especificadas.
 * Utiliza las opciones de logger proporcionadas y define los transportes de consola.
 *
 * @constant
 */
export const Logger = AppLogger.getInstance({
  ...loggerOptions,
  transports: [consoleTransport],
});
