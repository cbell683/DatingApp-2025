import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  constructor(private http: HttpClient) {}

  private accountService =  inject(AccountService);

init() {
  return this.http.get('https://localhost:5001/api/account/init');
}



}