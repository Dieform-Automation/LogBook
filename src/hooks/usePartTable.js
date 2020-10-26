import create from 'zustand';

// Arrow Function Syntax
// params => ({foo: "a"}) returns the object {foo: "a"}

const usePartTable = create((set) => ({
  receivedParts: [],
  addPart: (part) => {
    set((state) => ({ receivedParts: state.receivedParts.concat(part) }));
  },
  removePart: (key) => {
    set((state) => ({
      receivedParts: state.receivedParts.filter((_, index) => {
        return index !== key;
      }),
    }));
  },
  reset: () => {
    set(() => ({ receivedParts: [] }));
  },
}));

export default usePartTable;
