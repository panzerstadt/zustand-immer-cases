import createHook from "zustand";

function create(state) {
  const useStore = createHook((set, get) => {
    const zustandState = {};
    Object.entries(state).forEach(([key, value]) => {
      if (typeof value === "function") {
        // split function by async or non-async here.
        // because if function is not async, i don't wanna
        // have to await it anyways
        if (value.constructor.name === "AsyncFunction") {
          zustandState[key] = async (...args) => {
            // NOTE: this is so that we can pass in the entire object into
            // the function so that it can do this. and access stuff
            const prevState = get();
            // TODO: produce with immer here
            const result = await value.apply(prevState, args); // NOTE: here is where its applied
            set(result); // NOTE: set() actually 'commits' the update
            return result;
          };
        } else {
          zustandState[key] = (...args) => {
            const prevState = get();
            // TODO: produce with immer here
            const result = value.apply(prevState, args);
            // TODO: do i need to set here, if i want to use this.whatevs
            set(result);
            return result;
          };
        }
      } else {
        zustandState[key] = value;
      }
    });
    return zustandState;
  });

  return useStore;
}

export default create;

export const useStore = create({
  data: [],
  async fetchData() {
    const result = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((res) => res.json());
    this.data = [...this.data, ...result];
  },
  getSomeData() {
    return this.data.slice(0, 10);
  },
  mutateSomeData() {
    this.data = [{ title: "yo" }, { title: "mama" }];
  },
});
