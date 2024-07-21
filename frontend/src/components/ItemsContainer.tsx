import { useEffect, useState } from "react";
import { Item } from "../modell";
import { getAllItems } from "../api";
import Items from "./Items";

const ItemsContainer = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllItems = async () => {
    setLoading(true);
    setError("");
    const response = await getAllItems();
    setLoading(false);
    if (!response.success) {
      setError("Failed to fetch all items");
      return;
    }
    setItems(response.data);
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading all items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Items items={items} />
      )}
    </>
  );
};

export default ItemsContainer;
