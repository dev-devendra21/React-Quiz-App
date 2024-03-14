import {useOption} from '../../context/OptionContext'

const SelectedOptionId = () => {
  const {answerList, selectedQuestionId} = useOption()
  const answerId = answerList.filter(
    eachOption => eachOption.questionId === selectedQuestionId,
  )[0]?.optionId

  return answerId
}

export default SelectedOptionId
