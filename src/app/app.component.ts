import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonAvatar,
  IonButton,
  Platform,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  information,
  radio,
  calendar,
  addCircle,
  shareSocial,
  mail,
  shieldHalf,
  personAdd,
  logoFacebook,
  logoYoutube,
  logoInstagram,
  logoTwitter,
  logoX,
  radioOutline,
  calendarClearOutline,
  calendarSharp,
  radioSharp,
  personAddOutline,
  personAddSharp,
  shareSocialOutline,
  shareSocialSharp,
  mailOutline,
  mailSharp,
  shieldHalfOutline,
  shieldHalfSharp,
  informationCircle,
  informationOutline,
  informationSharp,
  starHalfOutline,
  starHalfSharp,
  calendarOutline,
} from 'ionicons/icons';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Share } from '@capacitor/share';

import { StationConfigLoader } from 'src/config/station-loader';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonButton,
    IonAvatar,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
})
export class AppComponent implements OnInit {
  appv: string = '...';
  public appPages = [
    { title: 'Listen Now', url: '/radio', icon: 'radio' },
    { title: 'About', url: '/about', icon: 'information' },
    // { title: 'Schedule', url: '/schedule', icon: 'calendar' },
    // { title: 'Join', url: '/join', icon: 'person-add' },
    // { title: 'Feedback', url: '/feedback', icon: 'star-half' },
    { title: 'Contact', url: '/contact', icon: 'mail' },
    { title: 'Privacy Policy', url: '/privacy', icon: 'shield-half' },
  ];
  appConfig: any = {};
  constructor(
    private platform: Platform,
    private _location: Location,
    private alertController: AlertController,
    private appVersion: AppVersion,
    private sc: StationConfigLoader
  ) {
    addIcons({
      information,
      informationOutline,
      informationSharp,
      radio,
      radioOutline,
      radioSharp,
      calendar,
      calendarClearOutline,
      calendarSharp,
      calendarOutline,
      personAdd,
      personAddOutline,
      personAddSharp,
      starHalfOutline,
      starHalfSharp,
      shareSocialSharp,
      mail,
      mailOutline,
      mailSharp,
      shieldHalf,
      shieldHalfOutline,
      shieldHalfSharp,
      logoFacebook,
      logoYoutube,
      logoInstagram,
      logoTwitter,
      logoX,
    });
    console.log(ScreenOrientation.lock);

    this.platform.ready().then(() => {
      console.log('Platform is ready');
      this.getOrientation();
      StatusBar.setOverlaysWebView({ overlay: false }); // display header below status bar

      App.getInfo().then((info: any) => {
        console.log('App Info:', info);
      }
      ).catch((e: any) => {
        console.log('Error getting app info:', e);
      });

      
      this.appVersion
        .getVersionNumber()
        .then((v: any) => {
          console.log(v);
          this.appv = v;
        })
        .catch((e: any) => {
          console.log(e);
        });

      ScreenOrientation.lock({ orientation: 'portrait' })
        .then((d: any) => {
          console.log(d);
        })
        .catch((e: any) => {
          console.log(e);
        });
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/radio')) {
        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {
        // Navigate to back page
        console.log('Navigate to back page');
        this._location.back();
      }
    });
    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController
        .getTop()
        .then((r) => {
          if (r) {
            this.exitApp();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }
  ngOnInit(): void {
    this.loadConfig();
  }
  async loadConfig() {
    let config = await this.sc.getConfig();
    this.appConfig = config;
    console.log(config);
  }
  async shareIt() {
    console.log('Share it');

    await Share.share({
      title:
        'Download Radio App at: Android: ' +
        this.appConfig.app.storeLinks.android +
        ', IOS: ' +
        this.appConfig.app.storeLinks.ios +
        ' Share it! ',
      text: 'Community Radio',
      url: 'http://bkwsu.com/',
      dialogTitle: 'Share with others',
    });
  }
  async getOrientation() {
    const current = await ScreenOrientation.orientation();
    console.log('Current orientation:', current);
  }
  showExitConfirm() {
    this.alertController
      .create({
        header: 'Close App?',
        message: 'Do you want to close the app?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Stay',
            role: 'cancel',
            handler: () => {
              console.log('Application exit prevented!');
            },
          },
          {
            text: 'Exit',
            handler: () => {
              this.exitApp();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
  exitApp() {
    App.exitApp();
  }
}
