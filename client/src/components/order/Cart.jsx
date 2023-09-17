import { TbPlus, TbMinus, TbTrash } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearFromCart,
  removeFromCart,
} from "../../redux/reducers/cart";
import { Link } from "react-router-dom";

function CartProduct({ productId, quantity }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const product = products.find((product) => product._id === productId);

  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-24 h-24">
        {product?.images?.[0] ? (
          <>
            <img
              src={product?.images[0]}
              alt={product?.name}
              className="h-full w-full object-cover object-center rounded"
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full w-full object-cover object-center bg-gray-400 rounded">
            <h3 className="text-center text-gray-500 font-semibold">
              No Image
            </h3>
          </div>
        )}
      </div>

      <div className="w-[65%] h-24 flex flex-col  justify-evenly">
        <h3 className="font-semibold text-gray-700 text-lg">
          {product?.title ?? "No Title"}
        </h3>

        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <TbMinus
              onClick={() =>
                dispatch(removeFromCart({ product: product?._id, quantity: 1 }))
              }
              className="text-gray-500 cursor-pointer"
            />
            <p className="text-gray-700 font-semibold">{quantity}</p>
            <TbPlus
              onClick={() =>
                dispatch(addToCart({ product: product?._id, quantity: 1 }))
              }
              className="text-gray-500 cursor-pointer"
            />
          </div>

          <TbTrash
            onClick={() => dispatch(clearFromCart({ product: product?._id }))}
            className="text-gray-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default function Cart({ className = "", onCheckout }) {
  const cart = useSelector((state) => state.cart.items);

  return (
    <div
      className={
        className + " bg-white rounded shadow p-4 flex flex-col justify-between"
      }
    >
      <div className="divide-y divide-gray-100">
        {cart.map((item) => (
          <CartProduct
            key={item.product}
            productId={item.product}
            quantity={item.quantity}
          />
        ))}
      </div>

      <Link
        to="/checkout"
        onClick={() => onCheckout?.()}
        className="bg-gray-100 hover:bg-gray-200 py-2 w-full text-center rounded shadow font-semibold"
      >
        Checkout
      </Link>
    </div>
  );
}
