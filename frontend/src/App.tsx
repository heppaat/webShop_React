import { useEffect, useState } from "react";
import { getAllItems } from "./api";
import { Item } from "./modell";
import Items from "./components/Items";
import MyBag from "./components/MyBag";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showMyBag, setShowMyBag] = useState<boolean>(false);

  const handleAllItems = async () => {
    setLoading(true);
    const response = await getAllItems();
    setLoading(false);
    if (!response.success) {
      setError("Failed to fetch all items");
      return;
    }
    setItems(response.data);
  };

  useEffect(() => {
    handleAllItems();
  }, []);

  const toggleMyBag = () => {
    setShowMyBag((prev) => !prev);
  };

  return (
    <>
      <button className="border-2" onClick={toggleMyBag}>
        {showMyBag ? "Hide my bag" : "Show my bag"}
      </button>
      {showMyBag ? (
        <MyBag />
      ) : loading ? (
        <p>Loading all items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Items items={items} />
      )}
    </>
  );
}

export default App;
