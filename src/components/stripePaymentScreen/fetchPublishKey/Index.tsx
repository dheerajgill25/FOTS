import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIENDPOINTS } from 'libs/api/apiEndpoints';

export async function fetchPublishableKey(
    paymentMethod?: string
): Promise<string | null> {
    const token = await AsyncStorage.getItem("token");
    let key: any;
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
                    if (obj.paymentmethod && obj.paymentmethod.length > 0) {
                        obj.paymentmethod && obj.paymentmethod.forEach((item: any) => {
                            if (item.key == 'publishable_key') {
                                key = item.value
                            }
                        })
                    }
                }
            })
        }
        return key;
    } catch (e) {
        console.warn('Unable to fetch publishable key. Is your server running?');
        console.log(
            'Error',
            'Unable to fetch publishable key. Is your server running?'
        );
        return null;
    }
}