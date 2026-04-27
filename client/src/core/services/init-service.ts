import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { Observable, of, tap } from 'rxjs';
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
  return this.accountService.refreshToken().pipe(
    tap(user => {
      if (user) {
          this.accountService.currentUser.set(user);
          this.accountService.startTokenRefreshInterval();
      }
    })
  )


}



}