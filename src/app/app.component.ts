import { Location } from '@angular/common';
import { Component } from '@angular/core';
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
} from 'ionicons/icons';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
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
    RouterLink, RouterLinkActive
  ],
})
export class AppComponent {
  appv: string = '';
  public appPages = [
    { title: 'Listen Now', url: '/radio', icon: 'radio' },
    { title: 'About', url: '/about', icon: 'information' },
    { title: 'Schedule', url: '/schedule', icon: 'calendar' },
    { title: 'Join', url: '/join', icon: 'person-add' },
    { title: 'Feedback', url: '/feedback', icon: 'star-half' },
    { title: 'Contact', url: '/contact', icon: 'mail' },
    { title: 'Privacy Policy', url: '/privacy', icon: 'shield-half' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    // private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private sshare: SocialSharing,
    private _location: Location,
    // private alertController: AlertController,
    private appVersion: AppVersion
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
    // console.log(this.screenOrientation.lock);
    // if (this.screenOrientation.lock) {

    // }
    this.platform.ready().then(() => {
      this.appVersion
        .getVersionNumber()
        .then((v) => {
          console.log(v);
          this.appv = v;
        })
        .catch((e) => {
          console.log(e);
        });

      // this.screenOrientation
      //   .lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      //   .then((d) => {
      //     console.log(d);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    });

    // this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    //   console.log('Back press handler!');
    //   if (this._location.isCurrentPathEqualTo('/radio')) {

    //     // Show Exit Alert!
    //     console.log('Show Exit Alert!');
    //     this.showExitConfirm();
    //     processNextHandler();
    //   } else {

    //     // Navigate to back page
    //     console.log('Navigate to back page');
    //     this._location.back();
    //   }
    // });
    // this.platform.backButton.subscribeWithPriority(5, () => {
    //   console.log('Handler called to force close!');
    //   this.alertController.getTop().then(r => {
    //     if (r) {
    //       navigator['app'].exitApp();
    //     }
    //   }).catch(e => {
    //     console.log(e);
    //   })
    // });
  }
  shareIt() {
    console.log('Share it');
  }
}
