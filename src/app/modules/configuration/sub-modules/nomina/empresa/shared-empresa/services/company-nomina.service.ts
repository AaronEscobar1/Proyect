import { EventEmitter, Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyNominaService {

  // Variable para obtener el row desde la tercera tabla
  public selectRowThirdTable$ = new EventEmitter<any | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  /**
   * Obtener todas las empresas
   * @returns Observable<any>
   */
  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/nominas/empresas'));
  }

  /**
   * Obtener todas las nominas por empresa
   * @param idEmpresa: string
   * @returns Observable<any>
   */
  getAllNominasByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas`));
  }

  
}
