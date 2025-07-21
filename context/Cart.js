import { createContext, useReducer } from "react";
import Cookies from "js-cookie";
export const CartContext = createContext();

//we save cartitems in the cookies as well
const initialState = {
	cart: Cookies.get("cart")
		? JSON.parse(Cookies.get("cart"))
		: { cartItems: [], shippinData: {} },
};

function reducer(state, action) {
	switch (action.type) {
		case "ADD_ITEM": {
			const newItem = action.payload;
			//check if the item already exists
			const exisistingItem = state.cart.cartItems.find(
				(item) => item.slug === newItem.slug
			);

			// if the new item already exists in the cart
			// we replace it with the newItem in which something is updated (e.g. updated quantity, price, options))
			const cartItems = exisistingItem
				? state.cart.cartItems.map((item) =>
						item.title === exisistingItem.title ? newItem : item
				  )
				: //otherwise add it
				  [...state.cart.cartItems, newItem];
			//also change the Cookies
			Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case "REMOVE_ITEM": {
			const itemToBeRemoved = action.payload;
			const cartItems = state.cart.cartItems.filter(
				(item) => item.slug !== itemToBeRemoved.slug
			);

			Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case "SAVE_SHIPPING_DATA": {
			return {
				...state,
				cart: {
					...state.cart,
					shippingData: {
						...state.cart.shippinData,
						...action.payload,
					},
				},
			};
		}

		default:
			return state;
	}
}

export function CartContextProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
/*
useReducer is a React hook for managing complex state logic in functional components. It's an alternative to useState, especially when:

The next state depends on the previous state.

There are multiple sub-values in state.

You want to centralize and organize state transitions.
const [state, dispatch] = useReducer(reducer, initialState);
state: the current state.

dispatch(action): function to send an action.

reducer(state, action): pure function returning the new state.

initialState: the initial value of the state.
*/
/*
//example with reducer
import React, { useReducer } from 'react';

// 1. Initial state
const initialState = { count: 0 };

// 2. Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

// 3. Component using useReducer
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}

export default Counter;
*/
