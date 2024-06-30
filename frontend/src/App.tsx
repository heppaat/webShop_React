import { useState } from "react";
import { getAllItems } from "./api";
import { Item } from "./modell";

function App() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string>("");

  const handleAllItems = async () => {
    setError("");
    const response = await getAllItems();
    if (!response.success) {
      setError("Failed to fetch all Items");
      return;
    }
    setItems(response.data);
  };

  return (
    <>
      <div>
        <button className="border-4 py-2 px-4" onClick={handleAllItems}>
          Show items
        </button>
      </div>
      {items && (
        <div>
          {items.map((item, index) => (
            <div key={index}>
              <p>{item.title}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
}

export default App;
