import {Linking} from "react-native";

class OpenLinkClass{
    openUrl(url: string){
        Linking.openURL(`mailto:${url}`)
    }
    openWebUrl(url: string){
        Linking.openURL(url)
    }
}
const OpenLink = new OpenLinkClass()
export default OpenLink;