import React from "react"

interface btnPropType{
  type:'register'|'login',
  handleSubmit:() => void
}
const AuthButton:React.FC<btnPropType> = ({type,handleSubmit}) => {
  return (
    <div className="flex justify-center p-3">
      <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer w-full" onClick={handleSubmit}>{type==='register'?'Register':'Login'}</button>
    </div>
  )
}

export default AuthButton
