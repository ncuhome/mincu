import React from 'react'
const Button: React.FC<{
  disabled?: boolean
}> = ({ children, disabled, ...rest }) => {
  return (
    <button
      class="mt-2 text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg active:bg-gray-400 disabled:opacity-50"
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button