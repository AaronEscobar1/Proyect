import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { RotacionGrupo } from '../interfaces/rotacion-grupo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RotacionGrupoService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/rotacion-grupo'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/rotacion-grupo/${id}`));
  }

  create(rotacionGrupo: RotacionGrupo): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/rotacion-grupo'), rotacionGrupo);
  }

  update(rotacionGrupo: RotacionGrupo): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/rotacion-grupo/${rotacionGrupo.codemp}`), rotacionGrupo);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/rotacion-grupo/${id}`));
  }

}
