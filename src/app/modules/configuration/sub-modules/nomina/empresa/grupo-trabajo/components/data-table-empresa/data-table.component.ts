import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../../empresas/interfaces/compania.interfaces';
import { GrupoTrabajoService } from '../../services/grupo-trabajo.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() companias!: Company[];
  @Input() tab: string = 'consultar';

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService,
              private grupoTrabajoService: GrupoTrabajoService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',     header: 'Código'      },
      { field: 'nombre', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRow$.emit(event.data);
    // Limpiar variables observables de tablas tipo nomina y grupo de trabajo
    this.selectRowService.selectRowAlterno$.emit(null);
    this.grupoTrabajoService.selectRowGrupo$.emit(null);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
    // Limpiar variables observables de tablas tipo nomina y grupo de trabajo
    this.selectRowService.selectRowAlterno$.emit(null);
    this.grupoTrabajoService.selectRowGrupo$.emit(null);
  }

}
