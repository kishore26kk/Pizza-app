import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const Button = ({children, disabled ,to, type}) => {
  const className="inline-block bg-yellow-400 uppercase px-4 py-3 font-semibold text-stone-800 tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 disabled:cursor-not-allowed focus:outline-none focus:outline-yellow-500 focus:ring-offset-2"
  const styles = {
    primary : className + 'px-4 py-3 md:px-6 md:py-4',
    small : className + 'px-4 py-2 md:px-5 md:py-2.5 text-xs',
    secondary : 'inline-block bg-transparent border-2 border-stone-300 uppercase px-4 py-3 font-semibold text-stone-400 tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 disabled:cursor-not-allowed focus:outline-none focus:outline-stone-200 focus:ring-offset-2'
  }
  if(to) return <Link to={to} className={className}>{children}</Link>
  return (
    <button disabled={disabled} className={styles[type]}>{children}</button>
  )
}

export default Button 