import { isAndroid } from "@themes/functions";


const Size = {
    navigationBar: {
        heightCollapsed: 56,
        marginTop: isAndroid ? 24 : 34,
    },
    squareButton: {
        size: 48,
    },
    userImage: {
        size: 65,
    },
};

export default Size;
