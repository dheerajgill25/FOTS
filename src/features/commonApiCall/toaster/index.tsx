import Snackbar from "react-native-snackbar";
import { FontFamilyFoods } from "components/typography/Typography";

class ToasterService {
    show(message: string, duration?: number) {
        setTimeout(() => {
            Snackbar.show({
                text: message,
                backgroundColor: 'black',
                fontFamily: FontFamilyFoods.POPPINSMEDIUM,
                duration: duration || 5000
            })
        }, 100)

    }
}
const Toaster = new ToasterService();
export default Toaster;