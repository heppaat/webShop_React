import { Item } from "../modell";
import { addToBag } from "../api";

const Items = (props: { items: Item[] }) => {
  const { items } = props;

  return (
    <>
      {items && (
        <div>
          {items.map((item) => (
            <div key={item.id}>
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
