import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
// import { UserService } from "./user.service";
// import { User } from "./User";
// import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  title = 'User works!';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.userService.me()
    //       .subscribe((user) => {
    //         console.log('USER =>>', user);
    //       });

  }

}
