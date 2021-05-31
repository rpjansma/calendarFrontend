import { CalendarEvent } from 'angular-calendar';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'modal-form-event',
  templateUrl: './modal-form-event.component.html',
  styleUrls: ['./modal-form-event.component.scss'],
})
export class ModalFormEventComponent implements OnInit {
  eventForm: FormGroup;
  modalContentData: {
    action: string;
    event: CalendarEvent;
  };

  @Input() sendEvent;

  isRequiredAndTouched(control: string) {
    return (
      !this.eventForm.get(control).valid && this.eventForm.get(control).touched
    );
  }

  onClose() {
    this.activeModal.hide();
  }

  constructor(
    public activeModal: BsModalRef,
    private formBuilder: FormBuilder
  ) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
}
