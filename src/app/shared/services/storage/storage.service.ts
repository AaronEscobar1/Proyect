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
  get(key: string): any | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * @name set by José Ramírez
   * @version 1.0
   * @brief Guarda variable en el localStorage
   *
   * @return null
   */
  set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * @name remove by José Ramírez
   * @version 1.0
   * @brief Elimina variable en el localStorage
   *
   * @return null
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * @name clear by José Ramírez
   * @version 1.0
   * @brief Elimina variable en el localStorage
   *
   * @return null
   */
  clear(): void {
    localStorage.clear();
  }

}
