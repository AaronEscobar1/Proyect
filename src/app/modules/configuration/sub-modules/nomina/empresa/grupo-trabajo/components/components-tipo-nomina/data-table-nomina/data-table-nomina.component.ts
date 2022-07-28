import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TipoNomina } from '../../../interfaces/nominas.interfaces';

@Component({
  selector: 'app-data-table-nomina',
  templateUrl: './data-table-nomina.component.html',
  styleUrls: ['./data-table-nomina.component.scss']
})
export class DataTableNominaComponent implements OnInit {

  @Input() tiposNominas!: TipoNomina[];
  @Input() tab: string = 'consultar';

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'tipnom', header: 'Código'      },
      { field: 'desnom', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    const tipoNominaSelect: TipoNomina = event.data;
    this.selectRowService.selectRowAlterno$.emit(tipoNominaSelect);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRowAlterno$.emit(null);
  }

}
