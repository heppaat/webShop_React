import { useState } from "react";
import { addToBag } from "./api";
import ItemsContainer from "./components/ItemsContainer";
import MyBagContainer from "./components/MyBagContainer";
import { Item } from "./modell";

function App() {
  const [showMyBag, setShowMyBag] = useState<boolean>(false);

  const toggleMyBag = () => {
    setShowMyBag((prev) => !prev);
  };

  const handleAddToBag = async (item: Item) => {
    const response = await addToBag(item);
    if (!response.success) return;
  };

  return (
    <>
      <button className="border-2" onClick={toggleMyBag}>
        {showMyBag ? "Hide my bag" : "Show my bag"}
      </button>
      {showMyBag ? (
        <MyBagContainer addToBag={handleAddToBag} />
      ) : (
        <ItemsContainer addToBag={handleAddToBag} />
      )}
    </>
  );
}

export default App;
