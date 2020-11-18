import create from 'zustand';

// Arrow Function Syntax
// params => ({foo: "a"}) returns the object {foo: "a"}

const usePartTable = create((set) => ({
  partList: [],
  addPart: (part) => {
    set((state) => ({ partList: state.partList.concat(part) }));
  },
  removePart: (key) => {
    set((state) => ({
      partList: state.partList.filter((_, index) => {
        return index !== key;
      }),
    }));
  },
  resetParts: () => {
    set(() => ({ partList: [] }));
  },
}));

export default usePartTable;
