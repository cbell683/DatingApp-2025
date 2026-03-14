import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
  imports: [FormsModule]
})
export class Nav {
  protected accountService = inject(AccountService)
  protected creds: any = {}
  protected loggedIn = signal(false)

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log(result);
  
        this.creds = {};
      },
      error: error => alert(error.message)
        
    })
  }

  logout() {
     this.accountService.logout();
  }

}
