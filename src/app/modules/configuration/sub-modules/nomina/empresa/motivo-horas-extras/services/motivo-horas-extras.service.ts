import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { MotivoHoraExtra, MotivoHoraExtraUpdate } from '../interfaces/motivo-horas-extras.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MotivoHorasExtrasService {

  private baseUrlModule: string = '/configuraciones/nominas/motivoshorasextras';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de motivos horas extras
  getMotivosHorasExtrasByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${idEmpresa}`));
  }

  create(motivoHoraExtra: MotivoHoraExtra): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.baseUrlModule}`), motivoHoraExtra);
  }

  update(motivoHoraExtra: MotivoHoraExtra, motivoHoraExtraUpdate: MotivoHoraExtraUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${motivoHoraExtra.idEmpresa}/${motivoHoraExtra.id}`), motivoHoraExtraUpdate);
  }

  delete(motivoHoraExtra: MotivoHoraExtra): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.baseUrlModule}/${motivoHoraExtra.idEmpresa}/${motivoHoraExtra.id}`));
  }

}
