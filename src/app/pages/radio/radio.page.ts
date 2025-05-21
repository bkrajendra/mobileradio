import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent,IonButton,IonButtons, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonIcon} from '@ionic/angular/standalone';
import { alarm, heart, heartOutline, mail, pause, play } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Subscription } from 'rxjs';
import { RadioService } from 'src/app/services/radio.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
  standalone: true,
  imports:  [IonContent,IonButton, IonButtons,IonMenuButton, IonHeader, IonTitle, IonToolbar, IonIcon, CommonModule, FormsModule]
})
export class RadioPage implements OnInit, OnDestroy {
  isPlaying = false;
  private sub: Subscription = new Subscription();

  constructor(
    private radioService: RadioService
  ) { 
    addIcons({ alarm, play, pause });
  }

  ngOnInit() {
    this.sub = this.radioService.isPlaying$.subscribe(status => {
      this.isPlaying = status;
    });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  togglePlay() {
    this.radioService.togglePlay();

    this.isPlaying = !this.isPlaying;
    const waves = document.querySelectorAll('.wave');
    
    if (this.isPlaying) {
      waves.forEach(wave => wave.classList.add('animate'));
    } else {
      waves.forEach(wave => wave.classList.remove('animate'));
    }
  }
}
