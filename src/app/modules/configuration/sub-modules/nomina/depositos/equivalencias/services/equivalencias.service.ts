import { Injectable, EventEmitter } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Institucion } from '../../instituciones/interfaces/instituciones.interfaces';
import { EquivalenciaTipoCuenta, EquivalenciaTipoCuentaUpdate } from '../interfaces/equivalencias.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EquivalenciasService {

  // Variable para obtener el row desde la tabla tipo instituciones
  public selectRowTipoInstitucion$ = new EventEmitter<any | null>();

  // Variable para obtener el row desde la tabla institución
  public selectRowInstitucion$ = new EventEmitter<any | null>();

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints para obtener equivalencias tipos de cuentas
  getAllEquivalenciasCuenta(institucion: Institucion): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/equivalenciasdepositos/empresas/${institucion.idEmpresa}/tiposinstitucionesdepositos/${institucion.tipiCodtip}/${institucion.codins}`));
  }

  create(equivalencia: EquivalenciaTipoCuenta): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/equivalenciasdepositos`), equivalencia);
  }

  update(equivalencia: EquivalenciaTipoCuenta, equivalenciaUpdate: EquivalenciaTipoCuentaUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/equivalenciasdepositos/empresas/${equivalencia.idEmpresa}/tiposinstitucionesdepositos/${equivalencia.tipiCodtip}/${equivalencia.codins}/equivalenciasdepositos/${equivalencia.tctaTipcta}`), equivalenciaUpdate);
  }

  delete(equivalencia: EquivalenciaTipoCuenta): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/equivalenciasdepositos/empresas/${equivalencia.idEmpresa}/tiposinstitucionesdepositos/${equivalencia.tipiCodtip}/${equivalencia.codins}/equivalenciasdepositos/${equivalencia.tctaTipcta}`));
  }

}
