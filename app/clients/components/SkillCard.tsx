import React from 'react'


// Define type of Props

type Props ={
     skill: {
    id: number;
    title: string;
    image: string;
    percent: string;
};
};

const SkillCard = ({skill}:Props) => {
    const {image, percent, title} = skill;
  return (
    <div className='p-6 hover:bg-[#3A4A5A] duration-300
     transition-all cursor-pointer text-center shadow-lg bg-[#26313C] rounded-lg '>
        <img src={image} alt={title} width={80} height={80} className='object-cover mx-auto'/>
        <div className='text-[18px] mt-4 text-white font-[600]'>{title}</div>
        <div className='bg-[#607B95] mt-4 rounded-lg p-2 text-white opacity-40'>{percent}</div>
    </div>
  ) 
}

export default SkillCard