import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { TipoInstitucion } from '../../interfaces/tipo-instituciones-deposito.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  // Objeto para mostrar en la tabla
  @Input() tiposInstituciones!: TipoInstitucion[];

  // Objeto de clasifiaciones instituciones de deposito
  @Input() clasificacionesFilter: dropdownType[] = [];

  // Table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codtip',                                  header: 'Código'        },
      { field: 'destip',                                  header: 'Descripción'   },
      { field: 'nmClaseTipoInstitucionTb.clatip',         header: 'Clasificación' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
