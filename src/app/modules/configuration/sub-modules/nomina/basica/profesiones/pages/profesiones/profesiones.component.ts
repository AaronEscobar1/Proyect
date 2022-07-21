import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfesionesService } from '../../services/profesiones.service';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { Profession } from '../../interfaces/professions.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-profesiones',
  templateUrl: './profesiones.component.html',
  styleUrls: ['./profesiones.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class ProfesionesComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  professions: Profession[] = [];
  professionSelect: Profession | undefined;
  typesFile  : TypesFile[] = typesFileData;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar profesiones';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private profesionesService: ProfesionesService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.profesionesService.getAll()
      .subscribe({
        next: (res) => {
          this.professions = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.professions = [];
    this.loadData();
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar profesiones' : 'Agregar profesiones';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.professionSelect = undefined
    this.createModal = false;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  /**
   * Carga la data en el formulario para editar
   * @param profesion row de la tabla
   * @returns void
   */
  editRow(profesion: Profession): void {
    this.isEdit = true;
    this.professionSelect = profesion
    this.openModalCreate();
  }
  
  /**
   * Elimina un registro
   * @param profesion row de la tabla
   * @returns void
   */
  deleteRow(profesion: Profession) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta profesión <b>${profesion.desprf}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.profesionesService.delete(profesion.codprf)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowService.selectRow$.emit(null);
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar profesión.', life: 3000});
            }
          });
      }
    });
  }

}
