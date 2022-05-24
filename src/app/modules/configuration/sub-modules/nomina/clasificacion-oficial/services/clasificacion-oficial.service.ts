import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBack } from '../../../../../../shared/interfaces/response.interfaces';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { OfficialClassification } from '../interfaces/clasificacion-oficial.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionOficialService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint('/clasificacion-oficial'));
  }

  getById(id: string): Observable<ResponseBack> {
    return this.http.get(this.helpers.getBasicEndPoint(`/clasificacion-oficial/${id}`));
  }

  create(officialClassification: OfficialClassification): Observable<ResponseBack> {
    return this.http.post(this.helpers.getBasicEndPoint('/clasificacion-oficial'), officialClassification);
  }

  update(officialClassification: OfficialClassification): Observable<ResponseBack> {
    return this.http.put(this.helpers.getBasicEndPoint(`/clasificacion-oficial/${officialClassification.codclao}`), officialClassification);
  }

  delete(id: string): Observable<ResponseBack> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/clasificacion-oficial/${id}`));
  }

}
