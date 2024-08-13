import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, changeQuantity, applyDiscount, clearCart } from '../stores/cart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart({ productId }));
    };

    const handleChangeQuantity = (productId, quantity) => {
        dispatch(changeQuantity({ productId, quantity }));
    };

    const handleApplyDiscount = (discountAmount, isPercentage) => {
        dispatch(applyDiscount({ discountAmount, isPercentage }));
    };

    const handleCheckout = () => {
        dispatch(clearCart());
        navigate('/thank-you', { state: { totalAmount: cart.finalPrice } });
    };

    return (
        <div className="cart-page">
            <h2 className="text-3xl text-center mb-6">Your Cart</h2>
            <div className="cart-items space-y-4">
                {cart.items.map((item) => (
                    <div key={item.productId} className="cart-item flex gap-5 bg-white p-4 rounded-lg shadow">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                        <div className="item-details flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold">{item.name}</h3>
                            <p className="text-lg">${item.price}</p>
                            <div className="quantity-selector flex gap-2 items-center mt-2">
                                <button onClick={() => handleChangeQuantity(item.productId, item.quantity - 1)} className="bg-gray-200 px-2 py-1 rounded">-</button>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleChangeQuantity(item.productId, Number(e.target.value))}
                                    className="w-12 text-center border rounded"
                                />
                                <button onClick={() => handleChangeQuantity(item.productId, item.quantity + 1)} className="bg-gray-200 px-2 py-1 rounded">+</button>
                            </div>
                        </div>
                        <button className="remove-item text-red-500" onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="cart-summary mt-8 bg-white p-6 rounded-lg shadow">
                <h3 className="text-2xl font-semibold mb-4">Cart Summary</h3>
                <p className="text-lg">Subtotal: ${cart.totalBalance.toFixed(2)}</p>
                <p className="text-lg">Discount: -${cart.discount.toFixed(2)}</p>
                <p className="text-xl font-bold mt-2">Total: ${cart.finalPrice.toFixed(2)}</p>
                <div className="apply-discount mt-4">
                    <h4 className="text-lg font-semibold">Apply Discount</h4>
                    <div className="flex gap-2 mt-2">
                        <button onClick={() => handleApplyDiscount(10, false)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Apply $10 Off</button>
                        <button onClick={() => handleApplyDiscount(10, true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Apply 10% Off</button>
                    </div>
                </div>
                <button 
                    className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 mt-6 w-full"
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;