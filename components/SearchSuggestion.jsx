import React from 'react'

const SearchSuggestion = ({data,handleClick}) => {
  return (
    <div className='absolute top-11 left-2/13 w-3/5 z-20 bg-gray-800'>
        <ul className='flex flex-col pl-1.5'>
            {
                data && data.length ? 
                data.map((title,index) => (
                    <li  className='text-gray-300 text-sm py-1 cursor-pointer' key={index} onClick={handleClick}>{title}</li>
                ))
                : null
            }
        </ul>
    </div>
  )
}

export default SearchSuggestion