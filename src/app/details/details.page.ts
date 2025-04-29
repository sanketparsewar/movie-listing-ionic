import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonBackButton, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonText, IonLabel, IonCardContent, IonItem, IonList } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { cashOutline, calendarOutline, timeOutline, starOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonCardContent, IonLabel, IonIcon, IonText, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {
  private movieService = inject(MovieService)
  public imageBaseUrl = 'https://image.tmdb.org/t/p'
  public movie: WritableSignal<MovieResult | null> = signal(null)


  // write in main.ts withComponentInputBinding() using this we donot need to use activated route 
  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      this.movie.set(movie)
      console.log(movie)
    })
  }

  constructor() {
    addIcons({ calendarOutline, cashOutline, timeOutline, starOutline });
  }

  ngOnInit() {
  }

  getMovieDetails(id: string) {
    this.movieService.getMovieDetails(id).subscribe({
      next: (res) => {
      }
    })
  }

}
