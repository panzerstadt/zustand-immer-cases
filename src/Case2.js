import { useStore } from "./components/wrappedStore";
import { useEffect, useState } from "react";

export const Case2 = () => {
  const data = useStore((state) => state.data);
  const getData = useStore((state) => state.fetchData);
  const getSomeData = useStore((state) => state.getSomeData);
  const mutateSomeData = useStore((state) => state.mutateSomeData);

  const handleClick = () => {
    getData();
  };

  const [someData, setSomeData] = useState([]);
  const handleGetSomeData = async () => {
    const some = await getSomeData();
    console.log("here's some data!", some);
    setSomeData(some);
  };

  const handleMutateSomeData = () => {
    mutateSomeData();
  };

  return (
    <div style={{ border: "1px solid grey", padding: 20 }}>
      <h1>Component 2</h1>
      <button onClick={handleClick}>click me wrapped store!</button>

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
