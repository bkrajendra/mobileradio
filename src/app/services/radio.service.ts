import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Capacitor } from '@capacitor/core';

import { AudioPlayer } from '@mediagrid/capacitor-native-audio';


@Injectable({
  providedIn: 'root',
})
export class RadioService {
  private readonly streamUrl = new URL('https://icecast.bkwsu.eu/radio-awaz-pune.mp3', import.meta.url).href;
  
  private readonly audioId = 'radio-stream';
  currentPositionIntervalId = 0;

  isInitialized = false;
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlayingSubject.asObservable();

  private platform = Capacitor.getPlatform();  // 'ios' | 'android' | 'web'
  private loaded = false;

  constructor() {
    if (this.platform === 'web') {
      console.warn('capacitor-native-audio does not support web platform');
    }
  }

  // async loadStream() {
  //   if (!this.loaded) {
  //     try {
  //       await NativeAudio.load({
  //         assetId: this.assetId,
  //         assetPath: this.streamUrl,
  //         assetType: AssetType.REMOTE,
  //       });
  //       this.loaded = true;
  //     } catch (error) {
  //       console.error('Error loading radio stream:', error);
  //     }
  //   }
  // }

  // async play() {
  //   if (this.platform === 'web') {
  //     console.warn('Playback not supported on web using native-audio');
  //     return;
  //   }

  //   await this.loadStream();
  //   try {
  //     await NativeAudio.play({ assetId: this.assetId });
  //     this.isPlayingSubject.next(true);
  //   } catch (err) {
  //     console.error('Play error:', err);
  //   }
  // }

  // async pause() {
  //   try {
  //     await NativeAudio.pause({ assetId: this.assetId });
  //     this.isPlayingSubject.next(false);
  //   } catch (err) {
  //     console.error('Pause error:', err);
  //   }
  // }

  // async stop() {
  //   try {
  //     await NativeAudio.stop({ assetId: this.assetId });
  //     await NativeAudio.unload({ assetId: this.assetId });
  //     this.loaded = false;
  //     this.isPlayingSubject.next(false);
  //   } catch (err) {
  //     console.error('Stop error:', err);
  //   }
  // }

  async togglePlay() {
    this.isPlayingSubject.value ? await this.pauseButton() : await this.playButton();
  }

  get isPlaying(): boolean {
    return this.isPlayingSubject.value;
  }



  async initialize(): Promise<void> {
      this.isInitialized = true;
  
      await AudioPlayer.create({
          audioId: this.audioId,
          audioSource: this.streamUrl,
          // albumTitle: 'My Album Title',
          // artistName: 'My Artist',
          friendlyTitle: 'Radio',
          useForNotification: true,
          // artworkSource: 'https://placehold.co/1200.jpg',
          isBackgroundMusic: false,
          loop: false,
          showSeekForward: true,
          showSeekBackward: true,
      }).catch(ex => {
        console.log(ex);
      });
  
      await AudioPlayer.onAudioReady({ audioId: this.audioId }, async () => {
          console.log(
              'duration',
              Math.ceil((await AudioPlayer.getDuration({ audioId: this.audioId })).duration).toString(),
          );
      });
  
      AudioPlayer.onAudioEnd({ audioId: this.audioId }, async () => {
          this.stopCurrentPositionUpdate(true);
      });
  
      AudioPlayer.onPlaybackStatusChange({ audioId: this.audioId }, result => {
          console.log('status', result.status);
  
          switch (result.status) {
              case 'playing':
                  // AudioPlayer.setVolume({ audioId: bgAudioId, volume: 0.5 });
                  // AudioPlayer.play({ audioId: bgAudioId });
                  this.startCurrentPositionUpdate();
                  break;
              case 'paused':
                  // AudioPlayer.pause({ audioId: bgAudioId });
                  this.stopCurrentPositionUpdate();
                  this.isPlayingSubject.next(false);
                  break;
              case 'stopped':
                  // AudioPlayer.stop({ audioId: bgAudioId });
                  this.stopCurrentPositionUpdate(true);
                  this.isPlayingSubject.next(false);
                  break;
              default:
                  // AudioPlayer.stop({ audioId: bgAudioId });
                  break;
          }
      });
  
      await AudioPlayer.initialize({ audioId: this.audioId }).catch(ex => {
        console.log(ex);
      });
  }
  
  playButton() {

      if (!this.isInitialized) {
          this.initialize();
      }
  
      AudioPlayer.play({ audioId:this.audioId });
      this.isPlayingSubject.next(true);
      this.startCurrentPositionUpdate();
  }

  
  pauseButton() {
      this.stopCurrentPositionUpdate();
      AudioPlayer.pause({ audioId: this.audioId })
      this.isPlayingSubject.next(false);;
  }
  
  stopButton() {
      console.log('status', 'stopped');
      this.stopCurrentPositionUpdate(true);
      AudioPlayer.stop({ audioId:this.audioId });
      this.isPlayingSubject.next(false);
  }
  
  changeMetadataButton() {
      AudioPlayer.changeMetadata({
          audioId: this.audioId,
          // albumTitle: 'A New Album',
          // artistName: 'A New Artist',
          friendlyTitle: 'A New Title',
          artworkSource: 'assets/sample_artwork_new.png',
          // artworkSource: 'https://placehold.co/1200.jpg',
      });
  }
  
  cleanupButton() {
      console.log('status', 'stopped');
      this.stopCurrentPositionUpdate(true);
      AudioPlayer.destroy({ audioId: this.audioId });
  
      this.isInitialized = false;
  }
  
  
   startCurrentPositionUpdate(): void {
      this.stopCurrentPositionUpdate();
  
      // this.currentPositionIntervalId = window.setInterval(async () => {
      //     console.log(
      //         'currentTime',
      //         Math.round(
      //             (await AudioPlayer.getCurrentTime({ audioId: this.audioId })).currentTime,
      //         ).toString(),
      //     );
      // }, 1000);
  }
  
   stopCurrentPositionUpdate(resetText:boolean = false): void {
      clearInterval(this.currentPositionIntervalId);
      this.currentPositionIntervalId = 0;
  
      if (resetText) {
          console.log('currentTime', '0');
      }
  }
  
  //  addClickEvent(elementId: string, callback: () => void): void {
  //     const el = document.getElementById(elementId);
  
  //     if (el) {
  //         el.onclick = callback;
  //     }
  // }
  
   generateAudioId(): string {
      return Math.ceil(Math.random() * 10000000).toString();
  }
  
  //  setError(exception: unknown) {
  //     const ex = exception as CapacitorException;
  
  //     setText('error', ex.message);
  // }
  
  // setText(elementId: string, text: string): void {
  //     const el = document.getElementById(elementId);
  
  //     if (el) {
  //         el.innerText = text;
  //     }
  // }

}


