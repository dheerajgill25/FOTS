import Snackbar from "react-native-snackbar";
import { FontFamilyFoods } from "components/typography/Typography";

class ToasterService {
    show(message: string) {
        setTimeout(()=>{
            Snackbar.show({
                text: message,
                backgroundColor: 'black',
                fontFamily: FontFamilyFoods.POPPINSMEDIUM,
                duration: 3000
            })
        },100)
       
    }
}
const Toaster = new ToasterService();
export default Toaster;