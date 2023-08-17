import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from '../../store';
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
  
function CreateOrder() {
  // const username = useSelector(state => state.user.username);
  const [withPriority, setWithPriority] = useState(false);
  const {username, status : addressState, position, address, error : errorAddress} = useSelector((state)=> state.user)
  const isLoadingAddress = addressState === "loading"
  const navigate = useNavigation();
  const isSubmitting = navigate.state === 'submitting';
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice)

  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input 
          className="input grow" 
          type="text"
          name="customer" 
          defaultValue={username} 
          required  
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">   
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          {formErrors?.phone && <p className="mt-2 text-xs text-red-700 rounded-full">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input" type="text" name="address" disabled={isLoadingAddress} defaultValue={address} required />
            {addressState === "error" && <p className="mt-2 text-xs text-red-700 rounded-full">{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitude && (
          <span className="absolute right-[3px]">
          <Button disabled={isLoadingAddress} type="small" onClick={(e)=> {
            e.preventDefault();
            dispatch(fetchAddress());
            }
            }>get position</Button>
          </span>
          )
          }
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked) 
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude},${position.longitude}` : ""}/>
          <Button disabled={isSubmitting || isLoadingAddress} type="small">
            {isSubmitting ? "Placing Order" : `Order now ${formatCurrency(totalCartPrice)}`}</Button>   
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart : JSON.parse(data.cart),
    priority : data.priority === "on",
  }

  console.log(order);
  const errors = {};
  if(!isValidPhone(order.phone)) errors.phone = "Please give us your correct phone number. We might need it to contact you"
  if(Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  //DO not over use
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
