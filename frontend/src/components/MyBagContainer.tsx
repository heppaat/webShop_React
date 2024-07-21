import { useState, useEffect } from "react";
import { Item } from "../modell";
import { addToBag, getBagItems } from "../api";
import MyBag from "./MyBag";

const MyBagContainer = () => {
  const [myBag, setMyBag] = useState<Item[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBagItems = async () => {
    setLoading(true);
    setError("");
    const response = await getBagItems();
    setLoading(false);
    if (!response.success) {
      setError("Failed to fetch bag items");
      return;
    }
    setMyBag(response.data);
  };

  useEffect(() => {
    fetchBagItems();
  }, []);

  const handlePlusButton = async (item: Item) => {
    const response = await addToBag(item);
    if (!response.success) return;
    await fetchBagItems();
  };

  return (
    <>
      {loading ? (
        <p>Loading bag items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MyBag myBag={myBag} plusButtonClick={handlePlusButton} />
      )}
    </>
  );
};

export default MyBagContainer;
