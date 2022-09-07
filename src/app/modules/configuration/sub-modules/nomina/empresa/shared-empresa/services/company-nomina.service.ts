import { EventEmitter, Injectable } from '@angular/core';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyNominaService {

  // Variable para obtener el row desde la tercera tabla
  public selectRowThirdTable$ = new EventEmitter<any | null>();

  constructor(private http: HttpService,
              private helpers: Helpers) { }

  /**
   * Obtener todas las empresas
   * @returns Observable<any>
   */
  getAll(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/nominas/empresas'));
  }

  /**
   * Obtener todas las nominas por empresa
   * @param idEmpresa: string
   * @returns Observable<any>
   */
  getAllNominasByEmpresa(idEmpresa: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas`));
  }

  /**
   * Obtener todas rotaciones de grupos por empresa y nomina
   * @param idEmpresa: string
   * @param idNomina: string
   * @returns Observable<any>
   */
  getAllRotacionGruposByEmpresaNomina(idEmpresa: string, idNomina: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas/${idNomina}/rotaciongrupos`));
  }

  /**
   * Obtener todas rotaciones de grupos por empresa, nomina y rotacion de grupo
   * @param idEmpresa: string
   * @param idNomina: string
   * @param idRotacionGrupo: string
   * @returns Observable<any>
   */
  getAllRotacionGruposByEmpresaNominaRotacionGrupo(idEmpresa: string, idNomina: string, idRotacionGrupo: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/nominas/empresas/${idEmpresa}/nominas/${idNomina}/rotaciongrupos/${idRotacionGrupo}`));
  }

  /**
   * Obtener todos los paises
   * @returns Observable<any>
   */
  getAllCountry(): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint('/configuraciones/organizaciones/paises'));
  }

  /**
   * Obtener todos las entidades por pais
   * @param codCountry: codigo pais
   * @returns Observable<any>
   */
  getEntitiesByCountry(codCountry: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/organizaciones/entidadesfederales/${codCountry}`));
  }

  /**
   * Obtener todos los municipios por pais y entidad
   * @param codCountry: codigo pais
   * @param codEntity: codigo entidad
   * @returns Observable<any>
   */
  getMunicipalitiesByCountryEntity(codCountry: string, codEntity: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/organizaciones/paises/${codCountry}/entidades/${codEntity}/municipios`));
  }

  /**
   * Obtener todas las parroquias por pais, entidad y municipio
   * @param codCountry: codigo pais 
   * @param codEntity: codigo entidad
   * @param codmunicipality: codigo municipio
   * @returns Observable<any>
   */
  getParishesByCountryEntityMunicipality(codCountry: string, codEntity: string, codMunicipality: string): Observable<any> {
    return this.http.get(this.helpers.getBasicEndPoint(`/configuraciones/organizaciones/paises/${codCountry}/entidades/${codEntity}/municipios/${codMunicipality}/parroquias`));
  }

}
