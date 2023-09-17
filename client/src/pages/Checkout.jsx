import { useState } from "react";
import Cart from "../components/order/Cart";
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const [address, setAddress] = useState({});
  const items = useSelector((state) => state.cart.items);

  return (
    <div className="max-w-2xl mx-auto flex justify-evenly px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl gap-10">
      <div className="w-full">
        <h2 className="text-xl font-medium text-gray-900">
          Shipping Information
        </h2>
        <form className="mt-6 flex flex-col items-center gap-3">
          <div className="w-full">
            <label className="text-gray-700 font-medium" htmlFor="loaclity">
              Locality
            </label>
            <input
              value={address.locality}
              onChange={(e) =>
                setAddress({ ...address, locality: e.target.value })
              }
              className="p-2 border border-gray-500 rounded shadow w-full"
              type="text"
              id="loaclity"
            />
          </div>
          <div className="w-full">
            <label className="text-gray-700 font-medium" htmlFor="street">
              Street
            </label>
            <input
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              className="p-2 border border-gray-500 rounded shadow w-full"
              type="text"
              id="street"
            />
          </div>
          <div className="flex items-center justify-evenly w-full gap-3">
            <div className="w-full">
              <label className="text-gray-700 font-medium" htmlFor="landmark">
                Landmark
              </label>
              <input
                value={address.landmark}
                onChange={(e) =>
                  setAddress({ ...address, landmark: e.target.value })
                }
                className="p-2 border border-gray-500 rounded shadow w-full"
                type="text"
                id="landmark"
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700 font-medium" htmlFor="pincode">
                Pincode
              </label>
              <input
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                className="p-2 border border-gray-500 rounded shadow w-full"
                type="number"
                id="pincode"
              />
            </div>
          </div>
          <div className="flex items-center justify-evenly w-full gap-3">
            <div className="w-full">
              <label className="text-gray-700 font-medium" htmlFor="city">
                District
              </label>
              <input
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="p-2 border border-gray-500 rounded shadow w-full"
                type="text"
                id="city"
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700 font-medium" htmlFor="state">
                State
              </label>
              <input
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                className="p-2 border border-gray-500 rounded shadow w-full"
                type="text"
                id="state"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>

        <div className="mt-6 p-6">
          <Cart
            className="w-96"
            onCheckout={async () => {
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  address,
                  products: items,
                }),
              });

              if (response.status === 201) {
                const { url } = await response.json();
                window.location.href = url;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
