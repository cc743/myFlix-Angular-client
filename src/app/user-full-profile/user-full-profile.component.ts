import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GetUserService, EditUserService, GetAllMoviesService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-full-profile',
  templateUrl: './user-full-profile.component.html',
  styleUrls: ['./user-full-profile.component.scss']
})
export class UserFullProfileComponent implements OnInit {
  @Input() userData = {username: '', password: '', email: ''}; 

  users: any[] = [];
  movieIDs: any[] = [];
  movies: any[] = [];
  favMovies: any[] = [];

  constructor(
    public getUser: GetUserService,
    public editUser: EditUserService,
    public getAllMovies: GetAllMoviesService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserUser();  //getUserUser() to distinguish from getUser (above)
    this.getFavoriteMovies();
  }

  getUserUser(): void {
    const user = localStorage.getItem('user');
    this.getUser.getUser(user).subscribe((resp: any) => {
      //console.log(resp);
      this.users.push(resp);
    });
  }

  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.getUser.getUser(user).subscribe((resp: any) => {
        this.movieIDs = resp.favoriteMovie;
        //console.log(resp);
        //console.log(this.movieIDs);
        return this.movieIDs;
      });
    }
    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  getMovies(): void {
    this.getAllMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.movies.forEach((movie) => {
        if(this.movieIDs.includes(movie._id))
          this.favMovies.push(movie);
      });
      console.log(this.favMovies);
      return this.favMovies;
    });
  }
  
  editUserData(): void {
    this.editUser.editUser(this.userData).subscribe((resp: any) => {
      //console.log(resp);
      this.snackBar.open("your profile was successfully updated.", "OK", {
        duration: 2000,
        verticalPosition: "top"
      });
    },
    (resp) => {
      //console.log(resp);
      this.snackBar.open(resp, "OK", {
        duration: 5000,
      });
    });
  }


}
