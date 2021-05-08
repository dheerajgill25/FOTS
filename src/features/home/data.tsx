interface FoodItemProps {
    text: string;
    imageUrl: string
}
export const label:string="Orders must be placed between Sunday 12 AM and Tuesday 2 pM in order for meals to be delivered by Friday of the same week. Orders placed on other days will be delivered the following Friday."
 
export const foodItemData: FoodItemProps[] = [
    {
        text: 'SALAD',
        imageUrl: require("../../../assets/images/salad.png"),
    },
    {
        text: 'CHICKEN',
        imageUrl: require("../../../assets/images/chicker.png"),
    },
    {
        text: 'SALMON',
        imageUrl: require("../../../assets/images/salmon.png"),
    },
    {
        text: 'SALAD',
        imageUrl: require("../../../assets/images/salad.png"),
    }, {
        text: 'CHICKEN',
        imageUrl: require("../../../assets/images/chicker.png"),
    },
];
export const groceryItemData: FoodItemProps[] = [
    {
        text: 'Sprouts Healthy Food',
        imageUrl: require("../../../assets/images/salad.png"),
    },
    {
        text: 'Sprouts Healthy Food',
        imageUrl: require("../../../assets/images/chicker.png"),
    },
    {
        text: 'Sprouts Healthy Food',
        imageUrl: require("../../../assets/images/salmon.png"),
    },
    {
        text: 'Sprouts Healthy Food',
        imageUrl: require("../../../assets/images/salad.png"),
    }, {
        text: 'Sprouts Healthy Food',
        imageUrl: require("../../../assets/images/chicker.png"),
    },
];
export const testimonialData:any[] = [
    {
        name: 'Robert Stuart',
        imageUrl: require("../../../assets/images/client.png"),
        designation:"Designer",
        description:"Lorem Ipsum is simply dummy text of the printing and type  industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
        name: 'Robert Stuart',
        imageUrl: require("../../../assets/images/client.png"),
        designation:"Tester",
        description:"Lorem Ipsum is simply dummy text of the printing and type  industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
        name: 'Robert Stuart',
        imageUrl: require("../../../assets/images/client.png"),
        designation:"Developer",
        description:"Lorem Ipsum is simply dummy text of the printing and type  industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
   
];