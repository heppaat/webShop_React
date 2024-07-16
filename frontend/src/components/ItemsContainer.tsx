import { useEffect, useState } from "react";
import { Item } from "../modell";
import Items from "./Items";
import { getAllItems } from "../api";

const ItemsContainer = (props: { addToBag: (item: Item) => void }) => {
  const { addToBag } = props;
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <>
      {loading ? (
        <p>Loading all items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Items items={items} addToBag={addToBag} />
      )}
    </>
  );
};

export default ItemsContainer;
