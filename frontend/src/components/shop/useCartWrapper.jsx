import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./CartItemsContent";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems?.length > 0
      ? cartItems.reduce(
          (sum, item) =>
            sum +
            (item.salePrice > 0 ? item.salePrice : item.price) *
              item.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md bg-white dark:bg-gray-800 shadow-lg flex flex-col p-6">
      <SheetHeader>
        <SheetTitle className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          Your Cart
        </SheetTitle>
      </SheetHeader>

      <div className="mt-4 flex-1 overflow-auto space-y-4">
        {cartItems?.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent cartItem={item} key={item.productId} />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Your cart is empty!
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-2">
          <span className="font-bold text-gray-800 dark:text-gray-200">
            Total:
          </span>
          <span className="font-bold text-gray-800 dark:text-gray-200">
            ${totalCartAmount.toFixed(2)}
          </span>
        </div>

        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full py-3 text-white font-semibold rounded-md transition"
          disabled={cartItems?.length === 0}
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
