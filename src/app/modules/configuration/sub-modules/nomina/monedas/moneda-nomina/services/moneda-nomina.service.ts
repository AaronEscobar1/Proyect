import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { MonedaNominaUpdate, MonedaNomina } from '../interfaces/moneda-nomina.interfaces';


@Injectable({
  providedIn: 'root'
})
export class MonedaNominaService {

  private url: string = '/configuraciones/nominas/monedasnominas';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  // Endpoints de monedas nominas
  getAllMonedasNominasByEmpresaNomina(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}/nominas/${idNomina}/monedas`));
  }

  create(monedaNomina: MonedaNomina): Observable<any> {
    const { empresaid, nominaid, tipo, ...monedaNominaCreate } = monedaNomina;
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}/empresas/${empresaid}/nominas/${nominaid}/monedas`), monedaNominaCreate);
  }

  update(monedaNomina: MonedaNomina, monedaNominaUpdate: MonedaNominaUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/empresas/${monedaNomina.empresaid}/nominas/${monedaNomina.nominaid}/monedas/${monedaNomina.monedaid}?fvigencia=${monedaNomina.fvigencia}`), monedaNominaUpdate);
  }

  delete(monedaNomina: MonedaNomina): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/empresas/${monedaNomina.empresaid}/nominas/${monedaNomina.nominaid}/monedas/${monedaNomina.monedaid}?fvigencia=${monedaNomina.fvigencia}`));
  }

}
