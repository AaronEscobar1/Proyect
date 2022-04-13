import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { OfficialClassification } from '../../interfaces/clasificacion-oficial.interfaces';
import { TypesFile } from '../../../../../../../shared/interfaces/typesFiles.interfaces';
import { Helpers } from '../../../../../../../shared/helpers/helpers';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClasificacionOficialService } from '../../services/clasificacion-oficial.service';
import { officialClassificationData } from '../../interfaces/clasificacion-oficial';

@Component({
  selector: 'app-clasificacion-oficial',
  templateUrl: './clasificacion-oficial.component.html',
  styleUrls: ['./clasificacion-oficial.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class ClasificacionOficialComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  officialClassification: OfficialClassification[] = [];
  typesFile             : TypesFile[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar clasificación oficial';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private clasificacionOficialService: ClasificacionOficialService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      codclao: ['', [ Validators.required, Validators.maxLength(2), this.validatedId.bind(this) ]],
      desclao: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this) ]],
      typeclao: ['', [ Validators.required, Validators.maxLength(30) ]]
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
      this.officialClassification = officialClassificationData;
      this.spinner.hide();
    }, 500);
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
    if (!this.isEdit) {
      this.form.controls['codclao'].enable();
    }
    this.titleForm = this.isEdit ? 'Editar clasificación oficial' : 'Agregar clasificación oficial';
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
    let data: OfficialClassification = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.desclao.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      console.log('Update', data);
      this.officialClassification[this.findIndexById(this.form.getRawValue().codclao)] = this.form.getRawValue();
      this.officialClassification = [...this.officialClassification];
      this.spinner.hide();
      this.closeModal();
      return;
    }

    // Crear
    console.log('Create', data);
    this.officialClassification.push(data);
    this.officialClassification = [...this.officialClassification];
    this.spinner.hide();
    this.closeModal();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.officialClassification.length; i++) {
        if (this.officialClassification[i].codclao === id) {
            index = i;
            break;
        }
    }
    return index;
  } 

  /**
   * Carga la data en el formulario para editar
   * @param OfficialClassification row de la tabla
   * @returns void
   */
  editRow(officialClassification: OfficialClassification): void {
    this.isEdit = true;
    if (!officialClassification) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return;
    }
    this.form.controls['codclao'].disable();
    this.form.reset(officialClassification);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param officialClassification row de la tabla
   * @returns void
   */
  deleteRow(officialClassification: OfficialClassification): void {
    if (!officialClassification) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return; 
    }
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar la clasificación oficial <b>${officialClassification.desclao}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.officialClassification = this.officialClassification.filter(val => val.codclao !== officialClassification.codclao);
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
  get codclaoMsgError(): string {
    const errors = this.form.get('codclao')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máximo de 2 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }
  
  // Mensajes de errores dinamicos
  get desclaoMsgError(): string {
    const errors = this.form.get('desclao')?.errors;
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
      const duplicated = this.officialClassification.findIndex(val => val.codclao === control.value);
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
      if( !control.value && !this.form.getRawValue() && this.officialClassification) { return null; }
      const duplicatedEdit = this.officialClassification.findIndex(
        val => val.desclao.trim().toLowerCase() === this.form.getRawValue().desclao.trim().toLowerCase() 
                  && val.codclao !== this.form.getRawValue().codclao
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.officialClassification.findIndex(val => val.desclao.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }
  
}
