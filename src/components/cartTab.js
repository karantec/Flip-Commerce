import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartItem from './cartItem';
import { toggleStatusTab, applyDiscount, clearCart } from '../stores/cart';
import { formatCurrency } from '../utils/currencyFormatter';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const totalBalance = useSelector(store => store.cart.totalBalance);
    const discount = useSelector(store => store.cart.discount);
    const finalPrice = useSelector(store => store.cart.finalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [discountInput, setDiscountInput] = useState('');
    const [discountType, setDiscountType] = useState('fixed'); // 'fixed' or 'percentage'

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    }

    const handleApplyDiscount = () => {
        const discountValue = parseFloat(discountInput);
        if (!isNaN(discountValue) && discountValue > 0) {
            dispatch(applyDiscount({ 
                discountAmount: discountValue, 
                isPercentage: discountType === 'percentage' 
            }));
        }
    }

    const handleCheckout = () => {
        dispatch(clearCart());
        dispatch(toggleStatusTab());
        navigate('/thank-you', { state: { totalAmount: finalPrice } });
    }

    return (
        <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[auto_1fr_auto]
        transform transition-transform duration-500
        ${statusTab === false ? "translate-x-full" : ""}
        `}>
            <h2 className='p-5 text-white text-2xl'>Shopping Cart</h2>
            <div className='p-5 overflow-y-auto'>
                {carts.map((item, key) =>
                    <CartItem key={key} data={item}/>
                )}
            </div>
            <div className='p-5 bg-gray-800 text-white'>
                <div className='mb-4'>
                    <p>Subtotal: {formatCurrency(totalBalance)}</p>
                    <p>Discount: {formatCurrency(discount)}</p>
                    <p className='text-xl font-bold'>Total: {formatCurrency(finalPrice)}</p>
                </div>
                <div className='mb-4'>
                    <div className='flex mb-2'>
                        <input 
                            type='number'
                            placeholder='Discount amount'
                            value={discountInput}
                            onChange={(e) => setDiscountInput(e.target.value)}
                            className='p-2 text-black w-1/2'
                        />
                        <select 
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
                            className='p-2 text-black w-1/4 ml-2'
                        >
                            <option value="fixed">$</option>
                            <option value="percentage">%</option>
                        </select>
                        <button 
                            onClick={handleApplyDiscount}
                            className='bg-blue-500 p-2 ml-2 w-1/4'
                        >
                            Apply
                        </button>
                    </div>
                   
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <button className='bg-black text-white p-2' onClick={handleCloseTabCart}>CLOSE</button>
                    <button className='bg-amber-600 text-white p-2' onClick={handleCheckout}>CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default CartTab