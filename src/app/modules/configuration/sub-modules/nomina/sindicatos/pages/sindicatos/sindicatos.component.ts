import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Sindicatos } from '../../interfaces/sindicatos.interfaces';
import { TypesFile } from '../../../../../../../shared/interfaces/typesFiles.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { SindicatosService } from '../../services/sindicatos.service';

@Component({
  selector: 'app-sindicatos',
  templateUrl: './sindicatos.component.html',
  styleUrls: ['./sindicatos.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class SindicatosComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // Objetos
  sindicatos: Sindicatos[] = [];
  typesFile : TypesFile[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar sindicato';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private sindicatosService: SindicatosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      codsin:  ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      dessin:  ['', [ Validators.required, Validators.maxLength(60), this.validatedDes.bind(this) ]],
      // Registro
      registro:  [''],
      nroreg:    ['', [ Validators.pattern('[0-9]{1,4}') ]],
      ntomo:     ['', [ Validators.pattern('[0-9]{1,4}') ]],
      nfolio:    ['', [ Validators.pattern('[0-9]{1,4}') ]],
      // Inspectoria
      local:     ['0'],
      // Direccion
      dirsi1:     [''],
      paiCodpai:  [''],
      pais:       [''], // No se debe incluir porque con el codigo de la entidad se trae la entidad
      edoCodedo:  [''],
      entidadfed: [''], // No se debe incluir porque con el codigo de la entidad se trae la entidad
      cdadCodciu: ['', [ Validators.maxLength(30) ]],
      tlfsi1:     [''],
      tlfsi2:     [''],
      faxsin:     [''],
      tlxsin:     [''],
      eMail:      ['', [ Validators.maxLength(30), Validators.pattern(this.emailPattern) ]]
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
    this.sindicatosService.getAll()
      .subscribe({
        next: (resp) => {
          this.sindicatos = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.sindicatos = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar sindicato' : 'Agregar sindicato';
    this.createModal = true;
  }
  
  closeModal() {
    this.form.controls['codsin'].enable();
    this.isEdit = false;
    this.form.reset();
    this.form.controls['local'].setValue(0);
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
    let data: Sindicatos = this.form.getRawValue();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.sindicatosService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.loadData();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el sindicato.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.sindicatosService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.loadData();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el sindicato.', life: 3000});
        }
      });
  }

  /**
   * Carga la data en el formulario para editar
   * @param sindicatos row de la tabla
   * @returns void
   */
  editRow(sindicatos: Sindicatos): void {
    this.isEdit = true;
    this.form.controls['codsin'].disable();
    // Comprobar si el sindicato tiene fecha de inscripción para establecerlo en el formulario y poder editar
    sindicatos.registro = sindicatos.registro ? new Date(sindicatos.registro) : sindicatos.registro;
    this.form.reset(sindicatos);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param sindicato row de la tabla
   * @returns void
   */
  deleteRow(sindicato: Sindicatos): void {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el sindicato <b>${sindicato.dessin}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.sindicatosService.delete(sindicato.codsin)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el sindicato', life: 3000});
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
  campoInvalid(campo: string): boolean | null {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
              && this.form.invalid;
  }

  // Mensajes de errores dinamicos
  get codsinMsgError(): string {
    const errors = this.form.get('codsin')?.errors;
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
  get dessinMsgError(): string {
    const errors = this.form.get('dessin')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 60 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get eMailMsgError(): string {
    const errors = this.form.get('eMail')?.errors;
    if ( errors?.maxlength ) {
      return 'El email es de longitud máxima de 30 dígitos.';
    } else if ( errors?.pattern ) {
      return 'El email no tiene un formato valido.';
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
      const duplicated = this.sindicatos.findIndex(sin => sin.codsin === control.value);
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
  validatedDes(control: AbstractControl): ValidationErrors | null {
    if (this.isEdit) {
      if( !control.value && !this.form.getRawValue() && this.sindicatos) { return null; }
      const duplicatedEdit = this.sindicatos.findIndex(
        sin => sin.dessin.trim().toLowerCase() === this.form.getRawValue().dessin.trim().toLowerCase() 
                  && sin.codsin !== this.form.getRawValue().codsin
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.sindicatos.findIndex(sin => sin.dessin.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
