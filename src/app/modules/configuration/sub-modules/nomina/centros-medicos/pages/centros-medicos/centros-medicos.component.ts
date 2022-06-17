import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CentrosMedicos } from '../../interfaces/centro-medico.interfaces';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CentrosMedicosService } from '../../services/centros-medicos.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-centros-medicos',
  templateUrl: './centros-medicos.component.html',
  styleUrls: ['./centros-medicos.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class CentrosMedicosComponent implements OnInit {

  // Objetos
  centrosMedicos: CentrosMedicos[] = [];
  centrosMedicosSelect: CentrosMedicos | undefined;
  typesFile     : TypesFile[] = typesFileData;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar centro médico';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private centrosMedicosService: CentrosMedicosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.centrosMedicosService.getAll()
      .subscribe({
        next: (res) => {
          this.centrosMedicos = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.centrosMedicos = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar centro médico' : 'Agregar centro médico';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.centrosMedicosSelect = undefined
    this.createModal = false;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  /**
   * Carga la data en el formulario para editar
   * @param centroMedico row de la tabla
   * @returns void
   */
  editRow(centroMedico: CentrosMedicos): void {
    this.isEdit = true;
    this.centrosMedicosSelect = centroMedico
    this.openModalCreate();
  }
  
  /**
   * Elimina un registro
   * @param centroMedico row de la tabla
   * @returns void
   */
  deleteRow(centroMedico: CentrosMedicos): void {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el centro médico <b>${centroMedico.desmed}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.centrosMedicosService.delete(centroMedico.codmed)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el centro médico', life: 3000});
            }
          });
      }
    });
  }

}
