const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Paths
const CONFIG_PATH = path.join(__dirname, '../config/station.json');
const ASSETS_PATH = path.join(__dirname, '../src/assets');
const OUTPUT_PATH = path.join(__dirname, '../src/assets/config');

async function processConfig() {
    try {
        // Read station configuration
        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
        
        // Create output directory if it doesn't exist
        if (!fs.existsSync(OUTPUT_PATH)) {
            fs.mkdirSync(OUTPUT_PATH, { recursive: true });
        }

        // Process and optimize images
        await processImages(config.branding.logo);
        await processImages(config.branding.splashScreen);

        // Generate environment-specific configs
        const envConfigs = {
            development: { ...config, environment: 'development' },
            production: { ...config, environment: 'production' }
        };
console.log(OUTPUT_PATH);
        // Write processed configs
        Object.entries(envConfigs).forEach(([env, config]) => {
            fs.writeFileSync(
                path.join(OUTPUT_PATH, `station.${env}.json`),
                JSON.stringify(config, null, 2)
            );
        });

        // Generate TypeScript types
        generateTypes(config);

        console.log('✅ Configuration processed successfully');
    } catch (error) {
        console.error('❌ Error processing configuration:', error);
        process.exit(1);
    }
}

async function processImages(logoConfig) {
    const sizes = {
        small: 32,
        medium: 64,
        large: 128
    };

    for (const [key, imagePath] of Object.entries(logoConfig)) {
        if (typeof imagePath === 'string' && imagePath.startsWith('assets/')) {
            const fullPath = path.join(__dirname, '..', 'src', imagePath);
            const outputDir = path.join(OUTPUT_PATH, 'images');

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Process each size
            for (const [size, dimension] of Object.entries(sizes)) {
                const outputPath = path.join(outputDir, `${key}-${size}.png`);
                await sharp(fullPath)
                    .resize(dimension, dimension)
                    .toFile(outputPath);
            }
        }
    }
}

function generateTypes(config) {
    const typeDefinitions = `
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
`;

    fs.writeFileSync(
        path.join(__dirname, '../src/app/config/station.types.ts'),
        typeDefinitions
    );
}

// Run the build process
processConfig(); 