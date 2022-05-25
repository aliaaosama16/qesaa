import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.efada.qesaa',
  appName: 'qesaa',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
      androidSplashResourceName: 'splash',
      splashFullScreen: true,
      splashImmersive: false,
    },
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true,
    },
    // PushNotifications: {
    //   presentationOptions: ["badge", "sound", "alert"]
    // }
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
