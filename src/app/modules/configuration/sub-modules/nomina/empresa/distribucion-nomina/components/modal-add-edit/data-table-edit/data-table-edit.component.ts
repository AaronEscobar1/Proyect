import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { distribucionNominaData } from '../../../interfaces/distribucion-impuesto-data';
import { DistribucionNominaEmpresa } from '../../../interfaces/distribucion-impuesto.interfaces';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-data-table-edit',
  templateUrl: './data-table-edit.component.html',
  styleUrls: ['./data-table-edit.component.scss']
})
export class DataTableEditComponent implements OnInit {

  // Objetos
  distribucionNominas: DistribucionNominaEmpresa[] = [];
  distribucionNominaSelect: DistribucionNominaEmpresa | undefined;

  // Emisión de eventos (cerrar modal)
  @Output() onCloseModal = new EventEmitter();

  // Table
  columns: TableHead[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'coddis', header: 'Código'      },
      { field: 'desdis', header: 'Descripción' },
      { field: 'ubidis', header: 'Ubicación'   }
    ];
    this.distribucionNominas = distribucionNominaData;
    // console.log(this.distribucionNominas);
  }

  guardar(): void {
    // console.log('Guardar tabla edit', this.distribucionNominas);
    this.distribucionNominas = this.distribucionNominas.filter(value => value.coddis !== '');
    // console.log('GUARDAR', this.distribucionNominas);
    this.onCloseModal.emit();
  }

  addNewRow(): void {
    // console.log('agregar fila', this.distribucionNominas.length);
    if( this.distribucionNominas.length >= 10 ) {
      this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede agregar mas filas.', life: 3000});
      return;
    }
    this.distribucionNominas.push({ coddis: '', desdis: '', ubidis: '' });
  }

}
