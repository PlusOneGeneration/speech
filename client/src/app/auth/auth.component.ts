import {Component} from '@angular/core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  title = 'Auth works!';
  // constructor(private authService: AuthService, private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.route.data
  //   .map((data: { auth: Auth }) => data.auth)
  //   .subscribe((auth: Auth) => console.log(auth));
  // }

}
