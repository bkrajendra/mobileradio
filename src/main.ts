import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    MusicControls,
    AppVersion,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
