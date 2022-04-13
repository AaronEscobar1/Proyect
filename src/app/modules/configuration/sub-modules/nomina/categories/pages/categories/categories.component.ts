import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Categories } from '../../interfaces/categories.interfaces';
import { TypesFile } from '../../../../../../../shared/interfaces/typesFiles.interfaces';
import { CategoriesService } from '../../services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Helpers } from '../../../../../../../shared/helpers/helpers';
import { categoriesData } from '../../interfaces/categories';

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
  typesFile : TypesFile[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar categorias';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private categoriesService: CategoriesService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      codcat: ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      descat: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this)]],
    });
  }

  ngOnInit(): void {
    this.typesFile = [
      { name: 'PDF',  code: 'PDF'  },
      { name: 'CSV',  code: 'CSV'  },
      { name: 'XML',  code: 'XML'  },
      { name: 'RFT',  code: 'RFT'  },
      { name: 'HTML', code: 'HTML' },
      { name: 'XLS',  code: 'XLS'  }
    ];
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    setTimeout(() => {
      this.categories = categoriesData;
      this.spinner.hide();
    }, 500);
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
    this.titleForm = this.isEdit ? 'Editar categoria' : 'Agregar categoria';
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
    console.log('this.form.value > ', this.form.value);
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
      console.log('Update', data);
      this.categories[this.findIndexById(this.form.getRawValue().codcat)] = this.form.getRawValue();
      this.categories = [...this.categories];
      this.spinner.hide();
      this.closeModal();
      return;
    }

    // Crear
    console.log('Create', data);
    this.categories.push(data);
    this.categories = [...this.categories];
    this.spinner.hide();
    this.closeModal();

  }
  
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].codcat === id) {
            index = i;
            break;
        }
    }
    return index;
  } 

  /**
   * Carga la data en el formulario para editar
   * @param categories row de la tabla
   * @returns void
   */
  editRow(categories: Categories): void {
    this.isEdit = true;
    if (!categories) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return;
    }
    this.form.controls['codcat'].disable();
    this.form.reset(categories);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param categories row de la tabla
   * @returns void
   */
  deleteRow(categories: Categories): void {
    if (!categories) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return; 
    }
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar la categoria <b>${categories.descat}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.categories = this.categories.filter(cat => cat.codcat !== categories.codcat);
        this.spinner.hide();
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
