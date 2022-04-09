import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CardCursosComponent } from './card-cursos/card-cursos.component';
import { BackgroudColorDirective } from './directives/backgroud-color.directive';
import { HighlightMouseDirective } from './directives/highlight-mouse.directive';
import {
    ErrorValidationMessageComponent
} from './error-validation-message/error-validation-message.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { ModalFormEventComponent } from './modal-form-event/modal-form-event.component';
import { ModalLoadingComponent } from './modal-loading/modal-loading.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule.forRoot()],
  declarations: [
    ErrorValidationMessageComponent,
    ModalErrorComponent,
    CardCursosComponent,
    BackgroudColorDirective,
    HighlightMouseDirective,
    ModalLoadingComponent,
    ModalFormEventComponent,
  ],
  exports: [
    ErrorValidationMessageComponent,
    ModalErrorComponent,
    CardCursosComponent,
    ModalLoadingComponent,
    ModalFormEventComponent,
  ],
  entryComponents: [
    ModalErrorComponent,
    ModalLoadingComponent,
    ModalFormEventComponent,
  ],
})
export class SharedModule {}
