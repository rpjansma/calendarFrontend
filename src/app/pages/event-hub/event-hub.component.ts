import { Observable } from 'rxjs';
import { map, merge, switchMap, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { EventService } from '../../core/event-service/event.service';


@Component({
  selector: 'app-event-hub',
  templateUrl: './event-hub.component.html',

  styleUrls: ['./event-hub.component.scss'],
})
export class EventHubComponent implements OnInit {
  searchInput = new FormControl();

  eventos$ = this.eventService.getAllEvents();
  filtro$ = this.searchInput.valueChanges.pipe(
    switchMap((qualquerNome) => this.eventService.getAllEvents())
  );

  //event$: Observable<any> = merge(this.eventos$, this.filtro$)


  constructor(private eventService: EventService) {}

  ngOnInit(): void {

  }
