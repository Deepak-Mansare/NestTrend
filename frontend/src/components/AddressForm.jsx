import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  getAddresses,
  updateAddress,
} from "../features/address/addressSlice";
import { toast } from "react-toastify";

function AddressForm({ editAddress, setEditAddress }) {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    street: "",
  });

  useEffect(() => {
    if (editAddress) {
      setForm({
        name: editAddress.name || "",
        phone: editAddress.phone || "",
        pincode: editAddress.pincode || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        street: editAddress.street || "",
      });
    }
  }, [editAddress]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  if (!editAddress && addresses.length > 3) {
    return (
      <div className="text-red-600 font-medium">
        You can only save 3 addresses. Delete one to add a new one
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isEmpty = Object.values(form).some((val) => val.trim() === "");
    if (isEmpty) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      if (editAddress) {
        await dispatch(
          updateAddress({ id: editAddress._id, formData: form })
        ).unwrap();
        setEditAddress(null);
      } else {
        await dispatch(addAddress(form)).unwrap();
        toast.success("Addres added");
      }
      setForm({
        name: "",
        phone: "",
        pincode: "",
        city: "",
        state: "",
        street: "",
      });
      dispatch(getAddresses());
    } catch (err) {
      toast.error("Failed to save address", err);
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md space-y-4 max-w-xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-2">
        {editAddress ? "Edit Address" : "Add Delivery Address"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={form.pincode}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <textarea
        name="street"
        placeholder="Street / Full Address"
        rows={3}
        value={form.street}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      ></textarea>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editAddress ? "Update Address" : "Save Address"}
        </button>

        {editAddress && (
          <button
            type="button"
            onClick={() => {
              setEditAddress(null);
              setForm({
                name: "",
                phone: "",
                pincode: "",
                city: "",
                state: "",
                street: "",
              });
            }}
            className="text-gray-600 underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddressForm;
