


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiateRazorpayOrder, capturePayment } from "../../slices/orderSlice";
import Address from "@/components/shop/Address";
import UserCartItemsContent from "@/components/shop/CartItemsContent";
import { Button } from "@/components/ui/button";
import img from "../../assets/account.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearCart } from "@/slices/cartSlice";

function Checkout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  console.log(cartItems, "ppppppppppppppppppppppppppp")


  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [isPaymentVerifying, setIsPaymentVerifying] = useState(false);


  // Calculate total amount in cart
  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
        (sum, item) =>
          sum +
          (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
        0
      )
      : 0;

  // Load Razorpay checkout script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Trigger Razorpay payment flow
  async function handleInitiateRazorpayPayment() {
    console.log(cartItems, "-----------------------")
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed",
      );
      return;
    }

    if (!currentSelectedAddress) {
      toast.error("Please select one address to proceed.",
      );
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      toast.error("Razorpay SDK failed to load. Check your internet connection.",
      );
      return;
    }

    setIsPaymentStart(true);

    const orderData = {
      userId: user?.id,
      cartId: cartItems._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
    };

    try {
      const resultAction = await dispatch(initiateRazorpayOrder(orderData));
      if (resultAction.payload && resultAction.payload.orderId) {
        const { razorpayOrderId, amount, currency, } = resultAction.payload;


        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY, // Razorpay key from backend
          amount: amount * 100, // amount in paise (multiply by 100)
          currency: currency,
          name: "Your Shop Name",
          description: "Order Payment",
          order_id: razorpayOrderId,
          handler: async function (response) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            console.log("res:==============>", response)

            // Save the order ID temporarily
            sessionStorage.setItem("currentOrderId", resultAction.payload.orderId);

            // Dispatch capturePayment with Razorpay details
            try {
              setIsPaymentVerifying(true); // 🔹 Start loader

              const result = await dispatch(
                capturePayment({
                  paymentId: razorpay_payment_id,
                  orderId: resultAction.payload.orderId,
                  razorpaySignature: razorpay_signature,
                  razorpayOrderId: razorpay_order_id,
                })
              );

              if (result?.payload?.success) {
                dispatch(clearCart());
                sessionStorage.removeItem("currentOrderId");
                navigate("/shop/payment-success");
              } else {
                toast.error("Payment verification failed. Please contact support.");
              }
            } catch (error) {
              toast.error("Payment verification error occurred.");
            } finally {
              setIsPaymentVerifying(false); // 🔹 Stop loader
            }
          }
          ,
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: currentSelectedAddress?.phone,
          },
          theme: {
            color: "#3399cc",
          },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      toast.error("Failed to create order. Please try again.",
      );
    }
  } catch (error) {
    toast.error("Payment failed. Please try again later.",
    );
  } finally {
    setIsPaymentStart(false);
  }
}

if (isPaymentVerifying) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-lg font-bold">Verifying your payment...</div>
    </div>
  );
}

return (
  <div className="flex flex-col">
    <div className="relative h-[300px] w-full overflow-hidden">
      <img src={img} alt="account" className="h-full w-full object-cover object-center" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
      <Address
        selectedId={currentSelectedAddress}
        setCurrentSelectedAddress={setCurrentSelectedAddress}
      />
      <div className="flex flex-col gap-4">
        {cartItems?.items?.length > 0 &&
          cartItems.items.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)}

        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount}</span>
          </div>
        </div>

        <div className="mt-4 w-full">

          {cartItems?.items?.length > 0 &&
            <Button onClick={handleInitiateRazorpayPayment} disabled={isPaymentStart} className="w-full">
              {isPaymentStart ? "Processing Razorpay Payment..." : "Checkout with Razorpay"}
            </Button>
          }

        </div>
      </div>
    </div>
  </div>
);
}

export default Checkout;
