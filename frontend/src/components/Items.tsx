import { Item } from "../modell";

const Items = (props: { items: Item[]; addToBag: (item: Item) => void }) => {
  const { items, addToBag } = props;

  return (
    <>
      {items && (
        <div>
          {items.map((item, index) => (
            <div key={index}>
              <h1 className="bg-[red]">{item.title}</h1>
              <p>{item.description}</p>
              <button onClick={() => addToBag(item)} className="border-2">
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
