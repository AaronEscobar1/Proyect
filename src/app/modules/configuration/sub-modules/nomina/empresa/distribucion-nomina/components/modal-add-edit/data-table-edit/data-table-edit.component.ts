import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { distribucionNominaData } from '../../../interfaces/distribucion-impuesto-data';
import { DistribucionNominaEmpresa } from '../../../interfaces/distribucion-impuesto.interfaces';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';

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

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

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
    if ( this.validatedSaveAndNewRow() ) {
      this.deleteRow();
      return;
    };
    // console.log('Guardar tabla edit', this.distribucionNominas);
    this.distribucionNominas = this.distribucionNominas.filter(value => value.coddis !== '');
    // console.log('GUARDAR', this.distribucionNominas);
    this.onCloseModal.emit();
  }

  addNewRow(): void {
    if ( this.validatedSaveAndNewRow() ) { return };
    if ( this.distribucionNominas.length >= 10 ) {
      this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede agregar mas de 10 filas.', life: 3000});
      return;
    }
    this.distribucionNominas.push({ coddis: '', desdis: '', ubidis: '' });
  }

  validatedSaveAndNewRow(): boolean {
    const checkArray = this.distribucionNominas.filter(value => !value.coddis || !value.desdis);
    if ( checkArray.length > 0 ) {
      this.messageService.add({severity: 'warn', summary: 'Error', detail: 'Debe ingresar el código y descripción de todos los registros.', life: 3000});
      return true;
    }
    return false;
  }

  deleteRow(): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar los registros vacios?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.distribucionNominas = this.distribucionNominas.filter(value => value.coddis && value.desdis !== '');
      }
    });
  }

}
