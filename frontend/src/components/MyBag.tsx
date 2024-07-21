import { Item } from "../modell";

const MyBag = (props: {
  myBag: Item[];
  plusButtonClick: (item: Item) => void;
}) => {
  const { myBag, plusButtonClick } = props;
  return (
    <>
      {myBag.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <p>{item.counter}</p>
          <p>{item.price}</p>
          <button className="border-2" onClick={() => plusButtonClick(item)}>
            +
          </button>
          <button className="border-2">-</button>
        </div>
      ))}
    </>
  );
};

export default MyBag;
