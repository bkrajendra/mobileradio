import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonProgressBar,
  Platform,
} from '@ionic/angular/standalone';
import { alarm, heart, heartOutline, mail, pause, play } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Subscription } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { StreamState } from 'src/app/interfaces/stream-state';
import { CloudService } from 'src/app/services/cloud.service';
import { AlertController } from '@ionic/angular';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
}

@Component({
  selector: 'app-radio',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButtons,
    IonMenuButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    CommonModule,
    FormsModule,
    IonProgressBar,
  ],
})
export class RadioPage implements OnInit, OnDestroy {
  @ViewChild('particleCanvas') particleCanvas!: ElementRef<HTMLCanvasElement>;

  isLoading = false;
  particles: Particle[] = [];
  animationFrameId = 0;

  isPlaying = false;
  private sub: Subscription = new Subscription();
  public loader: boolean = false;

  radioURL: string = 'https://icecast.bkwsu.eu/radio-awaz-pune.mp3';
  //radioURL: string = "https://icecast.bkwsu.eu/pmtv_24k.mp3";

  state!: StreamState;
  listeners!: number;
  equilizerState: boolean = false;
  spiritualMessages = [
    'Tuning into the divine...',
    'Streaming sacred sounds...',
    'Opening the spiritual stream...',
    'Harmonizing with the divine...',
    'Awakening the sacred flow...',
    'Aligning with the divine...',
    'Beginning your sacred journey...',
    'Connecting to higher vibrations...',
    'Entering the divine frequency...',
    'Blessings are streaming...',
  ];
  loadingMessage: string = '';

  constructor(
    public audioService: AudioService,
    private cloud: CloudService,
    private alertController: AlertController,
    private cdref: ChangeDetectorRef,
    private musicControls: MusicControls,
    public platform: Platform
  ) {
    addIcons({ alarm, play, pause });

    this.audioService.getState().subscribe((state: any) => {
      console.log(state);
       this.state = state;
      this.equilizerState = state.playing;
      this.isPlaying = state.playing;
      // this.cdref.detectChanges();
      this.musicControls.updateIsPlaying(state.playing);
    });
  }

  ngOnInit() {
    this.getListeners();
    this.loader = false;

    console.log('init');

    this.showMusicControl();
    const waves = document.querySelectorAll('.wave');
    if (this.isPlaying) {
      waves.forEach((wave) => wave.classList.add('animate'));
    } else {
      waves.forEach((wave) => wave.classList.remove('animate'));
    }
  }
  ngAfterViewInit() {
    this.initParticles();
    this.animate();
  }
  getListeners() {
    this.cloud.getFixedJson().subscribe((listeners: any) => {
      this.listeners = listeners.icestats.source[6].listeners;
      console.log(listeners);
      console.log(listeners.icestats.source[6].listeners);
    });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
    cancelAnimationFrame(this.animationFrameId);
  }
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    const waves = document.querySelectorAll('.wave');

