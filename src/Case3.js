import { useStore } from "./components/immerStore";
import { useState } from "react";

export const Case3 = () => {
  const data = useStore((state) => state.data);
  const getData = useStore((state) => state.fetchData);
  const getSomeData = useStore((state) => state.getSomeData);
  const mutateSomeData = useStore((state) => state.mutateSomeData);

  const handleClick = async () => {
    const result = await getData();
    console.log(
      "this would give you the previous data, which is reasonable, because the mutation happens in the same breath",
      result
    );
  };

  const [someData, setSomeData] = useState([]);
  const handleGetSomeData = () => {
    const some = getSomeData();
    console.log("here's some data!", some);
    setSomeData(some);
  };

  const handleMutateSomeData = () => {
    mutateSomeData();
  };

  return (
    <div style={{ border: "1px solid grey", padding: 20 }}>
      <h1>Component 3</h1>
      <button onClick={handleClick}>click me immer store!</button>

      <p>{data.length} rows</p>

      <button onClick={handleGetSomeData}>get 10 rows!</button>
      <ul>
        {someData.map((row) => {
          return (
            <li key={row.title} style={{ fontSize: 9 }}>
              {row.title}
            </li>
          );
        })}
      </ul>

      <button onClick={handleMutateSomeData}>mutate data!</button>
    </div>
  );
};
