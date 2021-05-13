import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardCursosComponent } from './card-cursos/card-cursos.component';
import { BackgroudColorDirective } from './directives/backgroud-color.directive';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { VMessageComponent } from './vmessage/vmessage.component';
import { HighlightMouseDirective } from './directives/highlight-mouse.directive';

@NgModule({
  imports: [],
  declarations: [
    VMessageComponent,
    ModalErrorComponent,
    CardCursosComponent,
    BackgroudColorDirective,
    HighlightMouseDirective,
  ],
  exports: [VMessageComponent, ModalErrorComponent, CardCursosComponent],
})
export class SharedModule {}
