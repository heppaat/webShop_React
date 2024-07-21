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
        {showMyBag ? "Hide my bag" : "Show my bag"}
      </button>
      {showMyBag ? <MyBagContainer /> : <ItemsContainer />}
    </>
  );
}

export default App;
