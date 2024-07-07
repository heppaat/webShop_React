import { useState, useEffect } from "react";
import { Item } from "../modell";
import { getBagItems } from "../api";

const MyBag = () => {
  const [myBag, setMyBag] = useState<Item[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleMyBag = async () => {
    setLoading(true);
    const response = await getBagItems();
    setLoading(false);
    if (!response.success) {
      setError("Failed to fetch bag items");
      return;
    }
    setMyBag(response.data);
  };

  useEffect(() => {
    handleMyBag();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading bag items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {myBag.map((item, index) => (
            <div key={index}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <button className="border-2">+</button>
              <button className="border-2">-</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyBag;
