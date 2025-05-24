const fs = require('fs');
const path = require('path');
const plist = require('plist');
// npm install plist

// === 1. Bump package.json version ===
const pkgPath = path.join(__dirname, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

let version = pkg.version.split('.');
version[2] = parseInt(version[2]) + 1; // bump PATCH
const newVersion = version.join('.');

pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

console.log(`✅ package.json updated to ${newVersion}`);

// === 2. Update capacitor.config.ts (if used) ===
// const capPath = path.join(__dirname, 'capacitor.config.ts');
// if (fs.existsSync(capPath)) {
//   let capContent = fs.readFileSync(capPath, 'utf8');
//   capContent = capContent.replace(/version: ['"]([^'"]+)['"]/, `version: '${newVersion}'`);
//   fs.writeFileSync(capPath, capContent);
//   console.log('✅ capacitor.config.ts updated');
// }

// === 3. Update Android build.gradle ===
const androidPath = path.join(__dirname, 'android/app/build.gradle');
if (fs.existsSync(androidPath)) {
  let gradle = fs.readFileSync(androidPath, 'utf8');
  gradle = gradle
    .replace(/versionName ".*?"/, `versionName "${newVersion}"`)
    .replace(/versionCode \d+/, `versionCode ${versionCodeFromVersion(newVersion)}`);
  fs.writeFileSync(androidPath, gradle);
  console.log('✅ Android versionName and versionCode updated');
}

// === 4. Update iOS Info.plist ===
const iosPlistPath = path.join(__dirname, 'ios/App/App/Info.plist'); // Adjust path as per your structure
if (fs.existsSync(iosPlistPath)) {
  const plistContent = fs.readFileSync(iosPlistPath, 'utf8');
  const info = plist.parse(plistContent);
  info.CFBundleShortVersionString = newVersion;
  info.CFBundleVersion = versionCodeFromVersion(newVersion).toString(); // Can be same as versionCode
  fs.writeFileSync(iosPlistPath, plist.build(info));
  console.log('✅ iOS Info.plist version updated');
}

function versionCodeFromVersion(version) {
  // Converts 1.2.3 → 10203 (custom logic; adjust as needed)
  const [major, minor, patch] = version.split('.').map(n => parseInt(n));
  return major * 10000 + minor * 100 + patch;
}
