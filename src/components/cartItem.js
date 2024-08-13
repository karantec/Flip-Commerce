import React, { useState, useEffect } from 'react';
import { products } from '../products';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeFromCart } from '../stores/cart';
import { formatCurrency } from '../utils/currencyFormatter';

const CartItem = (props) => {
    const { productId, quantity } = props.data;
    const [detail, setDetail] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const findDetail = products.filter(product => product.id === productId)[0];
        setDetail(findDetail);
    }, [productId]);

    const handleMinusQuantity = () => {
        if (quantity > 1) {
            dispatch(changeQuantity({
                productId: productId,
                quantity: quantity - 1
            }));
        }
    };

    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity + 1
        }));
    };

    const handleRemoveItem = () => {
        dispatch(removeFromCart({ productId }));
    };

    return (
        <div className='flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-3 rounded-md'>
            <img src={detail.image} alt={detail.name} className='w-12'/>
            <h3>{detail.name}</h3>
            <p>{formatCurrency(detail.price * quantity)}</p>
            <div className='w-20 flex justify-between gap-2'>
                <button className='bg-gray-200 rounded-full w-4 h-6 text-cyan-600' onClick={handleMinusQuantity}>-</button>
                <span>{quantity}</span>
                <button className='bg-gray-200 rounded-full w-4 h-6 text-cyan-600' onClick={handlePlusQuantity}>+</button>
                <button 
                className='bg-red-500 text-white p-2 rounded-md'
                onClick={handleRemoveItem}
            >
                Remove
            </button>
            </div>
         
        </div>
    );
};

export default CartItem;
