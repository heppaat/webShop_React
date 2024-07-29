import { Item } from "../modell";
import { addToBag } from "../api";
import { useState } from "react";

const Items = (props: { items: Item[] }) => {
  const { items } = props;

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleSelectItem = (item: Item) => {
    setSelectedItem(item);
  };

  const handleAddToBag = (item: Item, event: React.MouseEvent) => {
    event.stopPropagation();
    addToBag(item);
  };

  return (
    <>
      {items && !selectedItem && (
        <div className="flex flex-wrap gap-8 p-10 justify-center">
          {items.map((item) => (
            <div
              onClick={() => handleSelectItem(item)}
              key={item.id}
              className="bg-[#f0f0f0] shadow-lg rounded-lg p-4 w-60"
            >
              <h1 className="bg-[red]">{item.title}</h1>
              <p className="break-words">{item.description}</p>
              <button
                onClick={(event) => handleAddToBag(item, event)}
                className="border-2"
              >
                Add to bag
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedItem && (
        <div>
          <h1>{selectedItem.title}</h1>
          <p>{selectedItem.description}</p>
          <button className="border-2" onClick={() => setSelectedItem(null)}>
            Back To Home Page
          </button>
        </div>
      )}
    </>
  );
};

export default Items;
