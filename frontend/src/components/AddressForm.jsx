import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../features/address/addressSlice";
import { toast } from "react-toastify";

function AddressForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    street: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isEmpty = Object.values(form).some((val) => val.trim() === "");

    if (isEmpty) {
      toast.error("Please fill all the fields");
      return;
    }

    dispatch(addAddress(form));
    setForm({
      name: "",
      phone: "",
      pincode: "",
      city: "",
      state: "",
      street: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md space-y-4 max-w-xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-2">Add Delivery Address</h2>

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
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Address
      </button>
    </form>
  );
}

export default AddressForm;
