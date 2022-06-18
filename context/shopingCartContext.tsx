import { createContext, useContext, useEffect, useState } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";
import { useLocalStorage } from 'usehooks-ts'
interface shopingCartContextProviderProps {
    children: React.ReactNode;
}


const shopingCartContext = createContext({});


export function ShopingCartContextProvider({ children }: shopingCartContextProviderProps) {
    const [shopingCart, defaultSetShopingCart] = useLocalStorage<any[]>("shopingCart", []);

    //custom setter for the shoping cart
    const setShopingCart = (allProducts: any, oneProduct?: any) => {
        let shopingCartProduct: any = {};

        
        //check if product is already in shopingCart
        if (shopingCart.some((item: any) => item.productId === oneProduct.id)) {

            // Object.keys(shopingCart).forEach((index: any) => {
            //     shopingCart[index].product.currentColor != oneProduct.currentColor &&
            //         // ?
            //         // setShopingCart([...shopingCart, shopingCartProduct], product)
            //     // :
            //     defaultSetShopingCart(allProducts)
    
            //     // console.log(shopingCart[index].product);
            //     // console.log(product);
    
            // });

            shopingCartProduct = shopingCart.find((item: any) => item.productId === oneProduct.id).quantity += 1;

        } else {
            defaultSetShopingCart(allProducts);
        }

    }


    //number of different items in the shoping cart
    function getNumberOfDifferentItems() {
        return shopingCart.length;
    }


    //total price of the shoping cart
    function getTotalPrice(add: number) {
        let totalPrice = 0;

        shopingCart.forEach((item: any) => {
            totalPrice += item.product.price * item.quantity;
        });
        add && (totalPrice += add);
        return totalPrice.toFixed(2);
    }


    return (
        <shopingCartContext.Provider value={{ shopingCart, setShopingCart, defaultSetShopingCart, getNumberOfDifferentItems, getTotalPrice }}>
            {children}
        </shopingCartContext.Provider>
    )

}

//custom hook to call this context from anywhere
export function useShopingCart() {
    return useContext(shopingCartContext);
}