import { CalendarEvent } from 'angular-calendar';

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-form-event',
  templateUrl: './modal-form-event.component.html',
  styleUrls: ['./modal-form-event.component.scss'],
})
export class FormModalComponent implements OnInit {
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

  constructor(
    public activeModal: NgbActiveModal,
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
