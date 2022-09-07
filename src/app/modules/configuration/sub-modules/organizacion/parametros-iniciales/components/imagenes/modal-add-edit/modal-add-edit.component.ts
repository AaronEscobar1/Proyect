import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Imagen, TipoImagenData, ImageConvert } from '../../../interfaces/imagenes.interfaces';
import { Company } from '../../../../../nomina/empresa/shared-empresa/interfaces/empresa.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ImagenesService } from '../../../services/imagenes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Observable, Subscriber } from 'rxjs';
import { dropdownType, EventImage } from 'src/app/shared/interfaces/typesFiles.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss']
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados 
  @Input() imagenes: Imagen[] = [];

  // Variable de seleccion para editar
  @Input() imagenSelect!: Imagen | undefined;

  // Objeto para mostrar la lista de tipos de imagenes
  tipoImagen: dropdownType[] = [];

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

  // Datos de imagen en memoria para crear
  file: ImageConvert = { fileContentBase64: '', fileName: '', fileSize: '', fileType: '' };

  constructor(private imagenesService: ImagenesService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      empresaId:         [  ],
      tipo:              [  , [ Validators.required, this.validateDuplicate.bind(this) ]],
      nombre:            [  , [ Validators.required ]],
      fileName:          [  ],
      fileContentBase64: [  ],
      fileSize:          [  ],
      fileType:          [  ]
    });
  }

  ngOnInit(): void {
    // Llenar objeto de datos para el tipo de imagenes
    this.tipoImagen = TipoImagenData;
  }
  
  /**
   * Inicializar objeto file con sus valores vacios
   */
  fileInit(): void {
    this.file = { fileContentBase64: '', fileName: '', fileSize: '', fileType: '' };
  }

  ngOnChanges(): void {
    this.fileInit();
    this.form.reset();
  }

  /**
   * Imagen seleccionada para convertirla a base64
   * @param event: EventImage
   */
  onChange(event: EventImage): void {
    // Si existe un error de formato o tamaño de archivo, validar que el objeto currentFiles venga sin datos para retornar la función
    if (event.currentFiles.length <= 0 ) {
      this.fileInit();
      return;
    }
    const fileUpload: File = event.currentFiles[0];
    this.convertToBase64(fileUpload);
  }
  
  /**
   * Convertir imagen (Blob) a base64
   * @param file: File
   */
  convertToBase64(file: File): void {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    // Mediante la subscripción del observable, llenar los datos del objeto file con la transformación de la imagen a base64
    observable.subscribe((data) => {
      this.file = {
        fileName:          file.name.split('.')[0], // Obtener nombre mediante el evento
        fileContentBase64: data.split(',').pop(),   // Obtener el archivo con formato base64
        fileSize:          file.size.toString(),    // Obtener tamaño mediante el evento
        fileType:          file.type.split('/')[1]  // Obtener typo mediante el evento
      }
    });
  }

  /**
   * Convertir imagen (Blob) a Base64
   * @param file: File
   * @param subscriber: Subscriber<any>
   */
  readFile(file: File, subscriber: Subscriber<any>): void {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    if ( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }
    // Validar que se haya cargado una imagen
    if (this.file.fileContentBase64 == '') {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se ha encontrado una imagen, por favor seleccione una.', life: 3000});
      return;
    }

    // Obtener formulario
    let data: Imagen = this.form.getRawValue();
    // Asignar el idEmpresa y los datos necesarios para crear
    data.empresaId         = this.empresaRow.id;
    data.fileName          = this.file.fileName;
    data.fileContentBase64 = this.file.fileContentBase64;
    data.fileSize          = this.file.fileSize;
    data.fileType          = this.file.fileType;
    
    this.spinner.show();

    // Crear
    this.imagenesService.create(this.empresaRow.id, data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.imagenesService.selectRowTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la imagen.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }
  
  // Mensajes de errores tipo
  get tipoMsgError(): string {
    const errors = this.form.get('tipo')?.errors;
    if ( errors?.required ) {
      return 'El tipo es obligatorio.';
    } else if ( errors?.duplicated ) {
      return 'El tipo ya existe.';
    }
    return '';
  }

  // Validar si esta duplicado el tipo de imagen
  validateDuplicate(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.imagenes.findIndex(val => val.tipo === control.value) > -1 ?
                                    {'duplicated': true} :
                                    null;
  }

}
