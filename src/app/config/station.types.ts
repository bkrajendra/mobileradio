
// Auto-generated types from station.json
export interface StationConfig {
    station: {
        name: string;
        shortName: string;
        description: string;
        tagline: string;
        founded: string;
        language: string;
    };
    streaming: {
        mainStream: {
            url: string;
            format: string;
            bitrate: string;
            fallbackUrl: string;
        };
        secondaryStream: {
            url: string;
            format: string;
            bitrate: string;
        };
    };
    branding: {
        primaryColor: string;
        secondaryColor: string;
        accentColor: string;
        logo: {
            light: string;
            dark: string;
            favicon: string;
        };
        splashScreen: {
            backgroundColor: string;
            image: string;
        };
    };
    social: {
        facebook: string;
        twitter: string;
        instagram: string;
        youtube: string;
        linkedin: string;
    };
    contact: {
        email: string;
        phone: string;
        address: {
            street: string;
            city: string;
            state: string;
            country: string;
            postalCode: string;
        };
    };
    about: {
        mission: string;
        vision: string;
        history: string;
        team: Array<{
            name: string;
            position: string;
            bio: string;
        }>;
    };
    schedule: {
        timezone: string;
        programs: Array<{
            name: string;
            time: string;
            days: string[];
        }>;
    };
    notifications: {
        enabled: boolean;
        topics: string[];
    };
    app: {
        version: string;
        buildNumber: string;
        storeLinks: {
            android: string;
            ios: string;
        };
    };
    analytics: {
        enabled: boolean;
        provider: string;
        trackingId: string;
    };
    privacy: {
        policyUrl: string;
        termsUrl: string;
    };
}

export type Environment = 'development' | 'production';
