import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Institucion } from '../interfaces/instituciones.interfaces';
import { InstitucionPrograma, InstitucionProgramaUpdate } from '../interfaces/instituciones-programas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProgramasInstitucionService {

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getProgramaInstitucionesByEmpresa(institucion: Institucion): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/programasdepositos/empresas/${institucion.idEmpresa}/tiposinstitucionesdepositos/${institucion.tipiCodtip}/${institucion.codins}`));
  }

  create(institucionPrograma: InstitucionPrograma): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/programasdepositos`), institucionPrograma);
  }

  update(institucionPrograma: InstitucionPrograma, institucionUpdate: InstitucionProgramaUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/programasdepositos/empresas/${institucionPrograma.idEmpresa}/tiposinstitucionesdepositos/${institucionPrograma.tipiCodtip}/${institucionPrograma.codins}/programasdepositos/${institucionPrograma.nombrePgm}`), institucionUpdate);
  }

  delete(institucionPrograma: InstitucionPrograma): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/programasdepositos/empresas/${institucionPrograma.idEmpresa}/tiposinstitucionesdepositos/${institucionPrograma.tipiCodtip}/${institucionPrograma.codins}/programasdepositos/${institucionPrograma.nombrePgm}`));
  }

  // Obtener todos los tipos de programas
  getTiposProgramas(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/tiposprogramas`));
  }

}
