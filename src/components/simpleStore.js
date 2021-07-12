import create from "zustand";

export const useStore = create((set, get) => ({
  data: [],
  fetchData: async () => {
    const result = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((res) => res.json());
    const prevResult = get().data;
    set({ data: [...prevResult, ...result] });
  },
  getSomeData: () => {
    return get().data.slice(0, 10);
  },
}));
