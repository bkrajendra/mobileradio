# Community Radio Mobile Application

A customizable mobile application template for community radio stations. This repository serves as a base template that can be forked and customized to create station-specific radio applications.

## Overview

This application provides a complete solution for community radio stations to have their own branded mobile application. The template includes essential features for radio streaming and station information, which can be easily customized for each station's specific needs.

## Features

- Live radio streaming
- Station information and about us section
- Social media integration
- Custom branding and theming
- Push notifications support
- Offline mode for station information

## Customization Guide

To create your own radio station app, follow these steps:

1. **Fork the Repository**
   - Create a new branch for your station
   - Clone the repository to your local machine

2. **Update Configuration**
   The following parameters can be customized in the configuration files:

   - App Name
   - Station Logo
   - Stream URL
   - Social Media Handles
   - About Us Information
   - Color Scheme
   - Station Description
   - Contact Information

3. **Build Process**
   ```bash
# Build the application
podman run --rm -v $(pwd):/workdir bkrajendra/ionic-builder:ionic-8 bash -c "ionic build && npx cap sync android && cd android && ./gradlew assembleDebug"

podman run --rm -v "%cd%":/workdir bkrajendra/ionic-builder:ionic-8 bash -c "npm i && ionic build && npx cap sync android && cd android && ./gradlew assembleDebug"
   ```

4. **Testing**
   ```bash
   # Run tests
   npm test

   # Test the application locally
   npm run dev
   ```

## Configuration Files

The main configuration files that need to be updated are:

- `config/station.json` - Station-specific information
- `assets/` - Station logos and images
- `src/constants/` - App-wide constants and settings

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)

## Building for Different Platforms

### Android
```bash
npm run build:android
```

### iOS
```bash
npm run build:ios
```

## Contributing

We welcome contributions to improve the base template. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please:
- Open an issue in this repository
- Contact the maintainers
- Check the documentation

## Best Practices

When customizing the app for your station:

1. Keep the app size optimized
2. Test thoroughly on different devices
3. Ensure stream quality is appropriate for mobile networks
4. Follow platform-specific guidelines for app store submissions
5. Maintain consistent branding across the app

## Version History

- v1.0.0 - Initial release
- Check the releases page for detailed version history

---

Made with ❤️ for community radio stations 