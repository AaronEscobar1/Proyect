import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CentrosMedicos } from '../../interfaces/centro-medico.interfaces';
import { TypesFile } from '../../../../../../../shared/interfaces/typesFiles.interfaces';
import { CentrosMedicosService } from '../../services/centros-medicos.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  centrosMedicos: CentrosMedicos[] = [];
  typesFile     : TypesFile[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar centro médico';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private centrosMedicosService: CentrosMedicosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      codmed: ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      desmed: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this) ]],
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
    if (!this.isEdit) {
      this.form.controls['codmed'].enable();
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Obtener formulario
    let data: CentrosMedicos = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.desmed.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.centrosMedicosService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.loadData();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el centro médico.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.centrosMedicosService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.loadData();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el centro médico.', life: 3000});
        }
      });
  }

  /**
   * Carga la data en el formulario para editar
   * @param centroMedico row de la tabla
   * @returns void
   */
  editRow(centroMedico: CentrosMedicos): void {
    this.isEdit = true;
    this.form.controls['codmed'].disable();
    this.form.reset(centroMedico);
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
  get codmedMsgError(): string {
    const errors = this.form.get('codmed')?.errors;
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
  get desmedMsgError(): string {
    const errors = this.form.get('desmed')?.errors;
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
      const duplicated = this.centrosMedicos.findIndex(med => med.codmed === control.value);
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
        med => med.desmed.trim().toLowerCase() === this.form.getRawValue().desmed.trim().toLowerCase() 
                  && med.codmed !== this.form.getRawValue().codmed
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.centrosMedicos.findIndex(med => med.desmed.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
