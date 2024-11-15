import { IBaseUrl } from '../../modules/websocket/interface/base-url.interface';

export const BX_LOG_LEVEL = process.env.BX_LOG_LEVEL || 'info';
export const NODE_ENV = process.env.NODE_ENV || 'local';
export const APP_NAME = process.env.APP_NAME || 'BX-SOCKET-IO-RECEPCION';

export const configLoader = (): IConfiguration => {
  return {
    port: parseInt(process.env.PORT),
    environment: process.env.NODE_ENV,
    logLevel: process.env.BX_LOG_LEVEL,
    digitacionHubBaseUrl: {
      baseUrl: process.env.DIGITACION_HUB_BASE_URL,
    },
  };
};

export interface IConfiguration {
  logLevel: string;
  port: number;
  environment: string;
  digitacionHubBaseUrl: IBaseUrl;
}
