import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'sign-out',
  templateUrl: './sign-out.component.html'
})
export class SignOutComponent {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  signOut() {
    this.authService.signOut()
      .subscribe(() => this.router.navigate(['auth', 'sign-in']));
  }
}
