import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { TipoInstitucion, TipoInstitucionUpdate } from '../interfaces/tipo-instituciones-deposito.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoInstitucionesDepositoService {

  private baseUrlModule: string = '/configuraciones/nominas/tiposinstitucionesdepositos';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de tipos instituciones
  getTiposInstitucionesByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${idEmpresa}`));
  }

  // Endpoints para obtener las instituciones por tipo de institucion
  getAllInstitucionesByTipoInstitucion(idEmpresa: string, idTipoInstitucion: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/institucionesdepositos/empresas/${idEmpresa}/tiposinstitucionesdepositos/${idTipoInstitucion}`));
  }

  create(tipoInstitucion: TipoInstitucion): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.baseUrlModule}`), tipoInstitucion);
  }

  update(tipoInstitucion: TipoInstitucion, tipoInstitucionUpdate: TipoInstitucionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${tipoInstitucion.idEmpresa}/${tipoInstitucion.codtip}`), tipoInstitucionUpdate);
  }

  delete(tipoInstitucion: TipoInstitucion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${tipoInstitucion.idEmpresa}/${tipoInstitucion.codtip}`));
  }

  // Obtener clases instituciones depositos
  getClasificacionInstituciones(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/clasesinstitucionesdepositos`));
  }

}
