import { Dimensions, Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const window = Dimensions.get('window');
export const formatDateToString = (date: Date) => {
    const options:any = { month: 'long', day: 'numeric', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}