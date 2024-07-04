import { Item } from "../modell";

const MyBag = (props: { myBag: Item[] }) => {
  const { myBag } = props;
  return (
    <>
      {myBag.map((item, index) => (
        <div key={index}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <button className="border-2">+</button>
          <button className="border-2">-</button>
        </div>
      ))}
    </>
  );
};

export default MyBag;
