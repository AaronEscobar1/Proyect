import { Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';
import { CargoTabulador } from '../interfaces/cargos-tabulador.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CargosTabuladorService {

  private url: string = '/configuraciones/nominas/cargostabuladores';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de cargos por tabulador
  getCargosTabuladorByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}`));
  }

  create(cargoTabulador: CargoTabulador): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}`), cargoTabulador);
  }

  delete(cargoTabulador: CargoTabulador): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/empresas/${cargoTabulador.nmCargoTabuladorTbId.idEmpresa}/${cargoTabulador.nmCargoTabuladorTbId.id}`));
  }

}
