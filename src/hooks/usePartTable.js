import create from 'zustand';

// Arrow Function Syntax
// params => ({foo: "a"}) returns the object {foo: "a"}

const usePartTable = create((set) => ({
  parts: [],
  addPart: (part) => {
    set((state) => ({ parts: state.parts.concat(part) }));
  },
  removePart: (key) => {
    set((state) => ({
      parts: state.parts.filter((_, index) => {
        return index !== key;
      }),
    }));
  },
  resetParts: () => {
    set(() => ({ parts: [] }));
  },
}));

export default usePartTable;
