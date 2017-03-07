package com.colorgame;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSoundPackage(),
            new ReactNativeAudioPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    copyAudioFilesToFilesDir();
  }

  /*
    It copies the files from assets into the android filesDir() folder.
    react-native-sound uses the result of filesDir():
    https://github.com/jsierles/react-native-audio/blob/9d5e36e31831a2ef1ae7272d4c3141c945dfd89b/android/src/main/java/com/rnim/rn/audio/AudioRecorderManager.java#L61

    In this case, we are using DocumentDirectoryPath for the library
  */
  private void copyAudioFilesToFilesDir() {
    try {
      String[] fileNames = getAssets().list("audios");

      for(int i = 0; i < fileNames.length; i++){
        String fileName = fileNames[i];

        FileOutputStream outputStream;

        InputStream inputStream;
        byte[] bufferAudioFile;

        inputStream = getAssets().open("audios/"+ fileName);
        int size = inputStream.available();
        bufferAudioFile = new byte[size];
        inputStream.read(bufferAudioFile);
        inputStream.close();


        outputStream = openFileOutput(fileName, Context.MODE_PRIVATE);
        outputStream.write(bufferAudioFile);
        outputStream.close();

      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
