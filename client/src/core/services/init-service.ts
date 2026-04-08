import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LikesService } from './likes-service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
 //constructor(private http: HttpClient) {}
  private accountService =  inject(AccountService);
  private likesService =  inject(LikesService);

init() { 
  const userString = localStorage.getItem('user');
  if (!userString) return of(null);
  const user = JSON.parse(userString);
  this.accountService.currentUser.set(user);
  this.likesService.getLikeIds();


  return of(null);
}



}