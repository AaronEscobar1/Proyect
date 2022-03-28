import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Procesos } from '../../interfaces/procesos.interfaces';
import { TypesFile } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { ProcesosService } from '../../services/procesos.service';
import { Helpers } from '../../../../../../../shared/helpers/helpers';
import { procesosData } from '../../interfaces/procesos';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class ProcesosComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  procesos: Procesos[] = [];
  typesFile  : TypesFile[] = [];

  // Banderas
  isEdit: boolean = false;

  // Cargar table
  loading : boolean = false;

  // Modales
  titleForm  : string = 'Agregar proceso';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private procesosService: ProcesosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      codpro:  ['', [ Validators.required, Validators.maxLength(2), this.validatedId.bind(this) ]],
      despro:  ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this)]],
      desadic: [''],
      definitivo: [ false ],
      codsec:  ['', [ Validators.required, Validators.maxLength(1) ]],
      dessec:  ['', [ Validators.required, Validators.maxLength(30) ]],
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

  loadData(): void {
    this.loading = true;
    setTimeout(() => {
      this.procesos = procesosData;
      this.loading = false;
    })
  }
  
  refresh(): void {
    this.procesos = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    if (!this.isEdit) {
      this.form.controls['codpro'].enable();
    }
    this.titleForm = this.isEdit ? 'Editar proceso' : 'Agregar proceso';
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
    console.log(this.form.value);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Mandar el formulario completo y quitar espacios en blancos
    let data: Procesos = this.form.getRawValue();
    data.despro.trim();

    if(this.isEdit) {
      // Editar
      console.log('Update', data);
      this.procesos[this.findIndexById(this.form.getRawValue().codpro)] = this.form.getRawValue();
      this.procesos = [...this.procesos];
      this.closeModal();
      return;
    }

    // Crear
    console.log('Create', data);
    this.procesos.push(data);
    this.closeModal();

  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.procesos.length; i++) {
        if (this.procesos[i].codpro === id) {
            index = i;
            break;
        }
    }
    return index;
  } 

  /**
   * Carga la data en el formulario para editar
   * @param procesos row de la tabla
   * @returns void
   */
   editRow(procesos: Procesos): void {
    this.isEdit = true;
    if (!procesos) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return;
    }
    this.form.controls['codpro'].disable();
    this.form.reset(procesos);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param procesos row de la tabla
   * @returns void
   */
  deleteRow(procesos: Procesos): void {
    if (!procesos) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return; 
    }
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el proceso <b>${procesos.despro}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.procesos = this.procesos.filter(proc => proc.codpro !== procesos.codpro);
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
  get codproMsgError(): string {
    const errors = this.form.get('codpro')?.errors;
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
  get desproMsgError(): string {
    const errors = this.form.get('despro')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get desadicMsgError(): string {
    const errors = this.form.get('desadic')?.errors;
    if ( errors?.required ) {
      return 'La descripción adicional es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción adicional es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción adicional ya existe.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get codsecMsgError(): string {
    const errors = this.form.get('codsec')?.errors;
    if ( errors?.required ) {
      return 'El código del subproceso es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código del subproceso es de longitud máxima de 1 dígito.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get dessecMsgError(): string {
    const errors = this.form.get('dessec')?.errors;
    if ( errors?.required ) {
      return 'La descripción del subproceso es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'La descripción del subproceso es de longitud máxima de 30 dígitos.';
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
      const duplicated = this.procesos.findIndex(proc => proc.codpro === control.value);
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
      if( !control.value && !this.form.getRawValue() && this.procesos) { return null; }
      const duplicatedEdit = this.procesos.findIndex(
        proc => proc.despro.trim().toLowerCase() === this.form.getRawValue().despro.trim().toLowerCase() 
                  && proc.codpro !== this.form.getRawValue().codpro
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.procesos.findIndex(proc => proc.despro.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
