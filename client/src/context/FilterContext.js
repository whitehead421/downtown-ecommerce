import React, { createContext, useState } from "react";

const FilterContext = createContext([{}, () => {}]);

const FilterProvider = (props) => {
  const [state, setState] = useState({
    category: [],
    color: [],
    brand: [],
    price: { min: 0, max: 190 },
    gender: "",
  });

  return (
    <FilterContext.Provider value={[state, setState]}>
      {props.children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
