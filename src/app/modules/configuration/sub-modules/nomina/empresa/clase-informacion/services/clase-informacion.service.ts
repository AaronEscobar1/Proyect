import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { ClaseInformacion, ClaseInformacionCreate, ClaseInformacionUpdate } from '../interfaces/clase-informacion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClaseInformacionService {

  private url: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getClasesInformacionByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/clasesdeinformaciones/${idEmpresa}`));
  }

  create(claseInformacionCreate: ClaseInformacionCreate): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/clasesdeinformaciones/`), claseInformacionCreate);
  }

  update(claseInformacion: ClaseInformacionCreate, claseInformacionUpdate: ClaseInformacionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/clasesdeinformaciones/${claseInformacion.idEmpresa}/${claseInformacion.id}`), claseInformacionUpdate);
  }

  delete(claseInformacion: ClaseInformacion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/clasesdeinformaciones/${claseInformacion.nmInformacionClaseTbId.idEmpresa}/${claseInformacion.nmInformacionClaseTbId.id}`));
  }

  // Obtener equivalencias de informaciones
  getEquivalencias(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/equivalenciasinformaciones`));
  }

}
