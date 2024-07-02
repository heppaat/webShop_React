import { useEffect, useState } from "react";
import { getAllItems } from "./api";
import { Item } from "./modell";
import Items from "./components/Items";

function App() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string>("");

  const handleAllItems = async () => {
    setError("");
    const response = await getAllItems();
    if (!response.success) {
      setError("Failed to fetch all Items");
      setItems([]);
      return;
    }
    setItems(response.data);
  };

  useEffect(() => {
    handleAllItems();
  }, []);

  let content;
  if (items === null) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    content = <Items items={items} />;
  }
  return <>{content}</>;
}

export default App;
