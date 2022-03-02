import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  get(endPoint: string): Observable<any> | any {
    try {
      return this.http.get(endPoint);
    } catch (e) {
      console.log('ERROR SERVICE GET: ', e);
    }
  }

  /**
   * @name post by José Ramírez
   * @version 1.0
   * @brief Realiza una peticion post
   *
   * @params endPoint: string, params: any, contentType?: string
   * @return Observable<any>
   */
  post(endPoint: string, params: any, contentType = Helpers.APPLICATION_JSON): Observable<any> | any {
    try{
      return this.http.post(endPoint, params, this.getHeaders(contentType));
    } catch (e) {
      console.log('ERROR SERVICE POST: ', e);
    }
  }

  /**
   * @name put by José Ramírez
   * @version 1.0
   * @brief Realiza una peticion put
   *
   * @params endPoint: string, params: any, contentType?: string
   * @return Observable<any>
   */
   put(endPoint: string, params: any, contentType = Helpers.APPLICATION_JSON): Observable<any> | any {
    try{
      return this.http.put(endPoint, params, this.getHeaders(contentType));
    } catch (e) {
      console.log('ERROR SERVICE PUT: ', e);
    }
  }

  /**
   * @name delete by José Ramírez
   * @version 1.0
   * @brief Realiza una peticion delete
   *
   * @params endPoint: string
   * @return Observable<any>
   */
   delete(endPoint: string): Observable<any> | any {
    try{
      return this.http.delete(endPoint);
    } catch (e){
      console.log('ERROR SERVICE DELET: ', e);
    }
  }

  /**
   * @name getHeaders by José Ramírez
   * @version 1.0
   * @brief Construye los headers para las peticiones
   *
   * @params contentType: string
   * @return any
   */
  private getHeaders(contentType: string) {
    const header = {
      'Content-Type': contentType 
    };
    console.log(header);
    // header['Content-Type'] = contentType;
    return { headers: header };
  }
}
