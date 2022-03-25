import React from 'react'

const FilterTitle = ({ children }: { children: string}) => {
  return (
    <h3 className="text-white text-xl">{children}</h3>
  )
}

export default FilterTitle