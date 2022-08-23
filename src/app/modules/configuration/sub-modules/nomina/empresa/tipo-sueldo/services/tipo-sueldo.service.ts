import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { TipoSueldo, TipoSueldoCreate, TipoSueldoUpdate } from '../interfaces/tipo-sueldo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoSueldoService {

  private baseUrlModule: string = '/configuraciones/nominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de tipos de sueldos
  getTiposSueldosByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/tipossalarios/${idEmpresa}`));
  }

  create(tipoSueldo: TipoSueldoCreate): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/tipossalarios`), tipoSueldo);
  }

  update(tipoSueldo: TipoSueldo, tipoSueldoUpdate: TipoSueldoUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/tipossalarios/${tipoSueldo.idEmpresa}/${tipoSueldo.id}`), tipoSueldoUpdate);
  }

  delete(tipoSueldo: TipoSueldo): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/tipossalarios/${tipoSueldo.idEmpresa}/${tipoSueldo.id}`));
  }

}
