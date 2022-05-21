import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClasificacionMotivo, MotivosFiniquito } from '../../interfaces/motivos-finiquito.interfaces';
import { MotivosFiniquitoService } from '../../services/motivos-finiquito.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-motivos-finiquito',
  templateUrl: './motivos-finiquito.component.html',
  styleUrls: ['./motivos-finiquito.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class MotivosFiniquitoComponent implements OnInit {

  // Objetos
  motivosFiniquito    : MotivosFiniquito[] = [];
  motivoFiniquito!    : MotivosFiniquito | undefined;
  classificationMotive: ClasificacionMotivo[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar motivos de finiquito';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private motivosFiniquitoService: MotivosFiniquitoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    this.motivosFiniquitoService.getAll()
      .subscribe({
        next: (res) => {
          this.motivosFiniquito = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.motivosFiniquito = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  openModalCreate(): void {
    if (!this.isEdit) {
    }
    this.titleForm = this.isEdit ? 'Editar motivos de finiquito' : 'Agregar motivos de finiquito';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.motivoFiniquito = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param motivosFiniquito row de la tabla
   * @returns void
   */
  editRow(motivosFiniquito: MotivosFiniquito): void {
    this.isEdit = true;
    this.titleForm = this.isEdit ? 'Editar niveles educativos' : 'Agregar niveles educativos';
    this.motivoFiniquito = motivosFiniquito
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param motivosFiniquito row de la tabla
   * @returns void
   */
    deleteRow(motivosFiniquito: MotivosFiniquito): void {
      this.confirmationService.confirm({
        message: `¿Estas seguro que quieres borrar el motivo de finiquito <b>${motivosFiniquito.desde1}</b>?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Si',
        accept: () => {
          this.spinner.show();
          this.motivosFiniquitoService.delete(motivosFiniquito.coddes)
            .subscribe({
              next: (resp) => {
                this.spinner.hide();
                this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
                this.loadData();
              },
              error: (err) => {
                this.spinner.hide();
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el motivo finiquito', life: 3000});
              }
            });
        }
      });
    }

}
