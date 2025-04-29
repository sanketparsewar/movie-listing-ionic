import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonList, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent, IonText } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-defer',
  templateUrl: './home-defer.page.html',
  styleUrls: ['./home-defer.page.scss'],
  standalone: true,
  imports: [IonText, IonInfiniteScrollContent, IonInfiniteScroll, IonBadge, IonLabel, IonAlert, IonSkeletonText, IonAvatar, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonList, DatePipe, RouterLink],
})
export class HomeDeferPage implements OnInit {

  public movieService = inject(MovieService)
  private currentPage = 1;
  public error = null
  public isLoading = false
  public movies: MovieResult[] = []
  public dummyArray = new Array(5)
  public imageBaseUrl = 'https://image.tmdb.org/t/p'
  constructor() { }

  ngOnInit() {
    this.loadMovies()
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null
    if (!event) {
      this.isLoading = true
    }
    this.movieService.getTopRatedMovies(this.currentPage).pipe(
      // this executes a cleanup function whether its sccessful or failed this will execute
      finalize(() => {
        this.isLoading = false;
        if (event) {
          event.target.complete()
        }
      }),
      // catch error if any 
      catchError((error) => {
        console.log(error)
        this.error = error.error.status_message;
        return [];
      })
    ).subscribe({
      next: (res) => {
        this.movies.push(...res.results)
        // Specifically, it disables the target element if the current page (this.currentPage) is equal to the total number of pages (res.total_pages). This is commonly used in pagination scenarios to disable a "Next" button when the user has reached the last page, preventing further navigation.
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }

      }
    })
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++
    this.loadMovies(event)
    // Add your implementation here
  }
}
