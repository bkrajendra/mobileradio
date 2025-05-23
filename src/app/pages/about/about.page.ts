import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSkeletonText,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  LoadingController,
} from '@ionic/angular/standalone';
import { CloudService } from 'src/app/services/cloud.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonMenuButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSkeletonText,
    IonItem,
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardHeader,
  ],
})
export class AboutPage implements OnInit {
  
  settingsData: any = {};

  constructor(
    private cloud: CloudService,
    private loader: LoadingController,
    public sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getSettings();
    //this.presentLoading();
  }
  getSettings(): void {
    this.cloud.getSettings().subscribe((data) => {
      this.settingsData = data;
      console.log(this.settingsData);
    });
  }

  async presentLoading() {
    const loading = await this.loader.create({
      message: 'Please wait...',
      duration: 1000,
      spinner: 'circular',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
