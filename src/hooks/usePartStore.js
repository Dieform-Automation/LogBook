import create from 'zustand';

// Arrow Function Syntax
// params => ({foo: "a"}) returns the object {foo: "a"}

const usePartStore = create((set) => ({
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
}));

export default usePartStore;
