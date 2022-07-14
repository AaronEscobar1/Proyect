import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Competencias } from '../interfaces/competencias.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompetenciasService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/talentos/competencias'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/talentos/competencias/${id}`));
  }

  create(competencia: Competencias): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/talentos/competencias'), competencia);
  }

  update(competencia: Competencias): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/talentos/competencias/${competencia.id}`), competencia);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/talentos/competencias/${id}`));
  }

  getAllTiposCompetencias(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/talentos/tiposcompetencias'));
  }

}
