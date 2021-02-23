import { Component, Input, OnInit } from '@angular/core';
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
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserUser();  //getUserUser() to distinguish from getUser (above)
  }

  getUserUser(): void {
    const user = localStorage.getItem('user');
    this.getUser.getUser(user).subscribe((resp: any) => {
      //console.log(resp);
      this.users.push(resp);
      //console.log(this.users);
      this.movieIDs = resp.favoriteMovie;
      console.log(this.movieIDs);
    });
    // this.getMovies.getAllMovies().subscribe((resp: any) => {
    //   this.movies.push(resp);
    //   console.log(this.movies);
    //   this.movies.forEach((movie) => {
    //     console.log(movie._id);
    //   });
    // });
  }

  routeToFull(): void{
    this.router.navigate(['fullProfile']);
  }

}