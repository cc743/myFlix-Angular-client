import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public getAllMovies: GetAllMoviesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.getAllMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  //this is the function that will open the dialog when the 'go to profile information' button is clicked
  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '480px'
    });
  }

  //this is the function that will open the dialog when the "genre" button is clicked
  openGenreDialog(Name: string, Description: string): void{
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '580px',
      height: '480px'
    });
  }

  //this is the function that will open the dialog when the "director" button is clicked
  openDirectorDialog(Name: string, Bio: string, Birth: string, Death: string): void{
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, Birth, Death },
      width: '580px',
      height: '480px'
    });
  }

  //this is the function that will open the dialog when the "synopsis" button is clicked
  openSynopsisDialog(Description: string): void{
    this.dialog.open(MovieSynopsisComponent, {
      data: {Description},
      width: '580px',
      height: '480px'
    });
  } 

}
