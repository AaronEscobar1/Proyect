import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Procesos } from '../../interfaces/procesos.interfaces';
import { TypesFile } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { ProcesosService } from '../../services/procesos.service';
import { Helpers } from '../../../../../../../shared/helpers/helpers';
import { NgxSpinnerService } from 'ngx-spinner';

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
              private spinner: NgxSpinnerService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      tippro: ['', [ Validators.required, Validators.pattern('[0-9]{1,2}'), this.validatedId.bind(this) ]],
      nompro: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this)]],
      nomadi: [''],
      nodefi: [ false ],
      // codsec:  ['', [ Validators.required, Validators.maxLength(1) ]],
      // dessec:  ['', [ Validators.required, Validators.maxLength(30) ]],
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
    this.spinner.show();
    this.procesosService.getAll()
      .subscribe({
        next: (res) => {
          this.procesos = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
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
      this.form.controls['tippro'].enable();
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: Procesos = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.nompro.trim();
    data.nodefi = data.nodefi ? "1" : "0";

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.procesosService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.loadData();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el proceso.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.procesosService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.loadData();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el proceso.', life: 3000});
        }
      });

  }

  /**
   * Carga la data en el formulario para editar
   * @param proceso row de la tabla
   * @returns void
   */
   editRow(proceso: Procesos): void {
    this.isEdit = true;
    this.form.controls['tippro'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(proceso);
    // Validamos si la propiedad nodefi es = 1, si es = 1 le asignamos true para marcar el check
    proceso.nodefi === "1" ? this.form.controls['nodefi'].reset(true) : this.form.controls['nodefi'].reset(false);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param procesos row de la tabla
   * @returns void
   */
  deleteRow(proceso: Procesos): void {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el proceso <b>${proceso.nompro}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.procesosService.delete(proceso.tippro)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el proceso', life: 3000});
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
  get tipproMsgError(): string {
    const errors = this.form.get('tippro')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.pattern ) {
      return 'El código es de longitud máximo de 2 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }
  
  // Mensajes de errores dinamicos
  get nomproMsgError(): string {
    const errors = this.form.get('nompro')?.errors;
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
  get nomadiMsgError(): string {
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

  /**
   * Validar id duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
      const duplicated = this.procesos.findIndex(proc => proc.tippro === control.value);
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
        proc => proc.nompro.trim().toLowerCase() === this.form.getRawValue().nompro.trim().toLowerCase() 
                  && proc.tippro !== this.form.getRawValue().tippro
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.procesos.findIndex(proc => proc.nompro.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
