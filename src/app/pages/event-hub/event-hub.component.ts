import { Observable } from 'rxjs';
import { map, merge, switchMap, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { EventService } from '../../core/event-service/event.service';
import { UserService } from '../../core/user-service/user.service';

@Component({
  selector: 'app-event-hub',
  templateUrl: './event-hub.component.html',

  styleUrls: ['./event-hub.component.scss'],
})
export class EventHubComponent implements OnInit {
  searchInput = new FormControl();
  id = this.userService.getUserId();

  event$ = this.eventService.getUserEvents(this.id);
  filtro$ = this.searchInput.valueChanges.pipe(
    switchMap((qualquerNome) => this.eventService.getAllEvents())
  );

  //eventos$: Observable<any> = merge(this.event$, this.filtro$)

  constructor(
    private eventService: EventService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
}
