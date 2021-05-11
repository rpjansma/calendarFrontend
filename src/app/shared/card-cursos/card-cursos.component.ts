import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-cursos',
  templateUrl: './card-cursos.component.html',
  styleUrls: ['./card-cursos.component.scss']
})
export class CardCursosComponent implements OnInit {

  @Input() event: any;


  constructor() { }

  ngOnInit(): void {
  }

}
