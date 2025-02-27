import React from 'react'
import Image from "next/image";
import user from '../assets/icons8-user-48.png'
import search from '../assets/icons8-search-48.png'
const nav = () => {
  return (
    <div className=' flex justify-between items-center p-10 md:w-100 text-black'>
          <h1 className=' w-30 text-[#016e1b] font-medium text-2xl w-1/4'> NourishBox</h1>
      <ul className='flex py-0 w-1/2'>
              <li className='px-4  font-medium text-xl'>Home</li>
              <li className='px-4 font-medium text-xl'>Recipe </li>
              <li className='px-4 font-medium text-xl'>About us</li>
              <li className='px-4 font-medium text-xl'>Community</li>
              
         </ul>
         <div className='flex items-center justify-end w-1/12'>

         <Image src={search} alt='search icon' width={30} height={30.11} className='mx-4'/>
          <Image src={user} alt='user icon' width={30} height={30.11}/>
         </div>
    </div>
  )
}

export default nav