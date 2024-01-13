import { getAllShops } from "../../sevices/shops"

export default function SetShopsList() {
    return (dispatch) => {
        getAllShops()
        .then((res) => dispatch({ type: 'SET_SHOPS', payload: res}))
    }
} 