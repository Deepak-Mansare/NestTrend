import { API } from "../app/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses, deleteAddress } from "../features/address/addressSlice";
import {
  loadSelectedAddressFromStorage,
  setSelectedAddress,
} from "../features/address/selectedAddressSlice";
import AddressForm from "../components/AddressForm";
import { placeOrder } from "../features/orders/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addresses, loading } = useSelector((state) => state.address);
  const user = useSelector((state) => state.user.user);
  const selectedAddressId = useSelector((state) => state.selectedAddress.id);
  const cartItems = useSelector((state) => state.cart.items);

  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    if (user?.token) {
      dispatch(getAddresses()).then((res) => {
        const ids = res.payload?.map((addr) => addr._id) || [];
        dispatch(loadSelectedAddressFromStorage(ids));
      });
    }
  }, [user?.token, dispatch]);

  const handleSelect = (id) => {
    dispatch(setSelectedAddress(id));
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddress(id));
    }
  };

  const handleProceedToPayment = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    const selectedAddressObj = addresses.find(
      (addr) => addr._id === selectedAddressId
    );
    if (!selectedAddressObj) {
      toast.error("Selected address is no longer valid");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const discount = totalPrice * 0.1;
    const grandTotal = totalPrice - discount;

    const payload = {
      products: cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      addressId: selectedAddressId,
      grandTotal,
      token: user.token,
    };

    try {
      const res = await dispatch(placeOrder(payload));
      const appOrderId = res.payload?._id;

      if (!appOrderId) {
        toast.error("Order placement failed");
        return;
      }

      const { data } = await axios.post(
        `${API}/payment/create-order`,
        { amount: grandTotal },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const order = data.order;
      if (!order) {
        toast.error("Failed to create Razorpay order");
        return;
      }

      const options = {
        key: "rzp_test_zcFL6H21DLylZm",
        amount: order.amount,
        currency: "INR",
        name: "NestTrend",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${API}/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: order.amount / 100,
                appOrderId,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );

            if (verifyRes.data.success) {
              toast.success("Payment Successful");
              dispatch(clearCart());
              navigate("/orders");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Error verifying payment");
            console.log(err);
          }
        },
        prefill: {
          name: user?.name || "NestTrend User",
          email: user?.email || "user@example.com",
          contact: user?.phone || "9000000000",
        },
        theme: {
          color: "#10b981",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Payment Failed");
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <AddressForm editAddress={editAddress} setEditAddress={setEditAddress} />

      <div>
        <h2 className="text-lg font-semibold mb-2">Select Delivery Address</h2>

        {loading ? (
          <p className="text-gray-500">Loading Saved Addresses...</p>
        ) : addresses.length === 0 ? (
          <p className="text-gray-500">No addresses saved yet</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <label
                key={addr._id}
                className={`block border p-4 pr-24 rounded relative cursor-pointer ${
                  selectedAddressId === addr._id ? "border-blue-500" : ""
                }`}
              >
                <div className="flex items-start gap-2">
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddressId === addr._id}
                    onChange={() => handleSelect(addr._id)}
                    className="mt-1"
                  />
                  <div className="space-y-1 text-sm">
                    <div className="font-medium">{addr.name}</div>
                    <div>{addr.street || addr.addressLine}</div>
                    <div>
                      {addr.city}, {addr.state} – {addr.pincode}
                    </div>
                    <div className="text-gray-600">Ph: {addr.phone}</div>
                  </div>
                </div>

                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setEditAddress(addr);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(addr._id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleProceedToPayment}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Proceed to payment
      </button>
    </div>
  );
}

export default Checkout;
