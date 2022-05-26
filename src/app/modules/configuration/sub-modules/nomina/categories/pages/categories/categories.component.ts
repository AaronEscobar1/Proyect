import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Categories } from '../../interfaces/categories.interfaces';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CategoriesService } from '../../services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class CategoriesComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  categories: Categories[] = [];
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
              private fb: FormBuilder) {
    this.form = this.fb.group({
      codcat: ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      descat: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this)]],
    });
  }

  // funcion de espera para simular
  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
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
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    if (!this.isEdit) {
      this.form.controls['codcat'].enable();
    }
    this.titleForm = this.isEdit ? 'Editar categoría' : 'Agregar categoría';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.form.reset();
    this.createModal = false;
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: Categories = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.descat.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.categoriesService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.loadData();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la categoría.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.categoriesService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.loadData();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la categoría.', life: 3000});
        }
      });
  }
  
  /**
   * Carga la data en el formulario para editar
   * @param category row de la tabla
   * @returns void
   */
  editRow(category: Categories): void {
    this.isEdit = true;
    this.form.controls['codcat'].disable();
    this.form.reset(category);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param category row de la tabla
   * @returns void
   */
  deleteRow(category: Categories): void {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar la categoría <b>${category.descat}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.categoriesService.delete(category.codcat)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
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

  export() {

  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
              && this.form.invalid;
  }
  
  // Mensajes de errores dinamicos
  get codcatMsgError(): string {
    const errors = this.form.get('codcat')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máximo de 4 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }
  
  // Mensajes de errores dinamicos
  get descatMsgError(): string {
    const errors = this.form.get('descat')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
    }
    return '';
  }

  /**
   * Validar id duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
      const duplicated = this.categories.findIndex(cat => cat.codcat === control.value);
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
  }

  /**
   * Validar descripcion duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedDesniv(control: AbstractControl): ValidationErrors | null {
    if (this.isEdit) {
      if( !control.value && !this.form.getRawValue() && this.categories) { return null; }
      const duplicatedEdit = this.categories.findIndex(
        cat => cat.descat.trim().toLowerCase() === this.form.getRawValue().descat.trim().toLowerCase() 
                  && cat.codcat !== this.form.getRawValue().codcat
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.categories.findIndex(cat => cat.descat.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
