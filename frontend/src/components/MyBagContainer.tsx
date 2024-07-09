import { useState, useEffect } from "react";
import { Item } from "../modell";
import { getBagItems } from "../api";
import MyBag from "./MyBag";

const MyBagContainer = () => {
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
        <MyBag myBag={myBag} />
      )}
    </>
  );
};

export default MyBagContainer;
