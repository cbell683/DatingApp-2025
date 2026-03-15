import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import{ ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
  imports: [FormsModule, RouterLink]
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject (ToastService);
  protected creds: any = {};
// do i need this line below??
  protected loggedIn = signal(false);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully');
        this.creds = {};
      },
      error: error => {
        this.toast.error(error.error);
      }
        
    })
  }

  logout() {
     this.accountService.logout();
     this.router.navigateByUrl('/');
  }

}
