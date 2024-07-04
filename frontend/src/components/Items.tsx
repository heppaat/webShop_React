import { Item } from "../modell";

const Items = (props: { items: Item[] }) => {
  const { items } = props;

  return (
    <>
      {items && (
        <div>
          {items.map((item, index) => (
            <div key={index}>
              <h1 className="bg-[red]">{item.title}</h1>
              <p>{item.description}</p>
              <button className="border-2">Add to bag</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Items;
