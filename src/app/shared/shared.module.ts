import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalErrorComponent } from './modal-error/modal-error.component';
import { VMessageComponent } from './vmessage/vmessage.component';

@NgModule({
  imports: [],
  declarations: [VMessageComponent, ModalErrorComponent],
  exports: [VMessageComponent, ModalErrorComponent]
})
export class SharedModule { }
