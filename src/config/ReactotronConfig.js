/* eslint-disable no-console */
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.useReactNative()
    .configure()
    .setAsyncStorageHandler(AsyncStorage)
    .connect();

  console.tron = tron;

  tron.clear();
}
