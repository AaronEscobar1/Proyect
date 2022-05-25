import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { OfficialClassification } from '../../interfaces/clasificacion-oficial.interfaces';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClasificacionOficialService } from '../../services/clasificacion-oficial.service';

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
              private confirmationService: ConfirmationService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      codofi: ['', [ Validators.required, Validators.maxLength(2), this.validatedId.bind(this) ]],
      desofi: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this) ]],
      tiprep: ['', [ Validators.required, Validators.maxLength(2) ]]
    });
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
    if (!this.isEdit) {
      this.form.controls['codofi'].enable();
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Obtener formulario
    let data: OfficialClassification = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.desofi.trim();

    // this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.clasificacionOficialService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.loadData();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la clasificación. ' + err.error.detail, life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.clasificacionOficialService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.loadData();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la clasificación. ' + err.error.detail, life: 3000});
        }
      });
  }

  /**
   * Carga la data en el formulario para editar
   * @param OfficialClassification row de la tabla
   * @returns void
   */
  editRow(officialClassification: OfficialClassification): void {
    this.isEdit = true;
    this.form.controls['codofi'].disable();
    this.form.reset(officialClassification);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param officialClassification row de la tabla
   * @returns void
   */
  deleteRow(officialClassification: OfficialClassification): void {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar la clasificación oficial <b>${officialClassification.desofi}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
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
  get codofiMsgError(): string {
    const errors = this.form.get('codofi')?.errors;
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
  get desofiMsgError(): string {
    const errors = this.form.get('desofi')?.errors;
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
      const duplicated = this.officialClassification.findIndex(val => val.codofi === control.value);
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
    // Validaciones para crear
    if (!this.isEdit) {
      if( !control.value ) { return null; }
      const duplicated = this.officialClassification.findIndex(val => val.desofi.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
      
    } 
    // Validaciones para editar 
    if ( this.form.getRawValue().desofi == null ) { return null; }
      const duplicatedEdit = this.officialClassification.findIndex(
        val => val.desofi.trim().toLowerCase() === this.form.getRawValue().desofi.trim().toLowerCase() 
                  && val.codofi !== this.form.getRawValue().codofi
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
  }
  
}
