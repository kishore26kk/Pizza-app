// eslint-disable-next-line react/prop-types
import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";

const UpdateItemQuantity = ({pizzaId, currentQuantity}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3"> 
        <Button type="round" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        <span className="text-sm font-medium">{currentQuantity}</span>
        <Button type="round" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  )
}

export default UpdateItemQuantity