import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { agentType, identificatioType, OtrosDatosEmpresa } from '../../../interfaces/otros-datos-empresa.interfaces';
import { OtroDatosAdicionalesService } from '../../../services/otro-datos-adicionales.service';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';

@Component({
  selector: 'app-modal-add-edit-od',
  templateUrl: './modal-add-edit-od.component.html',
  styleUrls: ['./modal-add-edit-od.component.scss']
})
export class ModalAddEditOdComponent implements OnInit {

  // Company para obtener el ID de la empresa a crear los datos adicionales
  @Input() companySelect!: Company;
  
  // Otros datos de empresa
  @Input() otrosDatosEmpresaSelect!: OtrosDatosEmpresa | undefined;

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit      : boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal = new EventEmitter();
  @Output() onLoadData   = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  identificatioType: dropdownType[] = identificatioType;
  agentType        : dropdownType[] = agentType;

  constructor(private otroDatosAdicionalesService: OtroDatosAdicionalesService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      idEmpresa : [   ],
      // Funcionario
      nomfun    : [   , [ Validators.maxLength(50) ]],
      nacfun    : ['0', [ Validators.maxLength(1)] ],
      tideIdefun: [   ],
      cedfun    : [   , [ Validators.maxLength(20) ]],
      // Contribuyente
      tipage    : [   , [ Validators.maxLength(1)] ],
      nrocon    : [   , [ Validators.maxLength(15) ]],
      datcon    : [   , [ Validators.maxLength(60) ]],
      // TODO: datos quemados para poder registrar y actualizar
      claapo    : [ '0' ],
      forpre    : [ '1' ],
      tipemp    : [ '0' ]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      const initForm = { nacfun: '0', claapo: '0', forpre: '1', tipemp: '0' };
      this.form.reset(initForm);
      return;
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.otrosDatosEmpresaSelect);
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
    let data: OtrosDatosEmpresa = this.form.getRawValue();

    this.spinner.show();
    
    if (this.isEdit) {
      // Editar
      this.otroDatosAdicionalesService.update(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar los otros datos adicionales.', life: 3000});
        }
      });
      return;
    }
    // Crear
    // Asignarle el id empresa al formulario
    data.idEmpresa = this.companySelect.id;

    this.otroDatosAdicionalesService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear los otros datos adicionales.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
    this.selectRowService.selectRowAlterno$.emit(null);
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

}
