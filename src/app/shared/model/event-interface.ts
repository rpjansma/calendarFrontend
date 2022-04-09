export class Event {
  user: any;
  _id: string;
  title: string;
  start: Date;
  end?: Date;
  draggable: boolean
  actions: any
  resizable: {
    beforeStart: true,
    afterEnd: true
  }
  constructor() {

  }
}
export interface Events extends Array<Event> {}

export interface EventsAPI {
  payload: Event;
}
