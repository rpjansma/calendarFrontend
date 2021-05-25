import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardCursosComponent } from './card-cursos/card-cursos.component';
import { BackgroudColorDirective } from './directives/backgroud-color.directive';
import { HighlightMouseDirective } from './directives/highlight-mouse.directive';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { ModalLoadingComponent } from './modal-loading/modal-loading.component';
import { VMessageComponent } from './vmessage/vmessage.component';

@NgModule({
  imports: [CommonModule],
  declarations: [

    VMessageComponent,
    ModalErrorComponent,
    CardCursosComponent,
    BackgroudColorDirective,
    HighlightMouseDirective,
    ModalLoadingComponent,
  ],
  exports: [VMessageComponent, ModalErrorComponent, CardCursosComponent, ModalLoadingComponent],
})
export class SharedModule {}
