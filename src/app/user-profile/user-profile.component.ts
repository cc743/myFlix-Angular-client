import { Component, Input, OnInit } from '@angular/core';
import { GetUserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  @Input() userData = {username: '', password: '', email: ''};

  users: any[] = [];

  constructor(public getUser: GetUserService) { }

  ngOnInit(): void {
    this.getUserUser();  //getUserUser() to distinguish from getUser (above)
  }

  getUserUser(): void {
    const user = localStorage.getItem('user');
    this.getUser.getUser(user).subscribe((resp: any) => {
      console.log(resp);
      // this.users = resp;
      // console.log(this.users);
      // return this.users;

      // const userProperties = Object.keys(resp);
      // console.log(userProperties);
      // const userValues = Object.values(resp);
      // console.log(userValues);
      this.users.push(resp);
    });
  }

}
