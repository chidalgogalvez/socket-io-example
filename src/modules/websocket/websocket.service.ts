import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { IBaseUrl } from '../websocket/interface/base-url.interface';
import { API_DEFAULT_PREFIX } from '../../shared/constants';
import { CustomAxiosService } from '../../shared/http-request/axios-service';

@Injectable()
export class WebsocketService {
  async getItemsByActionType(actionType: string) {
    throw new Error('Method not implemented.');
  }

  async deleteItemById(itemId: string, actionType: string) {
    throw new Error('Method not implemented.');
  }
  private requestConfig: (
    type: 'JSON',
    additionalHeaders?: Record<string, string>,
  ) => AxiosRequestConfig;

  constructor(
    private readonly customAxiosService: CustomAxiosService,
    private readonly configService: ConfigService,
  ) {
    /**
     * Configura la cabecera de la petición HTTP.
     * @param type - Tipo de contenido de la petición ('JSON').
     * @param additionalHeaders - Encabezados adicionales (opcional).
     * @returns La configuración de la petición HTTP.
     */
    this.requestConfig = (
      type: 'JSON',
      additionalHeaders?: Record<string, string>, // Parámetro opcional para encabezados adicionales
    ): AxiosRequestConfig => {
      const baseHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'expired-orders/1.0.0',
        ...additionalHeaders, // Extiende los encabezados base con los adicionales
      };
      return {
        headers: baseHeaders,
      };
    };
  }

  async delete(
    room: string,
    counterType: string,
    actionType: string,
    value: any,
  ) {
    const digitacionHubBaseUrl = this.configService.get<IBaseUrl>(
      'digitacionHubBaseUrl',
    );

    const { data } = await this.customAxiosService.delete(
      `${digitacionHubBaseUrl.baseUrl}${API_DEFAULT_PREFIX}/${value}`,
      this.requestConfig('JSON'),
    );
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} websocket`;
  }
}
