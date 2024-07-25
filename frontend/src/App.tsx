import { useState } from "react";
import ItemsContainer from "./components/ItemsContainer";
import MyBagContainer from "./components/MyBagContainer";

function App() {
  const [showMyBag, setShowMyBag] = useState<boolean>(false);

  const toggleMyBag = () => {
    setShowMyBag((prev) => !prev);
  };

  return (
    <>
      <button className="border-2" onClick={toggleMyBag}>
        {showMyBag ? "Hide My Bag" : "Show My Bag"}
      </button>
      {showMyBag ? <MyBagContainer /> : <ItemsContainer />}
    </>
  );
}

export default App;
