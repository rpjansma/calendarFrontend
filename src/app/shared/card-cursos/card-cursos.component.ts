import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-cursos',
  templateUrl: './card-cursos.component.html',
  styleUrls: ['./card-cursos.component.scss'],
})
export class CardCursosComponent implements OnInit {
  @Input() event: any;
  @Input() color1;
  @Input() color2;

  constructor() {}

  ngOnInit(): void {
    console.log(this.color1);
  }
}
