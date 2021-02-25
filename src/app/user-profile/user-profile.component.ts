import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GetUserService, GetAllMoviesService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  @Input() userData = {username: '', password: '', email: ''};

  users: any[] = [];
  movieIDs: any[] = [];
  movies: any[] = [];
  favMovies: any[] = [];

  constructor(
    public getUser: GetUserService,
    public getMovies: GetAllMoviesService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserUser();  //getUserUser() to distinguish from getUser (above)
  }

  getUserUser(): void {
    const user = localStorage.getItem('user');
    this.getUser.getUser(user).subscribe((resp: any) => {
      this.users.push(resp);
      this.movieIDs = resp.favoriteMovie;
      //console.log(this.movieIDs);
    });
  }

  routeToFull(): void{
    this.dialogRef.close();
    this.router.navigate(['fullProfile']);
  }

}
