import Snackbar from "react-native-snackbar";
import { FontFamilyFoods } from "components/typography/Typography";

class ToasterService{
    show(message:string){
        Snackbar.show({
            text:message,
            backgroundColor:'black',
            fontFamily:FontFamilyFoods.POPPINSMEDIUM,
            duration:3000
        })
    }
}
const Toaster = new ToasterService();
export default Toaster;