import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  //Probablemente para las rentas de autos usemos la misma lógica y estructura:
  const [cartTours, setCartTours] = useState([]);
  useEffect(() => {
    if (cartTours?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartTours));
    }
  }, [cartTours]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartTours(JSON.parse(ls.getItem("cart")));
      1
    }
  }, []);


  function addTour(orderDataTour) {
    const isTourAlreadyInCart = cartTours.some((tour) => tour.id === orderDataTour.id);
  
    if (!isTourAlreadyInCart) {
      setCartTours((prev) => [...prev, orderDataTour]);
    }
  };
  

  function removeTour(tourId) {
    setCartTours((prev) => {
      const pos = prev.findIndex((tour) => tour.id === tourId);
  
      if (pos !== -1) {
        return prev.filter((tour) => tour.id !== tourId);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartTours([]);
    ls.removeItem("cart");
  }
  return (
    <CartContext.Provider
      value={{
        cartTours,
        setCartTours,
        addTour,
        removeTour,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
