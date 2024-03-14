import React, {useContext} from 'react'

export const UserContext = React.createContext({
  totalScore: 0,
  min: 10,
  sec: 0,
  answerQuestion: 0,
  unAnswerQuestion: 0,
  handleQuestionNumber: () => {},
})

export const UserProvider = UserContext.Provider

export const useScore = () => useContext(UserContext)
