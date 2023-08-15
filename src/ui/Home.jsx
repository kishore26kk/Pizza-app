import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
// import Button from "./Button";

function Home() {
  const username = useSelector(state => state.user.username)
  console.log(username)
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="text-xl text-stone-700 font-semibold mb-8 md:text-3xl px-4">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ):(
        <Button to="/menu" type="primary">Continue ordering, {username}</Button>
      )}
    </div>
  );
}

export default Home;