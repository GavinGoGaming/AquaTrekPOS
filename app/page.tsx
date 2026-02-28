"use client";

import { useState } from "react";
import { Product, products } from "./Products";

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  return (
    <>
    <main>
      {products.map((product, index) => (
        <div className="product" key={index}>
          <div className="image">
            <img src={`/product/${product.imagePath}`} alt={product.name.toString()} />
          </div>
          <div className="info">
            <h2>{typeof product.name === typeof "" ? product.name : <>
              {(product.name as string[]).map((name, index, arr) => (
                <span key={index} className={index === arr.length - 1 ? "primary-name" : undefined}>
                  {name}
                  <span className="seperator">{index !== arr.length - 1 ? " / " : ""}</span>
                </span>
              ))}
            </>}</h2>
            <p>{product.subtext}<br/>${product.price.toFixed(2)}</p>
            <div className="buttons">
              <button className="add" onClick={()=>{
                setCart(prev => [product, ...prev]);
              }}>Add to Cart ({
                cart.filter((item) => item.name === product.name).length
                })</button>
              <button onClick={()=>{
                setCart(prev => {
                  const index = prev.findIndex((item) => item.name === product.name);
                  if (index === -1) return prev;
                  const newCart = [...prev];
                  newCart.splice(index, 1);
                  return newCart;
                });
              }} className={`remove ${cart.filter((item) => item.name === product.name).length==0 ? 'disabled' : ''}`}><i className="fas fa-minus"></i></button>
            </div>
          </div>
        </div>
      ))}
    </main>
    <div className="cart">
      <div className="top">
        <img src="logo.png" alt="AquaTrek" />
        <h2><i className="fas fa-shopping-cart"></i><span>Cart</span></h2>
      </div>
      <div className="totals">
        <p><b>Items</b>: {cart.length}</p>
        <p><b>Total</b>: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
      </div>
      <div className="checkout">
        <button disabled={cart.length === 0}>Checkout</button>
      </div>
    </div>
    </>
  );
}

