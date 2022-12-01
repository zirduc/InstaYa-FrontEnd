import { useEffect, useReducer } from "react"
import { SingleContext, singleReducer } from "./";



const initialState = {
  isInHome: true,
  isInLogin: false,
  isInRegister: false,
  isInAdmin: false,
  isInOrder: false,
  isInListOrder: false,
}

export const SingleProvider = ({ children }) => {

  const [state, dispatch] = useReducer(singleReducer, JSON.parse(localStorage.getItem('state')) || initialState);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])


  return (
    <SingleContext.Provider value={{
      state,
      dispatch,

    }}>
      {children}
    </SingleContext.Provider>
  )
}
