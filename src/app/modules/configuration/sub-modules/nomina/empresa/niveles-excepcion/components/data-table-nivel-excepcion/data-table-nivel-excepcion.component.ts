import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { NivelExcepcion } from '../../interfaces/niveles-excepcion.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table-nivel-excepcion',
  templateUrl: './data-table-nivel-excepcion.component.html',
  styleUrls: ['./data-table-nivel-excepcion.component.scss']
})
export class DataTableNivelExcepcionComponent implements OnInit {

  // Objeto para mostrar todos los niveles de excepcion por empresa y tipo nomina
  @Input() nivelesExcepcion: NivelExcepcion[] = [];

  // Table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codniv', header: 'Código'      },
      { field: 'desniv', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
