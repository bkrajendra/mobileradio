import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StationConfig } from './station.types';

@Injectable({
  providedIn: 'root'
})
export class StationConfigLoader {
  private config: StationConfig;

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    try {
      const configPath = `./config/station.${environment.production ? 'production' : 'development'}.json`;
      this.config = require(configPath);
    } catch (error) {
      console.error('Failed to load station configuration:', error);
      throw new Error('Station configuration could not be loaded');
    }
  }

  public getConfig(): StationConfig {
    return this.config;
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