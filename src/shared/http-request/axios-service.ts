import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { Logger } from '../../config/logger/AppLogger';

/**
 * Servicio personalizado para realizar peticiones HTTP utilizando Axios.
 */
@Injectable()
export class CustomAxiosService {
  constructor(private readonly httpService: HttpService) { }

  /**
   * Realiza una petición HTTP GET.
   * @param url La URL a la que se realizará la petición.
   * @param config (Opcional) Configuración adicional para la petición.
   * @returns Una promesa que se resuelve con la respuesta de la petición.
   */
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(
      this.httpService.get<T>(url, config).pipe(
        map((res: AxiosResponse<T>) => res),
        catchError((error: AxiosError) => {
          Logger.error(error.message, 'error', error.response.data);
          throw error;
        }),
      ),
    ).catch((error: AxiosError) => {
      Logger.error(error.message, 'error', error.response.data);
      throw error;
    });
  }

  /**
   * Realiza una petición HTTP POST.
   * @param url La URL a la que se realizará la petición.
   * @param data (Opcional) Los datos que se enviarán en la petición.
   * @param config (Opcional) Configuración adicional para la petición.
   * @returns Una promesa que se resuelve con la respuesta de la petición.
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(
      this.httpService.post<T>(url, data, config).pipe(
        map((res: AxiosResponse<T>) => res),
        catchError((error: AxiosError) => {
          Logger.error(error.message, 'error', error.response.data);
          throw error;
        }),
      ),
    ).catch((error: AxiosError) => {
      Logger.error(error.message, 'error', error.response.data);
      throw error;
    });
  }

  /**
   * Realiza una petición HTTP PUT.
   * @param url La URL a la que se realizará la petición.
   * @param data (Opcional) Los datos que se enviarán en la petición.
   * @param config (Opcional) Configuración adicional para la petición.
   * @returns Una promesa que se resuelve con la respuesta de la petición.
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(
      this.httpService.put<T>(url, data, config).pipe(
        map((res: AxiosResponse<T>) => res),
        catchError((error: AxiosError) => {
          Logger.error(error.message, 'error', error.response.data);
          throw error;
        }),
      ),
    ).catch((error: AxiosError) => {
      Logger.error(error.message, 'error', error.response.data);
      throw error;
    });
  }

  /**
   * Realiza una petición HTTP DELETE.
   * @param url La URL a la que se realizará la petición.
   * @param config (Opcional) Configuración adicional para la petición.
   * @returns Una promesa que se resuelve con la respuesta de la petición.
   */
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(
      this.httpService.delete<T>(url, config).pipe(
        map((res: AxiosResponse<T>) => res),
        catchError((error: AxiosError) => {
          Logger.error(error.message, 'error', error.response.data);
          throw error;
        }),
      ),
    ).catch((error: AxiosError) => {
      Logger.error(error.message, 'error', error.response.data);
      throw error;
    });
  }
}
