import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { TarifaImpuesto, TarifaImpuestoUpdate } from '../interfaces/tarifas-impuestos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TarifasImpuestosService {

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getAllTarifasByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/tarifasimpuestos/${idEmpresa}`));
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/tarifasimpuestos/${id}`));
  }

  create(tarifaImpuesto: TarifaImpuesto): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/configuraciones/nominas/tarifasimpuestos'), tarifaImpuesto);
  }

  update(parametrosConsulta: TarifaImpuesto, tarifaImpuestoUpdate: TarifaImpuestoUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/tarifasimpuestos/${parametrosConsulta.idEmpresa}/${parametrosConsulta.remdes}/${parametrosConsulta.remhas}/${parametrosConsulta.frecue}/${parametrosConsulta.tipreg}?anomes=${parametrosConsulta.anomes}`), tarifaImpuestoUpdate);
  }

  delete(tarImp: TarifaImpuesto): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`/configuraciones/nominas/tarifasimpuestos/${tarImp.idEmpresa}/${tarImp.remdes}/${tarImp.remhas}/${tarImp.frecue}/${tarImp.tipreg}?anomes=${tarImp.anomes}`));
  }

  getTiposTarifas(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/tipostarifasimpuestos`));
  }

  getFrecuenciasImpuestos(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/frecuenciasimpuestos`));
  }

}
