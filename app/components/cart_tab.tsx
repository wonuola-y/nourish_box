"use client";
import React, { useState } from "react";
import dustbin from "../assets/icons8-trash-can-26.png";
import pottage from "../assets/chicken.png";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { CartItem } from "../utils/types/cart.tyes";
import { CircularProgress } from "@mui/material";
import { useCheckoutNavigation } from "../utils/checkout.utils";

const Cart_tab = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    loading,
    isItemLoading,
  } = useCart();

  const { goToCheckout } = useCheckoutNavigation();

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <CircularProgress size={24} />
        <p className="text-gray-600 mt-2">Loading cart...</p>
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const totalPrice = getTotalPrice();

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center">
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-end items-center h-96">
            <h2 className="my-6 text-xl font-inter font-semibold">
              Cart is empty
            </h2>
            <Link
              href="/recipes"
              className="bg-orange-500 py-2 px-4 text-white rounded-lg font-inter"
            >
              Add recipes to cart
            </Link>
          </div>
        ) : (
          cartItems.map((item: CartItem) => {
            const itemLoading = isItemLoading(item.id);
            return (
              <div
                className={`border-[1px] border-solid rounded-lg py-2 relative my-2 border-gray-300 text-gray-600 w-11/12 ${
                  itemLoading ? "opacity-70" : ""
                }`}
                key={item.id}
              >
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="w-3/5 flex items-center">
                    <div className="relative">
                      {item.displayMedia.type === "video" ? (
                        <div className="relative w-[40px] h-[60px] rounded-md overflow-hidden">
                          <div className="absolute inset-0 bg-black">
                            <Image
                              src={item.displayMedia.url}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                              <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-[40px] h-[60px] rounded-md overflow-hidden">
                          <Image
                            src={item.displayMedia.url}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      )}
                      {itemLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-md">
                          <CircularProgress size={16} />
                        </div>
                      )}
                    </div>
                    <div className="mx-3">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm">
                        NGN {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-xl border-[1px] border-gray-400 flex p-1 w-[100px] my-2 text-gray-500 justify-center mr-2 relative">
                      {itemLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-xl">
                          <CircularProgress size={14} />
                        </div>
                      )}
                      <button
                        className="mr-4"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        disabled={item.quantity <= 1 || itemLoading}
                      >
                        -
                      </button>
                      <p className="font-inter text-center">{item.quantity}</p>
                      <button
                        className="ml-4"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        disabled={itemLoading}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="hover:opacity-70 transition-opacity relative"
                      disabled={itemLoading}
                    >
                      {itemLoading ? (
                        <CircularProgress size={15} />
                      ) : (
                        <Image
                          src={dustbin}
                          alt="trash can"
                          width={15}
                          height={15}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="flex flex-col">
          {/* Total Price */}
          <div className="px-5 py-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">
                Total:
              </span>
              <span className="text-xl font-bold text-gray-900">
                NGN {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between px-5 py-4">
            <button
              className="w-[200px] px-5 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition-colors flex items-center justify-center"
              onClick={handleClearCart}
              disabled={cartItems.some((item) => isItemLoading(item.id))}
            >
              {cartItems.some((item) => isItemLoading(item.id)) ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Clear cart"
              )}
            </button>
            <button
              onClick={goToCheckout}
              className="w-[200px] px-5 py-2 rounded-md bg-orange-400 text-white hover:bg-orange-500 transition-colors flex items-center justify-center"
              disabled={cartItems.some((item) => isItemLoading(item.id))}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart_tab;
