import { createContext, useContext, useEffect, useState } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";
import { useLocalStorage } from 'usehooks-ts'
interface shopingCartContextProviderProps {
    children: React.ReactNode;
}


const shopingCartContext = createContext({});


export function ShopingCartContextProvider({ children }: shopingCartContextProviderProps) {
    // const [shopingCart, _setShopingCart] = useState<any[]>([]);
    const [shopingCart, _setShopingCart] = useLocalStorage<any[]>("shopingCart",[]);

    // if (typeof window !== 'undefined') {
    //     localStorage.setItem("shopingCart", JSON.stringify(shopingCart));

    //     console.log(JSON.parse(localStorage.getItem("shopingCart") || "[]"));
    // }
    
    console.log("shopingCart: ", shopingCart);

    const setShopingCart = (allProducts: any, oneProduct?: any) => {
        let shopingCartProduct: any = {};

        console.log(shopingCart.some((item: any) => item.productId === oneProduct.id));

        if (shopingCart.some((item: any) => item.productId === oneProduct.id)) {

            shopingCartProduct = shopingCart.find((item: any) => item.productId === oneProduct.id).quantity += 1;

        } else {
            _setShopingCart(allProducts);
        }

    }

    

    //number of different items in the shoping cart
    function getNumberOfDifferentItems() {
        return shopingCart.length;
    }

    function getTotalPrice() {
        let totalPrice = 0;

        shopingCart.forEach((item: any) => {
            totalPrice += item.product.price * item.quantity;
        });

        return totalPrice;
    }

    return (
        <shopingCartContext.Provider value={{ shopingCart, setShopingCart, getNumberOfDifferentItems, getTotalPrice }}>
            {children}
        </shopingCartContext.Provider>
    )

}

//custom hook to call this context from anywhere
export function useShopingCart() {
    return useContext(shopingCartContext);
}