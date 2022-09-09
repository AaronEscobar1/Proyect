import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { FactorConversion, FactorConversionCreate, FactorConversionUpdate } from '../interfaces/factor.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FactorService {

  private url: string = '/configuraciones/nominas/factoresconversion';

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  getFactoresConversionByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`${this.url}/empresas/${idEmpresa}`));
  }

  create(factorConversionCreate: FactorConversionCreate): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint(`${this.url}`), factorConversionCreate);
  }

  update(factorCreate: FactorConversionCreate, factorUpdate: FactorConversionUpdate): Observable<any> {
    return this.http.put(this.helpers.getBasicEndPoint(`${this.url}/empresas/${factorCreate.idEmpresa}/tiposmonedas/${factorCreate.idMonOrigen}/${factorCreate.idMonDestino}/factoresconversion/${factorCreate.fvigencia}`), factorUpdate);
  }

  delete(factor: FactorConversion): Observable<any> {
    return this.http.delete(this.helpers.getBasicEndPoint(`${this.url}/empresas/${factor.idEmpresa}/tiposmonedas/${factor.idMonOrigen}/${factor.idMonDestino}/factoresconversion/${factor.fvigencia}`));
  }

}
