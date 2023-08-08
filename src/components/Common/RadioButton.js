import React from 'react'

export default function RadioButton({setRadioActive, radioActive, number}) {
  return (
    <div className={`h-[18px] w-[18px] rounded-full ${radioActive===number ? "radio-active" : "radio-inactive"}  flex justify-center items-center` }
            onClick={()=> setRadioActive(number)}>
                {
                    radioActive===number &&
                    <div className="w-2 h-2 bg-white rounded-full" />
                }
            </div>
  )
}
