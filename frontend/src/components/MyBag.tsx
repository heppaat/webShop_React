import { Item } from "../modell";

const MyBag = (props: { myBag: Item[]; addToBag: (item: Item) => void }) => {
  const { myBag, addToBag } = props;
  return (
    <>
      {myBag.map((item, index) => (
        <div key={index}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <p>{item.counter}</p>
          <p>{item.price}</p>
          <button className="border-2" onClick={() => addToBag(item)}>
            +
          </button>
          <button className="border-2">-</button>
        </div>
      ))}
    </>
  );
};

export default MyBag;
