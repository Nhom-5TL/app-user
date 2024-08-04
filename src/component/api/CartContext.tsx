import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
    cartCount: number;
    addToCart: (quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartCount, setCartCount] = useState<number>(0);

    const addToCart = (quantity: number) => {
        setCartCount(prevCount => prevCount + quantity);
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
