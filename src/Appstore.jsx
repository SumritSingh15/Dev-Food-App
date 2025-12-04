import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import ProductReducer from "./ProductSlice"
const appstore = configureStore({
    reducer:{
        user:userReducer,
        Product:ProductReducer,
    }
})
export default appstore