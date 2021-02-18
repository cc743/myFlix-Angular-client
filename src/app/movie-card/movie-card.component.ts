import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(public getAllMovies: GetAllMoviesService) { }

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

}
