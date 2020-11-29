const useMapToOptions = (data, value, label) => {
  if (data) {
    return data.map((item) => ({
      label: item[label],
      value: item[value],
      data: item,
    }));
  }
  return [];
};

export default useMapToOptions;
