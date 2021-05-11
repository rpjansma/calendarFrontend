import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardCursosComponent } from './card-cursos/card-cursos.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { VMessageComponent } from './vmessage/vmessage.component';

@NgModule({
  imports: [],
  declarations: [VMessageComponent, ModalErrorComponent, CardCursosComponent],
  exports: [VMessageComponent, ModalErrorComponent, CardCursosComponent]
})
export class SharedModule { }
