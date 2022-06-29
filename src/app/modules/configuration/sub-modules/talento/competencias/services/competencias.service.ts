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
    return this.http.get(this.helpers.getBasicEndPoint('/competencias'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/competencias/${id}`));
  }

  create(competencia: Competencias): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/competencias'), competencia);
  }

  update(competencia: Competencias): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/competencias/${competencia.id}`), competencia);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/competencias/${id}`));
  }

  getAllTiposCompetencias(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/tiposcompetencias'));
  }

}
