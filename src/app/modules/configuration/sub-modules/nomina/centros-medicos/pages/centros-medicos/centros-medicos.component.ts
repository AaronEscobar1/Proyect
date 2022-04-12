import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CentroMedico } from '../../interfaces/centro-medico.interfaces';
import { TypesFile } from '../../../../../../../shared/interfaces/typesFiles.interfaces';
import { CentrosMedicosService } from '../../services/centros-medicos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Helpers } from '../../../../../../../shared/helpers/helpers';
import { centroMedicoData } from '../../interfaces/centro-medico';

@Component({
  selector: 'app-centros-medicos',
  templateUrl: './centros-medicos.component.html',
  styleUrls: ['./centros-medicos.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class CentrosMedicosComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  centrosMedicos: CentroMedico[] = [];
  typesFile     : TypesFile[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar centro médico';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private centrosMedicosService: CentrosMedicosService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      codcmd: ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      descmd: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this) ]],
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
      this.centrosMedicos = centroMedicoData;
      console.log('this.centrosMedicos > ', this.centrosMedicos);
      this.spinner.hide();
    }, 500);
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
    if (!this.isEdit) {
      this.form.controls['codcmd'].enable();
    }
    this.titleForm = this.isEdit ? 'Editar centro médico' : 'Agregar centro médico';
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
    let data: CentroMedico = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.descmd.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      console.log('Update', data);
      this.centrosMedicos[this.findIndexById(this.form.getRawValue().codcmd)] = this.form.getRawValue();
      this.centrosMedicos = [...this.centrosMedicos];
      this.spinner.hide();
      this.closeModal();
      return;
    }

    // Crear
    console.log('Create', data);
    this.centrosMedicos.push(data);
    this.centrosMedicos = [...this.centrosMedicos];
    this.spinner.hide();
    this.closeModal();

  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.centrosMedicos.length; i++) {
        if (this.centrosMedicos[i].codcmd === id) {
            index = i;
            break;
        }
    }
    return index;
  } 

  /**
   * Carga la data en el formulario para editar
   * @param centroMedico row de la tabla
   * @returns void
   */
  editRow(centroMedico: CentroMedico): void {
    this.isEdit = true;
    if (!centroMedico) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return;
    }
    this.form.controls['codcmd'].disable();
    this.form.reset(centroMedico);
    this.openModalCreate();
  }
  
  /**
   * Elimina un registro
   * @param centroMedico row de la tabla
   * @returns void
   */
  deleteRow(centroMedico: CentroMedico): void {
    if (!centroMedico) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return; 
    }
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el centro médico <b>${centroMedico.descmd}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.centrosMedicos = this.centrosMedicos.filter(cmd => cmd.codcmd !== centroMedico.codcmd);
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
  get codcmdMsgError(): string {
    const errors = this.form.get('codcmd')?.errors;
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
  get descmdMsgError(): string {
    const errors = this.form.get('descmd')?.errors;
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
      const duplicated = this.centrosMedicos.findIndex(cmd => cmd.codcmd === control.value);
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
      if( !control.value && !this.form.getRawValue() && this.centrosMedicos) { return null; }
      const duplicatedEdit = this.centrosMedicos.findIndex(
        cmd => cmd.descmd.trim().toLowerCase() === this.form.getRawValue().descmd.trim().toLowerCase() 
                  && cmd.codcmd !== this.form.getRawValue().codcmd
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.centrosMedicos.findIndex(cmd => cmd.descmd.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
