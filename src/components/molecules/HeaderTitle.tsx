import React from 'react'
import HeaderIcon from './../atoms/HeaderIcon';
import HeaderText from './../atoms/HeaderText';

const HeaderTitle = () => {
  return (
    <div className="flex flex-row items-center my-10">
      <HeaderText/>
      <HeaderIcon/>
    </div>
  )
}

export default HeaderTitle