import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../../empresas/interfaces/compania.interfaces';
import { SituacionService } from '../../services/situacion.service';

@Component({
  selector: 'app-data-table-empresa',
  templateUrl: './data-table-empresa.component.html',
  styleUrls: ['./data-table-empresa.component.scss']
})
export class DataTableEmpresaComponent implements OnInit {

  @Input() companias!: Company[];
  @Input() tab: string = 'consultar';

  // Table
  columns: TableHead[] = [];

  constructor(private situacionService: SituacionService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',     header: 'Código'      },
      { field: 'nombre', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRow$.emit(event.data);
    // Limpiar variables observables de tablas tipo nomina y situacion
    this.selectRowService.selectRowAlterno$.emit(null);
    this.situacionService.selectRowSituacion$.emit(null);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
    // Limpiar variables observables de tablas tipo nomina y situacion
    this.selectRowService.selectRowAlterno$.emit(null);
    this.situacionService.selectRowSituacion$.emit(null);
  }

}
