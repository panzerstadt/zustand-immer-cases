import createHook from "zustand";
import produce, { current } from "immer";

function create(state) {
  const useStore = createHook((set, get) => {
    const zustandState = {
      get, // FIXME: dunno if we should allow this in the zustand wrapper
    };
    Object.entries(state).forEach(([key, value]) => {
      if (typeof value === "function") {
        // split function by async or non-async here.
        // because if function is not async, i don't wanna
        // have to await it anyways
        if (value.constructor.name === "AsyncFunction") {
          //   console.log("this is an async function!", value);
          zustandState[key] = async (...args) => {
            let result;
            // NOTE: this is so that we can pass in the entire object into
            // the function so that it can do this. and access stuff
            const prevState = get();

            // NOTE: here is where its applied
            const nextState = await produce(prevState, async (state) => {
              result = await value.apply(state, args); // NOTE: action has already been sone on the state, we don't need to return
            });

            set(nextState); // NOTE: set() actually 'commits' the update
            return result;
          };
        } else {
          console.log("this is not an async function", value);
          zustandState[key] = (...args) => {
            let result;

            set(
              produce((draft) => {
                // FIXME: also call it a draft for gods sake, or even better,
                // a stateProxy (and also mention if people wanna read it,
                // use import {current} from immer)
                result = value.apply(draft, args);
              })
            );

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

    // NOTE: if i don't return anything from the function, it does not get returned in the 'result'
    return this.data;
  },
  getSomeData() {
    console.log("thi sis waht dat looks like here", this.get());
    const data = this.get().data;
    return data.slice(0, 10);
  },
  mutateSomeData() {
    this.data = [{ title: "yo" }, { title: "mama" }];
  },
});
