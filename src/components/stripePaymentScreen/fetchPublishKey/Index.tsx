import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIENDPOINTS } from 'libs/api/apiEndpoints';

export async function fetchPublishableKey(
    paymentMethod?: string
): Promise<any | null> {
    const token = await AsyncStorage.getItem("token");
    let key: any;
    let clientSecret: any
    try {
        const response = await fetch(
            `${APIENDPOINTS.APIBASEURL}/payment-methods?key=${APIENDPOINTS.APIKEY}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token || "",
                }
            }
        );
        const { data } = await response.json();
        if (data && data.length > 0) {
            data && data.forEach((obj: any) => {
                if (obj.payment_method == "stripe") {
                    key = obj.paymentmethod?.publishable_key?.value;
                    clientSecret = obj.paymentmethod?.secret_key?.value
                }
            })
        }
        return { key, clientSecret };
    } catch (e) {
        console.warn('Unable to fetch publishable key. Is your server running?');
        console.log(
            'Error',
            'Unable to fetch publishable key. Is your server running?'
        );
        return null;
    }
}