import { createSlice } from '@reduxjs/toolkit';
import { products } from '../products'; // Make sure this import path is correct

const initialState = {
    items: [],
    totalBalance: 0,
    discount: 0,
    finalPrice: 0,
    statusTab: false
};

const calculateTotalBalance = (items) => {
    return items.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.productId === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ productId, quantity });
            }
            state.totalBalance = calculateTotalBalance(state.items);
            state.finalPrice = state.totalBalance - state.discount;
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload;
            state.items = state.items.filter(item => item.productId !== productId);
            state.totalBalance = calculateTotalBalance(state.items);
            state.finalPrice = state.totalBalance - state.discount;
        },
        changeQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => item.productId === productId);
            if (item) {
                item.quantity = Math.max(quantity, 0);
                if (item.quantity === 0) {
                    state.items = state.items.filter(i => i.productId !== productId);
                }
            }
            state.totalBalance = calculateTotalBalance(state.items);
            state.finalPrice = state.totalBalance - state.discount;
        },
        applyDiscount: (state, action) => {
            const { discountAmount, isPercentage } = action.payload;
            if (isPercentage) {
                state.discount = state.totalBalance * (discountAmount / 100);
            } else {
                state.discount = discountAmount;
            }
            state.finalPrice = Math.max(state.totalBalance - state.discount, 0);
        },
        toggleStatusTab: (state) => {
            state.statusTab = !state.statusTab;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalBalance = 0;
            state.discount = 0;
            state.finalPrice = 0;
        }
    }
});

export const { 
    addToCart, 
    removeFromCart, 
    changeQuantity, 
    applyDiscount, 
    toggleStatusTab,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;