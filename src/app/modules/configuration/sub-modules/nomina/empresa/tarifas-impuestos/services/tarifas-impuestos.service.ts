import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { TarifaImpuesto } from '../interfaces/tarifas-impuestos.interfaces';

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

  update(tarifaImpuesto: TarifaImpuesto): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`/configuraciones/nominas/tarifasimpuestos/${tarifaImpuesto.idEmpresa}/${tarifaImpuesto.remdes}/${tarifaImpuesto.remhas}/${tarifaImpuesto.frecue}/${tarifaImpuesto.tipreg}?anomes=${tarifaImpuesto.anomes}`), tarifaImpuesto);
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
