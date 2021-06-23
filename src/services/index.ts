import _AuthenticationService from './AuthenticationService';
import _LocationManager from './LocationManager';
import _NotificationService from './NotificationService';

export * from './FirebaseService';
export const LocationManager = new _LocationManager();
export const NotificationService = new _NotificationService();
export const AuthenticationService = new _AuthenticationService();
