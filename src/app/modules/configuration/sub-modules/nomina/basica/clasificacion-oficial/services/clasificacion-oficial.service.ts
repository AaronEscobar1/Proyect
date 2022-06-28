import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
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
