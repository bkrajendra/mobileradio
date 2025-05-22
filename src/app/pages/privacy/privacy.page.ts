import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSkeletonText,
  IonIcon,
  IonFabButton,
  IonFab,
  IonFabList,
  IonLabel,
  IonThumbnail,
  IonItem,
  IonList,
  IonListHeader,
  IonNote,
  LoadingController,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/angular/standalone';
import { CloudService } from 'src/app/services/cloud.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonCardTitle,
  ],
})
export class PrivacyPage implements OnInit {

  settingsData: any = {};

  constructor(
    private cloud: CloudService,
    private loader: LoadingController,
    public sanitizer: DomSanitizer
    
  ) { }

  ngOnInit(): void {
    this.getSettings();
    //this.presentLoading();
  }
  getSettings(): void {
    this.cloud.getSettings().subscribe((data: any) => {
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
