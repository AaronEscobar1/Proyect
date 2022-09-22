import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Institucion } from '../interfaces/instituciones.interfaces';
import { InstitucionTercero, InstitucionTerceroUpdate } from '../interfaces/instituciones-terceros.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TercerosInstitucionService {

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getTercerosInstitucion(institucion: Institucion): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/depositos/empresas/${institucion.idEmpresa}/tiposinstitucion/${institucion.tipiCodtip}/instituciones/${institucion.codins}/depositosterceros`));
  }

  create(institucionTercero: InstitucionTercero): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/depositos/empresas/${institucionTercero.idEmpresa}/tiposinstitucion/${institucionTercero.tipiCodtip}/instituciones/${institucionTercero.codins}/depositosterceros`), institucionTercero);
  }

  update(institucionTercero: InstitucionTercero, institucionTerceroUpdate: InstitucionTerceroUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/depositos/empresas/${institucionTercero.idEmpresa}/tiposinstitucion/${institucionTercero.tipiCodtip}/instituciones/${institucionTercero.codins}/depositosterceros`), institucionTerceroUpdate);
  }

  delete(institucionTercero: InstitucionTercero): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/depositos/empresas/${institucionTercero.idEmpresa}/tiposinstitucion/${institucionTercero.tipiCodtip}/instituciones/${institucionTercero.codins}/depositosterceros`));
  }

  // Obtener bancos
  getBancos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/depositos/bancos`));
  }

  // Obtener Agencias bancos
  getAgenciasBancos(codBanco: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/depositos/bancos/${codBanco}/agencias`));
  }
  
  // Obtener tipos de pagos
  getTiposPagos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/depositos/tipospagos`));
  }

  // Obtener formas de pagos
  getFormasPagos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/pagoformas`));
  }

  // Obtener monedas
  getMonedas(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/tiposmonedas`));
  }

  // Obtener tipos de documentos
  getTiposDocumentos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/depositos/tiposdocumentos`));
  }

  // Obtener tipos de transacciones
  getTiposTransacciones(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/depositos/tipostransacciones`));
  }

}
