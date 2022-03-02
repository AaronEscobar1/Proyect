import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * @name get by José Ramírez
   * @version 1.0
   * @brief Obtiene variable de localStorage
   *
   * @params key: string
   * @return any
   */
  get(key: string): any | null{
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e){
      console.log('ERROR GET-LOCALSTORE: ', e);
    }
  }

  /**
   * @name set by José Ramírez
   * @version 1.0
   * @brief Guarda variable en el localStorage
   *
   * @return null
   */
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log('ERROR SET-LOCALSTORE: ', e);
    }
  }

  /**
   * @name remove by José Ramírez
   * @version 1.0
   * @brief Elimina variable en el localStorage
   *
   * @return null
   */
   remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.log('ERROR REMOVE-LOCALSTORE: ', e);
    }
  }

  /**
   * @name clear by José Ramírez
   * @version 1.0
   * @brief Elimina variable en el localStorage
   *
   * @return null
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.log('ERROR CLEAR-LOCALSTORE: ', e);
    }
  }

}