    if (this.isPlaying) {
      waves.forEach((wave) => wave.classList.add('animate'));
    } else {
      waves.forEach((wave) => wave.classList.remove('animate'));
    }
  }

  onSliderChangeEnd(change: any) {
    this.audioService.seekTo(change.value);
  }

  onVolumeChange(volume: any) {
    this.audioService.setVolume(volume.value);
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe((events: any) => {
      // listening for fun here
      //console.log(events);

      if (events.type === 'playing') {
        this.loader = false;
        this.isPlaying = true;
      }
      if (events.type === 'loadstart') {
        this.loader = true;
        this.isPlaying = true;
      }
      if (events.type === 'error') {
        this.loader = false;
        this.isPlaying = false;
        this.presentAlert();
      }
    });
  }

  openFile(url: string) {
    this.audioService.stop();
    this.playStream(url);
  }

  pause() {
    this.audioService.pause();
  }
  setupMediaControls() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Community Radio',
        artist: 'Divine Radio Live',
        album: 'Online Radio',
        artwork: [
          {
            src: 'assets/icon/favicon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        this.play(false);
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        this.stop();
      });
      navigator.mediaSession.setActionHandler('seekbackward', function () {});
      navigator.mediaSession.setActionHandler('seekforward', function () {});
      navigator.mediaSession.setActionHandler('previoustrack', function () {});
      navigator.mediaSession.setActionHandler('nexttrack', function () {});
    }
  }
  play(pState: any) {
    this.setRandomSpiritualMessage();
    this.isPlaying = !this.isPlaying;
    const waves = document.querySelectorAll('.wave');

    if (this.isPlaying) {
      waves.forEach((wave) => wave.classList.add('animate'));
    } else {
      waves.forEach((wave) => wave.classList.remove('animate'));
    }
    if (pState) {
      this.pause();
      this.loader = false;
      this.isPlaying = false;
    } else {
      this.loader = true;
      this.openFile(this.radioURL);
      this.audioService.play();
      this.isPlaying = true;
    }
  }

  stop() {
    this.audioService.stop();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'success',
      header: 'Error',
      subHeader: 'Stream Error!',
      message:
        'Unable to fetch the stream. Retry after some time or contact us on +91 8888058766.',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  setRandomSpiritualMessage() {
    const randomIndex = Math.floor(
      Math.random() * this.spiritualMessages.length
    );
    this.loadingMessage = this.spiritualMessages[randomIndex];
  }

  showMusicControl() {
    this.musicControls.create({
      track: 'Online Community Radio', // optional, default : ''
      artist: 'Khush Raho Khushiyan Banto!', // optional, default : ''
      cover: 'assets/icon/favicon.png', // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      // or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying: this.state.playing, // optional, default : true
      dismissable: false, // optional, default : false

      // hide previous/next/close buttons:
      hasPrev: false, // show previous button, optional, default: true
      hasNext: false, // show next button, optional, default: true
      hasClose: true, // show close button, optional, default: false

      // iOS only, optional
      album: 'Puneri Awaz', // optional, default: ''
      duration: 0, // optional, default: 0
      elapsed: 0, // optional, default: 0

      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated, optional
      ticker: 'Now playing "Puneri Awaz 107.8 FM"',
      // All icons default to their built-in android equivalents
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification',
    });

    try {
      this.musicControls.subscribe().subscribe((action) => {
        this.events(action);
      });
      this.musicControls.listen(); // activates the observable above
    } catch (error) {
      console.error('Error setting up media controls:', error);
    }
  }
  events(action: any) {
    const message = JSON.parse(action).message;
    switch (message) {
      case 'music-controls-next':
        // Do something
        break;
      case 'music-controls-previous':
        // Do something
        break;
      case 'music-controls-pause':
        this.pause();
        break;
      case 'music-controls-play':
        this.play(this.state.playing);
        break;
      case 'music-controls-destroy':
        // Do something
        break;

      // External controls (iOS only)
      case 'music-controls-toggle-play-pause':
        this.play(this.state.playing);
        break;
      case 'music-controls-seek-to':
        const seekToInSeconds = JSON.parse(action).position;
        this.musicControls.updateElapsed({
          elapsed: seekToInSeconds,
          isPlaying: true,
        });
        // Do something
        break;
      case 'music-controls-skip-forward':
        // Do something
        break;
      case 'music-controls-skip-backward':
        // Do something
        break;

      // Headset events (Android only)
      // All media button events are listed below
      case 'music-controls-media-button':
        this.play(this.state.playing);
        break;
      case 'music-controls-headset-unplugged':
        this.pause();
        break;
      case 'music-controls-headset-plugged':
        this.play(this.state.playing);
        break;
      default:
        break;
    }
  }

  private initParticles() {
    const canvas = this.particleCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(255, 215, 0, ${Math.random() * 0.5 + 0.2})`,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  private animate() {
    const canvas = this.particleCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    this.particles.forEach((particle) => {
      particle.y -= particle.speed;

      if (particle.y < 0) {
        particle.y = canvas.height;
        particle.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
