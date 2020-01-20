import React from 'react'
import sIcon from './../../img/Vector_search_icon.svg'

export default ({value, onChange}) => {
  return (
    <div className="search">
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={onChange}
      />
      <span className='search-icon'>
        <img src={sIcon} alt="search"/>
      </span>
    </div>
  )
}
