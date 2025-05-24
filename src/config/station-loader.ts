import { inject, Injectable } from '@angular/core';
import { StationConfig } from 'src/app/config/station.types';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class StationConfigLoader {
  private http = inject(HttpClient);
  private config!: StationConfig;

  constructor() {
    this.loadConfig();
  }

  async loadConfig(): Promise<StationConfig>{
    try {
      const configPath = `./assets/config/station.${environment.production ? 'production' : 'development'}.json`;
      // this.config = require(configPath);
      const config = await firstValueFrom(this.http.get(configPath));
      this.config = config as StationConfig;
      return config as StationConfig;
    } catch (error) {
      console.error('Failed to load station configuration:', error);
      throw new Error('Station configuration could not be loaded');
    }
  }

  async getConfig(): Promise<StationConfig> {
    if (!this.config) {
      await this.loadConfig();
    }
    return await this.config;
  }

  public getStationName(): string {
    return this.config.station.name;
  }

  public getStreamUrl(): string {
    return this.config.streaming.mainStream.url;
  }

  public getBranding(): StationConfig['branding'] {
    return this.config.branding;
  }

  public getSocialLinks(): StationConfig['social'] {
    return this.config.social;
  }

  public getContactInfo(): StationConfig['contact'] {
    return this.config.contact;
  }

  public getAboutInfo(): StationConfig['about'] {
    return this.config.about;
  }

  public getSchedule(): StationConfig['schedule'] {
    return this.config.schedule;
  }
} 