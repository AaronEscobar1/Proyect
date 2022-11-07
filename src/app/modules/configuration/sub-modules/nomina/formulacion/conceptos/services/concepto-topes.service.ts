import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { ConceptoTope, ConceptoTopeUpdate } from '../interfaces/concepto-topes.interfaces';
import { Concepto } from '../interfaces/concepto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConceptoTopesService {

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  /**
   * Obtener concepto tope por empresa, nomina y concepto
   * @param idEmpresa: string
   * @param idNomina: string
   * @param idConcepto: string
   * @returns Observable<any>
   */
  getConceptosTopeByEmpresaNominaConcepto(idEmpresa: string, idNomina: string, idConcepto: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/nominas/${idNomina}/conceptos/${idConcepto}/topesparametros`));
  }

  /**
   * Obtener un concepto tope
   * @param idEmpresa:  string
   * @param idNomina: string
   * @param idConcepto: string
   * @param tipeles: string, Tipo de elemento a considerar como tope
   * @returns Observable<any>
   */
  getConceptoTopeByEmpresaNominaConceptoTipele(concepto: Concepto, tipeles: number): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${concepto.idEmpresa}/nominas/${concepto.idNomina}/conceptos/${concepto.id}/topesparametros/${tipeles}`));
  }

  /**
   * Registra un concepto tope
   * @param conceptoTope: ConceptoTope
   * @returns Observable<any>
   */
  create(conceptoTope: ConceptoTope): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/empresas/${conceptoTope.idEmpresa}/nominas/${conceptoTope.idNomina}/conceptos/${conceptoTope.idConcepto}/topesparametros/${conceptoTope.tipele}`), conceptoTope);
  }

  /**
   * Actualiza un concepto tope
   * @param conceptoTope: ConceptoTope
   * @param conceptoTopeUpdate: ConceptoTopeUpdate
   * @returns Observable<any>
   */
  update(conceptoTope: ConceptoTope, conceptoTopeUpdate: ConceptoTopeUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/empresas/${conceptoTope.idEmpresa}/nominas/${conceptoTope.idNomina}/conceptos/${conceptoTope.idConcepto}/topesparametros/${conceptoTope.tipele}`), conceptoTopeUpdate);
  }

  /**
   * Elimina un concepto tope
   * @param conceptoTope: ConceptoTope
   * @returns Observable<any>
   */
  delete(conceptoTope: ConceptoTope): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/empresas/${conceptoTope.idEmpresa}/nominas/${conceptoTope.idNomina}/conceptos/${conceptoTope.idConcepto}/topesparametros/${conceptoTope.tipele}`));
  }

}
