import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.efada.qesaa',
  appName: 'qesaa',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      // androidSplashResourceName:'splash'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
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
