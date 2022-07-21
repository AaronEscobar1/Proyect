import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { Categories } from '../../interfaces/categories.interfaces';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CategoriesService } from '../../services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class CategoriesComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  categories: Categories[] = [];
  categoriesSelect!: Categories | undefined;
  typesFile : TypesFile[] = typesFileData;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar categorías';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private categoriesService: CategoriesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.categoriesService.getAll()
      .subscribe({
        next: (res) => {
          this.categories = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.categories = [];
    this.loadData();
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar categoría' : 'Agregar categoría';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.categoriesSelect = undefined
    this.createModal = false;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }
  
  /**
   * Carga la data en el formulario para editar
   * @param category row de la tabla
   * @returns void
   */
  editRow(category: Categories): void {
    this.isEdit = true;
    this.categoriesSelect = category;
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param category row de la tabla
   * @returns void
   */
  deleteRow(category: Categories): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta categoría <b>${category.descat}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.categoriesService.delete(category.codcat)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowService.selectRow$.emit(null);
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la categoría', life: 3000});
            }
          });
      }
    });
  }

}
