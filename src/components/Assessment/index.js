import {useEffect, useState, useCallback, useRef} from 'react'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import LoaderRoute from '../LoaderRoute'
import Answers from '../Answers'
import Questions from '../Questions'
import FailureView from '../FailureView'
import Timer from '../Timer'
import {OptionProvider} from '../../context/OptionContext'
import {UserProvider} from '../../context/UserContext'

import './index.css'

const apiStatusList = {
  inProcess: 'INPROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Assessment = () => {
  const timerID = useRef(null)

  const [questionList, setQuestionList] = useState({
    apiStatus: apiStatusList.inProcess,
    data: [],
  })

  const [selectedQuestionId, setSelectedQuestionId] = useState('')
  const [answerList, setAnswerList] = useState([])
  const [option, setOption] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  const [noOfQuestion, setNoOfQuestion] = useState({
    answerQuestion: 0,
    unAnswerQuestion: 0,
  })
  const [showNextQuestion, setShowNextQuestion] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  const [timing, setTiming] = useState({
    min: 10,
    sec: 0,
  })

  const formatData = data => {
    const format = data.map(eachData => ({
      id: eachData.id,
      isAnswered: false,
      optionsType: eachData.options_type,
      questionText: eachData.question_text,
      options: eachData.options.map(eachOption => ({
        id: eachOption.id,
        isCorrect: eachOption.is_correct,
        text: eachOption.text,
        imageUrl: eachOption.image_url ?? null,
      })),
    }))
    return format
  }

  const questionRequest = useCallback(async () => {
    const response = await fetch('https://apis.ccbp.in/assess/questions')
    const responseData = await response.json()
    if (response.ok) {
      setQuestionList(previousData => ({
        ...previousData,
        apiStatus: apiStatusList.success,
        data: formatData(responseData.questions),
      }))
      const questionId = responseData.questions[0].id
      setSelectedQuestionId(questionId)
      setNoOfQuestion(prevValue => ({
        ...prevValue,
        unAnswerQuestion: responseData.total,
      }))
    } else {
      setQuestionList(previousData => ({
        ...previousData,
        apiStatus: apiStatusList.failure,
      }))
    }
  }, [])

  useEffect(() => {
    questionRequest()
  }, [questionRequest])

  useEffect(() => {
    timerID.current = setInterval(() => {
      setTiming(prevValue => {
        const {sec, min} = prevValue
        if (sec === 0 && min > 0) return {min: prevValue.min - 1, sec: 59}
        return {
          ...prevValue,
          sec: min === 0 && sec === 0 ? 0 : prevValue.sec - 1,
        }
      })
    }, 1000)

    return () => {
      clearInterval(timerID.current)
    }
  }, [timing])

  useEffect(() => {
    if (questionList.data.length > 0) {
      const optionList = questionList.data.find(
        eachQuestion => eachQuestion.id === selectedQuestionId,
      )?.options
      setOption(optionList)
    }
  }, [questionList.data, selectedQuestionId])

  let question = null
  let questionNo = null
  let optionType = null

  if (questionList.data.length > 0) {
    question = questionList.data.find(
      eachQuestion => eachQuestion.id === selectedQuestionId,
    )?.questionText

    questionNo =
      questionList.data.findIndex(
        eachQuestion => eachQuestion.id === selectedQuestionId,
      ) + 1

    optionType = questionList.data.find(
      eachOption => eachOption.id === selectedQuestionId,
    )?.optionsType
  }

  const handleAnswerList = () => {
    const currentQuestion = answerList?.find(
      eachAnswer => eachAnswer.questionId === selectedQuestionId,
    )

    if (currentQuestion === undefined) {
      setAnswerList(prevValue => [
        ...prevValue,
        {
          questionId: selectedQuestionId,
          optionId: selectedOption,
          isCorrectOption: false,
        },
      ])
    } else {
      setAnswerList(prevValue =>
        prevValue.map(eachAnswer => {
          if (
            eachAnswer.questionId === selectedQuestionId &&
            selectedOption !== ''
          ) {
            return {...eachAnswer, optionId: selectedOption}
          }
          return eachAnswer
        }),
      )
    }
  }

  useEffect(() => {
    if (selectedQuestionId !== '') {
      handleAnswerList()
    }
  }, [selectedQuestionId, selectedOption])

  const handleScore = selectId => {
    const isCorrectAnswer = option.filter(
      eachOption => eachOption.id === selectId,
    )[0]?.isCorrect

    const {isCorrectOption} = answerList.find(
      eachAnswer => eachAnswer.questionId === selectedQuestionId,
    )

    if (isCorrectAnswer === 'true' && isCorrectOption === false) {
      setTotalScore(prevValue => prevValue + 1)

      setAnswerList(prevValue =>
        prevValue.map(eachAnswer =>
          eachAnswer.questionId === selectedQuestionId
            ? {...eachAnswer, isCorrectOption: true}
            : eachAnswer,
        ),
      )
    } else if (isCorrectAnswer === 'false' && isCorrectOption === true) {
      setTotalScore(prevValue => prevValue - 1)
      setAnswerList(prevValue =>
        prevValue.map(eachAnswer =>
          eachAnswer.questionId === selectedQuestionId
            ? {...eachAnswer, isCorrectOption: false}
            : eachAnswer,
        ),
      )
    }

    handleAnswerList()
  }

  const questionTabColor = () => {
    if (selectedOption !== '') {
      setQuestionList(prevValue => ({
        ...prevValue,
        data: prevValue.data.map(eachData =>
          eachData.id === selectedQuestionId
            ? {...eachData, isAnswered: true}
            : eachData,
        ),
      }))
    }
  }

  const handleNextQuestion = id => {
    const index = questionList.data.findIndex(eachId => eachId.id === id)

    questionTabColor()

    if (index === questionList.data.length - 2) {
      setShowNextQuestion(true)
    }

    const questionId = questionList.data[index + 1]?.id
    setSelectedQuestionId(questionId)

    setSelectedOption('')
  }

  const handleSelectedQuestion = id => {
    const index = questionList.data.findIndex(eachId => eachId.id === id)

    questionTabColor()

    setSelectedQuestionId(id)

    setSelectedOption('')

    if (index === questionList.data.length - 1) {
      setShowNextQuestion(true)
    } else {
      setShowNextQuestion(false)
    }
  }

  const handleQuestionNumber = () => {
    const {isAnswered} = questionList.data.find(
      eachData => eachData.id === selectedQuestionId,
    )
    if (selectedOption === '' && isAnswered === false) {
      setNoOfQuestion(prevValue => ({
        ...prevValue,
        answerQuestion: prevValue.answerQuestion + 1,
        unAnswerQuestion: prevValue.unAnswerQuestion - 1,
      }))
    }
  }

  useEffect(() => {
    if (optionType === 'SINGLE_SELECT' && selectedOption === '') {
      const defaultValue = option[0]?.id
      setSelectedOption(defaultValue)
      handleScore(defaultValue)
      handleQuestionNumber()
    }
  }, [option])

  const handleOption = selectId => {
    setSelectedOption(selectId)
    handleQuestionNumber()
    handleScore(selectId)
  }

  function onSuccessfullFetchData() {
    return (
      <>
        <OptionProvider
          value={{
            option,
            answerList,
            selectedOption,
            selectedQuestionId,
            handleOption,
          }}
        >
          <UserProvider
            value={{
              totalScore,
              min: timing.min,
              sec: timing.sec,
              answerQuestion: noOfQuestion.answerQuestion,
              unAnswerQuestion: noOfQuestion.unAnswerQuestion,
              handleQuestionNumber,
            }}
          >
            <Header />
            <section className="assessment-container">
              <div className="question-and-answer-container">
                <div className="question-and-answer-card">
                  <Questions>
                    {questionNo}. {question}
                  </Questions>
                  <Answers optionType={optionType} />
                  {optionType === 'SINGLE_SELECT' && (
                    <div className="alert-container">
                      <p className="alert-msg">
                        <img
                          className="alert-icon"
                          src="https://res.cloudinary.com/ddox0bhgm/image/upload/v1709701036/NxtAssess/alert_message_icon_qbnhcd.png"
                          alt="alert-icon"
                        />
                        First option is selected by default
                      </p>
                    </div>
                  )}
                  {!showNextQuestion && (
                    <div className="button-container">
                      <button
                        type="button"
                        onClick={() => handleNextQuestion(selectedQuestionId)}
                        className="next-button"
                      >
                        Next Question
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="timer-container">
                <Timer
                  selectedQuestionId={selectedQuestionId}
                  questionsList={questionList.data}
                  selectedQuestion={handleSelectedQuestion}
                  handleScore={handleScore}
                  ref={timerID}
                />
              </div>
            </section>
          </UserProvider>
        </OptionProvider>
      </>
    )
  }

  const retryResponse = () => {
    setQuestionList(prevValue => ({
      ...prevValue,
      apiStatus: apiStatusList.inProcess,
    }))
    questionRequest()
  }

  if (timing.min === 0 && timing.sec === 0) {
    clearInterval(timerID.current)
    localStorage.setItem('timeOutScore', JSON.stringify(totalScore))
    return <Redirect to="/results" />
  }

  switch (questionList.apiStatus) {
    case apiStatusList.inProcess:
      return <LoaderRoute />
    case apiStatusList.success:
      return onSuccessfullFetchData()
    case apiStatusList.failure:
      return <FailureView onRetry={retryResponse} />
    default:
      return null
  }
}

export default Assessment
