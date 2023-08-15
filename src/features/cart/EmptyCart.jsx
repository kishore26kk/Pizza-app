import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="my-7">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <p className="font-semibold mt-5">Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
