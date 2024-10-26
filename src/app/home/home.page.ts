import { Component } from '@angular/core';
import { AutheticationService } from '../authetication.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;
  constructor(
    private authService: AutheticationService,
    private router: Router
  ) {
    this.user = authService.getProfile();
  }

  async logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/landing']).catch((error) => {
        console.log(error);
      });
    });
  }
}
