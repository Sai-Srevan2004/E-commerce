// import Address from "@/components/shopping-view/address";
// import img from "../../assets/account.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { createNewOrder } from "@/store/shop/order-slice";
// import { Navigate } from "react-router-dom";
// import { useToast } from "@/components/ui/use-toast";

// function ShoppingCheckout() {
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const { approvalURL } = useSelector((state) => state.shopOrder);
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const [isPaymentStart, setIsPaymemntStart] = useState(false);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   console.log(currentSelectedAddress, "cartItems");

//   const totalCartAmount =
//     cartItems && cartItems.items && cartItems.items.length > 0
//       ? cartItems.items.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//   function handleInitiatePaypalPayment() {
//     if (cartItems.length === 0) {
//       toast({
//         title: "Your cart is empty. Please add items to proceed",
//         variant: "destructive",
//       });

//       return;
//     }
//     if (currentSelectedAddress === null) {
//       toast({
//         title: "Please select one address to proceed.",
//         variant: "destructive",
//       });

//       return;
//     }

//     const orderData = {
//       userId: user?.id,
//       cartId: cartItems?._id,
//       cartItems: cartItems.items.map((singleCartItem) => ({
//         productId: singleCartItem?.productId,
//         title: singleCartItem?.title,
//         image: singleCartItem?.image,
//         price:
//           singleCartItem?.salePrice > 0
//             ? singleCartItem?.salePrice
//             : singleCartItem?.price,
//         quantity: singleCartItem?.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress?._id,
//         address: currentSelectedAddress?.address,
//         city: currentSelectedAddress?.city,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "paypal",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//     };

//     dispatch(createNewOrder(orderData)).then((data) => {
//       console.log(data, "sangam");
//       if (data?.payload?.success) {
//         setIsPaymemntStart(true);
//       } else {
//         setIsPaymemntStart(false);
//       }
//     });
//   }

//   if (approvalURL) {
//     window.location.href = approvalURL;
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="relative h-[300px] w-full overflow-hidden">
//         <img src={img} className="h-full w-full object-cover object-center" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
//         <Address
//           selectedId={currentSelectedAddress}
//           setCurrentSelectedAddress={setCurrentSelectedAddress}
//         />
//         <div className="flex flex-col gap-4">
//           {cartItems && cartItems.items && cartItems.items.length > 0
//             ? cartItems.items.map((item) => (
//                 <UserCartItemsContent cartItem={item} />
//               ))
//             : null}
//           <div className="mt-8 space-y-4">
//             <div className="flex justify-between">
//               <span className="font-bold">Total</span>
//               <span className="font-bold">${totalCartAmount}</span>
//             </div>
//           </div>
//           <div className="mt-4 w-full">
//             <Button onClick={handleInitiatePaypalPayment} className="w-full">
//               {isPaymentStart
//                 ? "Processing Razorpay Payment..."
//                 : "Checkout with RazorPay"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCheckout;



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiateRazorpayOrder, capturePayment } from "@/store/shop/order-slice";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import img from "../../assets/account.jpg";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

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
    if (!cartItems || cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      toast({
        title: "Razorpay SDK failed to load. Check your internet connection.",
        variant: "destructive",
      });
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

            console.log("res:==============>",response)

            // Save the order ID temporarily
            sessionStorage.setItem("currentOrderId", resultAction.payload.orderId);

            // Dispatch capturePayment with Razorpay details
            try {
              const result = await dispatch(
                capturePayment({
                  paymentId: razorpay_payment_id,
                  orderId: resultAction.payload.orderId,
                  razorpaySignature: razorpay_signature,
                  razorpayOrderId: razorpay_order_id,
                })
              );
               console.log(result,"0000000000000000000")
              if (result?.payload?.success) {
                
                sessionStorage.removeItem("currentOrderId");
                window.location.href = "/shop/payment-success"; // or /shop/payment-success
              } else {
                toast({
                  title: "Payment verification failed. Please contact support.",
                  variant: "destructive",
                });
              }
            } catch (error) {
              toast({
                title: "Payment verification error occurred.",
                variant: "destructive",
              });
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
        toast({
          title: "Failed to create order. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Payment failed. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsPaymentStart(false);
    }
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
            <Button onClick={handleInitiateRazorpayPayment} disabled={isPaymentStart} className="w-full">
              {isPaymentStart ? "Processing Razorpay Payment..." : "Checkout with Razorpay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
