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
} from '@ionic/angular/standalone';
import {
  refreshSharp
} from 'ionicons/icons';
import { CloudService } from 'src/app/services/cloud.service';
import { Schedule } from 'src/app/services/schedule';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
  standalone: true,
  imports: [
    IonSkeletonText,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
    IonFabButton,
    IonFab,
    IonLabel,
    IonThumbnail,
    IonItem,
    IonList,
    IonListHeader,
    IonNote
  ],
})
export class SchedulePage implements OnInit {
  schedule: Schedule[] = [];

  constructor(private cloud: CloudService) {
        addIcons({
          refreshSharp
        });
  }

  ngOnInit(): void {
    this.getSchedule();
  }
  getSchedule(): void {
    this.schedule = [];
    this.cloud.getSchedule().subscribe((data) => {
      console.log(data);
      this.schedule = data;
    });
  }
}
