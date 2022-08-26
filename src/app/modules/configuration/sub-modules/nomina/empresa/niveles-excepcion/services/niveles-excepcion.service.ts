import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { NivelExcepcion, NivelExcepcionUpdate } from '../interfaces/niveles-excepcion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NivelesExcepcionService {

  private baseUrlModule: string = '/configuraciones/nominas/nivelesexcepciones';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de niveles de excepcion
  getAllNivelesExcepcionByEmpresaNomina(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${idEmpresa}/${idNomina}`));
  }

  getNivelExcepcionByEmpresaNomina(idEmpresa: string, idNomina: string, idCodNiv: number): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${idEmpresa}/${idNomina}/${idCodNiv}`));
  }

  create(nivelExcepcion: NivelExcepcion): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.baseUrlModule}`), nivelExcepcion);
  }

  update(nivelExcepcion: NivelExcepcion, nivelExcepcionUpdate: NivelExcepcionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${nivelExcepcion.idEmpresa}/${nivelExcepcion.idNomina}/${nivelExcepcion.codniv}`), nivelExcepcionUpdate);
  }

  delete(nivelExcepcion: NivelExcepcion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${nivelExcepcion.idEmpresa}/${nivelExcepcion.idNomina}/${nivelExcepcion.codniv}`));
  }

}
