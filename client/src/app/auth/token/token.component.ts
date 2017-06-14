import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserTokenService} from "../../user/services/user-token.service";

@Component({
  selector: 'token',
  templateUrl: './token.component.html'
})
export class TokenComponent implements OnInit {

  constructor(private userTokenService: UserTokenService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params) => {
        this.userTokenService.setToken(params['token']);
        this.router.navigate(['/app']);
      });
  }

}
