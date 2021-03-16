import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const API_URL = 'http://localhost:4000';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
  constructor(http: HttpClient) { }

  checkUsernameTaken() {
    this.http.get();
  }

}
