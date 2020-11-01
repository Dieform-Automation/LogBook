import create from 'zustand';

// Arrow Function Syntax
// params => ({foo: "a"}) returns the object {foo: "a"}

const useGlobalState = create((set) => ({
  receivedParts: [],
  addRecPart: (part) => {
    set((state) => ({ receivedParts: state.receivedParts.concat(part) }));
  },
  removeRecPart: (key) => {
    set((state) => ({
      receivedParts: state.receivedParts.filter((_, index) => {
        return index !== key;
      }),
    }));
  },
  resetRecParts: () => {
    set(() => ({ receivedParts: [] }));
  },
}));

export default useGlobalState;
