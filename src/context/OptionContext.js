import React, {useContext} from 'react'

export const OptionContext = React.createContext({
  option: [],
  answerList: [],
  selectedOption: '',
  selectedQuestionId: '',
  handleOption: () => {},
})

export const OptionProvider = OptionContext.Provider

export const useOption = () => useContext(OptionContext)
