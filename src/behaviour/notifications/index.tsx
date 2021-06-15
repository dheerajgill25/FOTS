import React, { useEffect, useRef } from 'react';
import messaging from '@react-native-firebase/messaging';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import iid from '@react-native-firebase/iid';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
interface NotificationWatcherProps {
}
async function requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enabled;
}

async function requestUserPermission() {
    const permissionGranted = await messaging().hasPermission();
    const isPermissionGranted =
        permissionGranted === messaging.AuthorizationStatus.AUTHORIZED ||
        permissionGranted === messaging.AuthorizationStatus.PROVISIONAL;

    let enabled= isPermissionGranted;
    if (!isPermissionGranted) {
        enabled = await requestPermission();
    }
    if (enabled) {
        messaging()
            .getToken()
            .then((token) => {
                console.log('getToken', token);
            });
        iid()
            .get()
            .then((token) => {
                console.debug('iid', token);
            });
    }
    inAppMessaging().setMessagesDisplaySuppressed(false);
};


const NotificationWatcher = ({ }: NotificationWatcherProps) => {
    useEffect(() => {
        requestUserPermission();
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            const { notification: { body, title } = {}, data } = remoteMessage;
            if (body && title) {
                PushNotification.localNotification({
                    message: body,
                    title,
                });
            }
        });
        return () => {
            unsubscribe();
        }
    }, []);
    return <></>;
};

export default NotificationWatcher;
