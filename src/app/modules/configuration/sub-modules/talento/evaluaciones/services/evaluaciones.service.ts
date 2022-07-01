import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Evaluaciones } from '../interfaces/evaluaciones.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/evaluaciones'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/evaluaciones/${id}`));
  }

  create(evaluaciones: Evaluaciones): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/evaluaciones'), evaluaciones);
  }

  update(evaluaciones: Evaluaciones): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/evaluaciones/${evaluaciones.id}`), evaluaciones);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/evaluaciones/${id}`));
  }

  getAllTiposEvaluaciones(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/tiposevaluaciones'));
  }

}
