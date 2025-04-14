import React from "react"

interface btnPropType{
  type:'register'|'login',
  handleSubmit:() => void,
  isSubmitting:boolean
}
const AuthButton:React.FC<btnPropType> = ({type,handleSubmit,isSubmitting}) => {
  return (
    <div className="flex justify-center p-3">
      <button type="button" className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full ${isSubmitting?'flex justify-center cursor-not-allowed':'cursor-pointer'}`} onClick={handleSubmit} disabled={isSubmitting}>
      {isSubmitting ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) :type==='register'?'Register':'Login'}
      </button>
    </div>
  )
}
  
export default AuthButton
