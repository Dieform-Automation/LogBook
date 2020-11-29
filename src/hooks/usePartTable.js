import { toast } from 'react-toastify';
import create from 'zustand';

// Arrow Function Syntax
// params => ({foo: "a"}) returns the object {foo: "a"}

const usePartTable = create((set) => ({
  partList: [],
  addPart: (part) => {
    set((state) => {
      if (!state.partList.find((p) => p.part_id === part.part_id)) {
        return { partList: state.partList.concat(part) };
      }
      toast.error('Part has already been added. Please remove existing entries first');
    });
  },
  removePart: (key) => {
    set((state) => ({
      partList: state.partList.filter((_, index) => {
        return index !== key;
      }),
    }));
  },
  resetPartList: () => {
    set(() => ({ partList: [] }));
  },
}));

export default usePartTable;
