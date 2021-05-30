import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardCursosComponent } from './card-cursos/card-cursos.component';
import { BackgroudColorDirective } from './directives/backgroud-color.directive';
import { HighlightMouseDirective } from './directives/highlight-mouse.directive';
import {
    ErrorValidationMessageComponent
} from './error-validation-message/error-validation-message.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { ModalLoadingComponent } from './modal-loading/modal-loading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ErrorValidationMessageComponent,
    ModalErrorComponent,
    CardCursosComponent,
    BackgroudColorDirective,
    HighlightMouseDirective,
    ModalLoadingComponent,
  ],
  exports: [
    ErrorValidationMessageComponent,
    ModalErrorComponent,
    CardCursosComponent,
    ModalLoadingComponent,
  ],
  entryComponents: [ModalErrorComponent, ModalLoadingComponent],
})
export class SharedModule {}
