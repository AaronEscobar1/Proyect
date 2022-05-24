import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../../../shared/services/http/http.service';
import { Helpers } from '../../../../../../shared/helpers/helpers';
import { OfficialClassification } from '../interfaces/clasificacion-oficial.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionOficialService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/clasificacionesoficiales'));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/clasificacionesoficiales/${id}`));
  }

  create(officialClassification: OfficialClassification): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/clasificacionesoficiales'), officialClassification);
  }

  update(officialClassification: OfficialClassification): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/clasificacionesoficiales/${officialClassification.codofi}/${officialClassification.tiprep}`), officialClassification);
  }

  delete(clasif_codigo: string, clasif_tipo: string): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/clasificacionesoficiales/${clasif_codigo}/${clasif_tipo}`));
  }

}
