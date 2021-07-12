import { useStore } from "./components/simpleStore";
import { useEffect } from "react";

export const Case1 = () => {
  const data = useStore((state) => state.data);
  const getData = useStore((state) => state.fetchData);
  const getSomeData = useStore((state) => state.getSomeData);

  const handleClick = () => {
    getData();
  };

  return (
    <div style={{ border: "1px solid grey", padding: 20 }}>
      <h1>Component 1</h1>
      <button onClick={handleClick}>click me simple store!</button>

      <p>{data.length} rows</p>
      <ul>
        {getSomeData().map((row) => {
          return (
            <li key={row.title} style={{ fontSize: 9 }}>
              {row.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
