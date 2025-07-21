import React, { JSX} from "react"


//Define Type of Props

type Props = {
    children:React.ReactNode
}


const SectionHeading = ({children}:Props): JSX.Element  => {
  return <div className='bg-gradient-to-r from-primary
                    to-tertiary w-fit text-center px-4 py-3 mx-auto
   text-white text-2xl sm:text-3xl md:text-4xl uppercase'>{children}</div>
                   
}

export default SectionHeading