import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { createInjectorsEnhancer } from 'redux-injectors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingReducer } from "@features/LoadingScreen/reducer/Loading-reducer";
import { stateReducer } from 'features/registerscreen/reducers/state.reducers';
import { fireDepartmentReducer } from '@features/registerscreen/reducers/fireDepartment.reducers';
import { fireStationReducer } from '@features/registerscreen/reducers/fireStation.reducers';
import { signInReducer } from '@features/login/reducers/login.reducer';
import { registerReducer } from '@features/registerscreen/reducers/register.reducer';
import { categoriesReducer } from 'features/home/reducers/category.reducer';
import { mealPlanReducer } from 'features/mealplan/reducers/meal-plan.reducer';
import { tokenReducer } from 'features/login/reducers/token.reducer';
import { productReducer } from 'features/products/reducers/product.reducer';
import { productDetailReducer } from 'features/productdetail/reducers/productdetail.reducer';
import { cartListReducer } from 'features/cart/httpCall/reducers/cartList.reducer';
import { checkoutCartReducer } from 'features/commonApiCall/checkout/reducers/checkout.reducer';
import { orderListReducer } from 'features/commonApiCall/orderList/reducers/orderList.reducer';
import { uploadImageReducer } from 'features/editProfile/reducers/uploadImage.reducer';
import { cartCountReducer } from 'features/commonApiCall/cartCount/reducers/cartCount.reducer';
import { addToCartReducer } from 'features/commonApiCall/addToCart/reducers/addToCart.reducer';
import { testimonialsReducer } from 'features/home/reducers/testimonials.reducer';
import { generalSettingsReducer } from 'features/commonApiCall/generalSetting/reducers/generalSettings.reducer';
import { popularProductReducer } from 'features/home/reducers/popularProduct.reducer';
import { faqReducer } from 'features/faq/httpCallFaq/reducers/faq.reducer';

const sagaMiddleware = createSagaMiddleware();

const runSaga = sagaMiddleware.run;

function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        ...injectedReducers,
        loadingState: LoadingReducer,
        StateInState: stateReducer,
        FireDepartmentInState: fireDepartmentReducer,
        FireStationInState: fireStationReducer,
        SignInInState:signInReducer,
        RegisterInState:registerReducer,
        CategoryInState:categoriesReducer,
        MealPlanInState:mealPlanReducer,
        TokenInState:tokenReducer,
        ProductInState:productReducer,
        ProductDetailInState:productDetailReducer,
        CartListInState:cartListReducer,
        CheckoutInState:checkoutCartReducer,
        OrderListInState:orderListReducer,
        UploadImageInState:uploadImageReducer,
        CartCountInState:cartCountReducer,
        AddToCartInState:addToCartReducer,
        TestimonialsInState:testimonialsReducer,
        GeneralSettingInState:generalSettingsReducer,
        PopularProductInState:popularProductReducer,
        FaqInState:faqReducer
    });
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['signInConfig'],
    };
    return persistReducer(persistConfig, rootReducer);
}

const middlewares = [sagaMiddleware];
const store = createStore(
    createReducer(),
    composeWithDevTools(
        applyMiddleware(...middlewares),
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ),
);
const persistor = persistStore(store);

export { store, persistor };
