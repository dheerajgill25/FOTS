import React, { useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import iid from '@react-native-firebase/iid';
import PushNotification from 'react-native-push-notification';
import { isAndroid } from 'themes/functions';
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

    let enabled= isAndroid;
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
    //@ts-ignore
    const notificationHandler = async (remoteMessage ) => {
        console.debug('remoteMessage', remoteMessage);
        //@ts-ignore
        const {notification: {body, title} = {}, data } = remoteMessage;
         if (body && title) {
            console.debug('title', title);
            console.debug('body', body);
    
            if (isAndroid) {
                PushNotification.createChannel({
                    channelId: 'foodonstoves_channel',
                    channelName: 'Foodonstoves Channel',
                    channelDescription: 'Foodonstoves Channel',
                    vibrate: true,
                    playSound: true,
                }, (created) => {
                    console.debug('created', created);
                });
            } 
            PushNotification.localNotification({
                id: 1,
                message: body,
                title,
                largeIcon: '',
                priority: 'high',
                channelId: 'foodonstoves_channel',
                color: '#00ACCA',
                playSound: true
            });
        }
    }
    useEffect(() => {
        requestUserPermission();
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            notificationHandler(remoteMessage);
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            notificationHandler(remoteMessage);
        });

        return () => {
            unsubscribe();
        }
    }, []);
    return <></>;
};

export default NotificationWatcher;
