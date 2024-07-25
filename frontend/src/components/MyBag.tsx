import { Item } from "../modell";

const MyBag = (props: {
  myBag: Item[];
  plusButtonClick: (item: Item) => void;
  minusButtonClick: (id: number) => void;
  clearMyBag: () => void;
}) => {
  const { myBag, plusButtonClick, minusButtonClick, clearMyBag } = props;

  return (
    <>
      <div>
        <button className="border-2" onClick={clearMyBag}>
          Clear My Bag
        </button>
      </div>
      {myBag.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <p>{item.counter}</p>
          <p>{item.price}</p>
          <button className="border-2" onClick={() => plusButtonClick(item)}>
            +
          </button>
          <button
            className="border-2"
            onClick={() => minusButtonClick(item.id)}
          >
            -
          </button>
        </div>
      ))}
    </>
  );
};

export default MyBag;
