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
      <div className="flex flex-wrap gap-8 p-10 justify-center">
        {myBag.map((item) => (
          <div
            key={item.id}
            className="bg-[#f0f0f0] shadow-lg rounded-lg p-4 w-60"
          >
            <h1 className="bg-[red]">{item.title}</h1>
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
      </div>
    </>
  );
};

export default MyBag;
