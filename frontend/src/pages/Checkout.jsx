import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../features/address/addressSlice";
import AddressForm from "../components/AddressForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses, loading } = useSelector((state) => state.address);
  const user = useSelector((state) => state.user);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    if (user?.token) {
      dispatch(getAddresses());
    }
  }, [dispatch, user]);

  const handleSelect = (id) => {
    setSelectedAddressId(id);
  };

  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    // 🔁 Later: Store selectedAddressId in Redux or localStorage if needed
    // 🔁 Next: Integrate Razorpay and place order using this address
    // You can now navigate to a Payment Page or call Razorpay directly here
    // Example: navigate("/payment")

    console.log("Proceeding to payment with address ID:", selectedAddressId);
    toast.success("Ready to integrate payment here");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <AddressForm />

      <div>
        <h2 className="text-lg font-semibold mb-2">Select Delivery Address</h2>

        {loading ? (
          <p className="text-gray-500">Loading Saved Addresses...</p>
        ) : !Array.isArray(addresses) && addresses.length === 0 ? (
          <p className="text-gray-500">No addresses saved yet</p>
        ) : (
          <div className="space-y-3">
            {Array.isArray(addresses) ||
              addresses.map((addr) => (
                <label
                  key={addr._id}
                  className={`block border p-3 rounded cursor-pointer ${
                    selectedAddressId === addr._id ? "border-blue-500" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddressId === addr._id}
                    onChange={() => handleSelect(addr._id)}
                    className="mr-2"
                  />
                  <span>
                    <strong>{addr.name}</strong>,{addr.street}, {addr.city},{" "}
                    {addr.state} - {addr.pincode}, ph: {addr.phone}
                  </span>
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
