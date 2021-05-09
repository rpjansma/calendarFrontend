import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {
  @Input() text = '';

  constructor() { }

  ngOnInit(): void {
  }

}
