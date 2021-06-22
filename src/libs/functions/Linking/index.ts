import {Linking} from "react-native";

class OpenLinkClass{
    openUrl(url: string){
        Linking.openURL(`mailto:${url}`)
    }
}
const OpenLink = new OpenLinkClass()
export default OpenLink;