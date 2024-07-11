import { Item } from "../modell";
import { addToBag } from "../api";

const Items = (props: { items: Item[] }) => {
  const { items } = props;

  const handleAddToBag = async (item: Item) => {
    const response = await addToBag(item);
    if (!response.success) return;
  };

  return (
    <>
      {items && (
        <div>
          {items.map((item, index) => (
            <div key={index}>
              <h1 className="bg-[red]">{item.title}</h1>
              <p>{item.description}</p>
              <button onClick={() => handleAddToBag(item)} className="border-2">
                Add to bag
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Items;
