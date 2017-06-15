import {Component} from '@angular/core';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
  title = 'SignIn works!';
  // constructor(private signInService: SignInService, private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.route.data
  //   .map((data: { signIn: SignIn }) => data.signIn)
  //   .subscribe((signIn: SignIn) => console.log(signIn));
  // }

}
