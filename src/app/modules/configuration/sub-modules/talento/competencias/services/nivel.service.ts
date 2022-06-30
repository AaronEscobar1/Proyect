import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { Niveles } from '../interfaces/nivel.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/nivelescompetencias'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/nivelescompetencias/${id}`));
  }

  create(niveles: Niveles): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/nivelescompetencias'), niveles);
  }

  update(niveles: Niveles): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/nivelescompetencias/${niveles.id}`), niveles);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/nivelescompetencias/${id}`));
  }

}
