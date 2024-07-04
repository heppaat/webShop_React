import { useEffect, useState } from "react";
import { getAllItems, getBagItems } from "./api";
import { Item, ErrorState } from "./modell";
import Items from "./components/Items";
import MyBag from "./components/MyBag";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [myBag, setMyBag] = useState<Item[]>([]);
  const [errors, setErrors] = useState<ErrorState>({ allItems: "", myBag: "" });
  const [loading, setLoading] = useState({ allItems: true, myBag: false });
  const [showMyBag, setShowMyBag] = useState<boolean>(false);

  const handleAllItems = async () => {
    setLoading((prev) => ({ ...prev, allItems: true }));
    const response = await getAllItems();
    setLoading((prev) => ({ ...prev, allItems: false }));
    if (!response.success) {
      setErrors((prev) => ({ ...prev, allItems: "Failed to fetch all items" }));
      return;
    }
    setItems(response.data);
  };

  const handleMyBag = async () => {
    setLoading((prev) => ({ ...prev, myBag: true }));
    const response = await getBagItems();
    setLoading((prev) => ({ ...prev, myBag: false }));
    if (!response.success) {
      setErrors((prev) => ({ ...prev, myBag: "Failed to fetch bag items" }));
      setShowMyBag(true);
      return;
    }
    setMyBag(response.data);
    setShowMyBag(true);
  };

  useEffect(() => {
    handleAllItems();
  }, []);

  return (
    <>
      <button className="border-2" onClick={handleMyBag}>
        My Bag
      </button>
      {showMyBag ? (
        loading.myBag ? (
          <p>Loading bag items...</p>
        ) : errors.myBag ? (
          <p>{errors.myBag}</p>
        ) : (
          <MyBag myBag={myBag} />
        )
      ) : loading.allItems ? (
        <p>Loading all items...</p>
      ) : errors.allItems ? (
        <p>{errors.allItems}</p>
      ) : (
        <Items items={items} />
      )}
    </>
  );
}

export default App;
