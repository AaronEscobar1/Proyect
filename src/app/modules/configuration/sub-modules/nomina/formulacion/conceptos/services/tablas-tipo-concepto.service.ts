import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablasTipoConceptoService {

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  /** Funciones de Conceptos */
  getAllFuncionesConcepto(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/funcionesconceptos`));
  }

  /** Tipos Saldos */
  getAllTiposSaldos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/tiposmanejossaldos`));
  }

  /** Gravables Impuestos */
  getAllGravablesImpuestos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/gravablesimpuestos`));
  }

  /** Métodos Fiscales */
  getAllMetodosFiscales(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/metodosfiscales`));
  }

  /** Tipos de Cálculos */
  getAllTiposCalculos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/tiposcalculos`));
  }
  
  /** Manejos Decimales */
  getAllManejosDecimales(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/manejodecimales`));
  }

  /** Estatus afectaciones Cheques */
  getAllEstatusAfectacionesCheques(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/estatusafectacionescheques`));
  }

  /** Indicadores Pagos de Intereses */
  getAllIndicadoresPagosIntereses(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/indicadorespagosintereses`));
  }

  /** Indicadores Pagos Cuotas */
  getAllIndicadoresPagosCuotas(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/indicadorespagoscuotas`));
  }

  /** Condiciones de Retroactividad */
  getAllCondicionesRetroactividad(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/condicionesretroactividad`));
  }

  /** Distribuciones Contables */
  getAllDistribucionesContables(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/distribucionescontables`));
  }

  /** Indicadores que Generar Retroactivos */
  getAllIndicadoresRetroactivos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/indicadoresretroactivos`));
  }

  /** Días de Semana */
  getAllDiasSemana(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/diassemanas`));
  }

  /** Tipos fechas Aniversario */
  getAllTiposFechasAniversario(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/tiposfechasaniversarios`));
  }

  /** Rutinas de Cálculos */
  getAllRutinasCalculos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/rutinascalculos`));
  }

}
