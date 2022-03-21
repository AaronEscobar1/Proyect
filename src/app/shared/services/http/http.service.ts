import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Helpers } from '../../helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private helpers: Helpers) { }

  /**
   * @name get by José Ramírez
   * @version 1.0
   * @brief Realiza una peticion get
   *
   * @params endPoint: string
   * @return Observable<any>
   */
  get(endPoint: string) {
    return this.http.get(endPoint);
  }

  /**
   * @name post by José Ramírez
   * @version 1.0
   * @brief Realiza una peticion post
   *
   * @params endPoint: string, params: any, contentType?: string
   * @return Observable<any>
   */
  post(endPoint: string, params: any, contentType = Helpers.APPLICATION_JSON) {
    return this.http.post(endPoint, params, this.getHeaders(contentType));
  }

  /**
   * @name put by José Ramírez
   * @version 1.0
   * @brief Realiza una peticion put
   *
   * @params endPoint: string, params: any, contentType?: string
   * @return Observable<any>
   */
   put(endPoint: string, params: any, contentType = Helpers.APPLICATION_JSON) {
    return this.http.put(endPoint, params, this.getHeaders(contentType));
  }

  /**
   * @name delete by José Ramírez
   * @version 1.0
   * @brief Realiza una peticion delete
   *
   * @params endPoint: string
   * @return Observable<any>
   */
   delete(endPoint: string) {
    return this.http.delete(endPoint);
  }

  /**
   * @name getHeaders by José Ramírez
   * @version 1.0
   * @brief Construye los headers para las peticiones
   *
   * @params contentType: string
   * @return any
   */
  getHeaders(contentType: string) {
    const header = { 
      'Content-Type': contentType 
    };
    return { headers: header };
  }
}
