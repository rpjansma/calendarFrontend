import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Injectable } from '@angular/core';

import {
    ModalFormEventComponent
} from '../../../shared/modal-form-event/modal-form-event.component';

@Injectable({ providedIn: 'root' })
export class ModalFormEventService {
  constructor(private modalService: BsModalService) {}

	showEventForm(sendEvent: any) {
		const bsModalRef: BsModalRef = this.modalService.show(ModalFormEventComponent);
		bsModalRef.content.sendEvent = sendEvent;
	}

}
