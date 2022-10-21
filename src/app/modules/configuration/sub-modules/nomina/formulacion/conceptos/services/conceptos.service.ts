import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Concepto } from '../interfaces/concepto.interfaces'

@Injectable({
  providedIn: 'root'
})
export class ConceptosService {

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  /**
   * Obtener todos los conceptos por empresa y nomina
   */
  getAllConceptosByEmpresaNomina(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/nominas/${idNomina}/conceptos`));
  }

  /**
   * Obtener los conceptos donde mansal sea igual a 0
   */
  getConceptosByEmpresaNominaNoMansal(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/nominas/${idNomina}/conceptos?mansal=0`));
  }
  /**
   * Obtener un concepto en especifico
   */
  getConceptoByEmpresaNomina(idEmpresa: string, idNomina: string, idConcepto: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/nominas/${idNomina}/conceptos/${idConcepto}`));
  }

  create(idEmpresa: string, idNomina: string, concepto: Concepto): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/nominas/${idNomina}/conceptos/${concepto.id}`), concepto);
  }

  update(concepto: Concepto, conceptoUpdate: Concepto): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/empresas/${concepto.idEmpresa}/nominas/${concepto.idNomina}/conceptos/${concepto.id}`), conceptoUpdate);
  }

  delete(concepto: Concepto): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/empresas/${concepto.idEmpresa}/nominas/${concepto.idNomina}/conceptos/${concepto.id}`));
  }

}
