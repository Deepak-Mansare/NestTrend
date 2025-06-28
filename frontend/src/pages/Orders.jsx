import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

function Orders() {
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/order/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(data.orders);
    } catch (err) {
      toast.error("Failed to load orders");
      console.log(err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/order/user/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("Order deleted");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to delete order");
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [user?.token]);

  if (!orders.length) {
    return <p className="text-center mt-10 text-gray-600">No orders yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-6">
        {[...orders].reverse().map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-5 shadow-sm bg-white"
          >
            <p className="text-gray-700 mb-2">
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Status:</strong> {order.orderStatus}{" "}
              <strong>Payment:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Total:</strong> ₹
              {order.totalPrice.toLocaleString("en-IN")}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            {order.shippingAddress && (
              <p className="mt-2 text-sm text-gray-600">
                <strong>Shipping:</strong> {order.shippingAddress.street},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
            )}
            <div className="mt-4 space-y-2">
              {order.products.map((p) => (
                <div
                  key={p.productId?._id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {p.productId?.title}(x{p.quantity})
                  </span>
                  <span>₹{p.productId?.price.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => deleteOrder(order._id)}
              className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
