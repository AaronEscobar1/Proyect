import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../services/company-nomina.service';

@Component({
  selector: 'app-data-table-empresa',
  templateUrl: './data-table-empresa.component.html',
  styleUrls: ['./data-table-empresa.component.scss']
})
export class DataTableEmpresaComponent implements OnInit {

  // Objeto para mostrar las compañias en la tabla
  @Input() companias!: Company[];

  // Columnas de la table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService,
              private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',     header: 'Código'      },
      { field: 'nombre', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRow$.emit(event.data);
    // Limpiar variables observables de tablas tipo nomina y la tercera tabla
    this.selectRowService.selectRowAlterno$.emit(null);
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
    // Limpiar variables observables de tablas tipo nomina y la tercera tabla
    this.selectRowService.selectRowAlterno$.emit(null);
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
