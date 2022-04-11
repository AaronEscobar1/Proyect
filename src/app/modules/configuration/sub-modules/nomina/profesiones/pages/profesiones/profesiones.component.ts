import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfesionesService } from '../../services/profesiones.service';
import { TypesFile } from '../../../../../../../shared/interfaces/typesFiles.interfaces';
import { Profession } from '../../interfaces/professions.interfaces';
import { Helpers } from '../../../../../../../shared/helpers/helpers';

@Component({
  selector: 'app-profesiones',
  templateUrl: './profesiones.component.html',
  styleUrls: ['./profesiones.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class ProfesionesComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  professions: Profession[] = [];
  typesFile  : TypesFile[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar profesiones';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private profesionesService: ProfesionesService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      codprf: ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      desprf: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this)]],
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
    this.profesionesService.getAll().subscribe(res => {
      this.professions = res.data;
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
    });
  }

  refresh(): void {
    this.professions = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    if (!this.isEdit) {
      this.form.controls['codprf'].enable();
    }
    this.titleForm = this.isEdit ? 'Editar profesiones' : 'Agregar profesiones';
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
    let data: Profession = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.desprf.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar 
      this.profesionesService.update(data)
        .subscribe( resp => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.loadData();
        }, (error) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar profesión.', life: 3000});
        });
      return;
    }

    // Crear
    this.profesionesService.create(data)
      .subscribe( resp => {
        this.closeModal();
        this.spinner.hide();
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
        this.loadData();
      }, (error) => {
        this.spinner.hide();
        this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear profesión.', life: 3000});
      });
  }

  /**
   * Carga la data en el formulario para editar
   * @param profesion row de la tabla
   * @returns void
   */
  editRow(profesion: Profession): void {
    this.isEdit = true;
    if (!profesion) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return;
    }
    this.form.controls['codprf'].disable();
    this.form.reset(profesion);
    this.openModalCreate();
  }
  
  /**
   * Elimina un registro
   * @param profesion row de la tabla
   * @returns void
   */
  deleteRow(profesion: Profession) {
    if (!profesion) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return; 
    }
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar la profesión <b>${profesion.desprf}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.profesionesService.delete(profesion.codprf)
          .subscribe( resp => {
            this.spinner.hide();
            this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.loadData();
          }, (error) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar profesión.', life: 3000});
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
  get codprfMsgError(): string {
    const errors = this.form.get('codprf')?.errors;
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
  get desprfMsgError(): string {
    const errors = this.form.get('desprf')?.errors;
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
      const duplicated = this.professions.findIndex(prof => prof.codprf === control.value);
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
      if( !control.value && !this.form.getRawValue() && this.professions) { return null; }
      const duplicatedEdit = this.professions.findIndex(
        prof => prof.desprf.trim().toLowerCase() === this.form.getRawValue().desprf.trim().toLowerCase() 
                  && prof.codprf !== this.form.getRawValue().codprf
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.professions.findIndex(prof => prof.desprf.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
