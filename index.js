/**
 * @format
 */

import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';

__DEV__ = false;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

AppRegistry.registerComponent(appName, () => App);
