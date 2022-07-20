import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { OfficialClassification } from '../../interfaces/clasificacion-oficial.interfaces';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClasificacionOficialService } from '../../services/clasificacion-oficial.service';

@Component({
  selector: 'app-clasificacion-oficial',
  templateUrl: './clasificacion-oficial.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ClasificacionOficialComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  officialClassification: OfficialClassification[] = [];
  officialClassificationSelect: OfficialClassification | undefined;
  typesFile             : TypesFile[] = typesFileData;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar clasificación oficial';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private clasificacionOficialService: ClasificacionOficialService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.clasificacionOficialService.getAll()
      .subscribe({
        next: (resp) => {
          this.officialClassification = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.officialClassification = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar clasificación oficial' : 'Agregar clasificación oficial';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.officialClassificationSelect = undefined;
    this.createModal = false;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  /**
   * Carga la data en el formulario para editar
   * @param officialClassification row de la tabla
   * @returns void
   */
  editRow(officialClassification: OfficialClassification): void {
    this.isEdit = true;
    this.officialClassificationSelect = officialClassification
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param officialClassification row de la tabla
   * @returns void
   */
  deleteRow(officialClassification: OfficialClassification): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta clasificación oficial <b>${officialClassification.desofi}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.clasificacionOficialService.delete(officialClassification.codofi, officialClassification.tiprep)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la clasificación' + err.error.detail, life: 3000});
            }
          });
      }
    });
  }
  
}
