import {useHistory} from 'react-router-dom'
import {forwardRef, useEffect, useState} from 'react'
import {useScore} from '../../context/UserContext'
import './index.css'

const TIME = 600

const Timer = forwardRef((props, ref) => {
  const {questionsList, selectedQuestionId, selectedQuestion} = props
  const [timeLeftProgress, setTimeLeftProgress] = useState(TIME)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftProgress(prevValue => prevValue - 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [timeLeftProgress])

  const history = useHistory()
  const {answerQuestion, unAnswerQuestion, min, sec, totalScore} = useScore()

  const timeLeft = min * 60 + sec
  const timeTakenInSeconds = 600 - timeLeft

  const onSubmitAssessment = () => {
    clearInterval(ref)
    const userScoreAndTimeTaken = {
      totalScore,
      timeTakenInSeconds,
    }
    localStorage.setItem(
      'userScoreAndTimeTaken',
      JSON.stringify(userScoreAndTimeTaken),
    )
    history.replace('/results')
  }

  const formatTime = time => {
    const value = time > 9 ? `${time}` : `0${time}`
    return value
  }

  const countTimer = min < 4 ? 'count-timer-less' : ''

  const progressBarClass = min < 4 ? 'progress-bar-less' : 'progress-bar'

  return (
    <>
      <section className="timer">
        <p className="timer-text">Time Left</p>
        <p className={`${countTimer} count-timer`}>
          00:{formatTime(min)}:{formatTime(sec)}
        </p>
      </section>
      <progress
        className={progressBarClass}
        value={timeLeftProgress}
        max={TIME}
        min="0"
      />
      <main className="no-of-question-card">
        <div className="answer-and-unanswered-container">
          <div>
            <p className="answer-count">{answerQuestion}</p>
            <p className="answer-text">Answered Questions</p>
          </div>
          <div>
            <p className="unanswer-count">{unAnswerQuestion}</p>
            <p className="unanswer-text">Unanswered Questions</p>
          </div>
        </div>
        <h1 className="no-of-question-text">
          Questions ({questionsList.length})
        </h1>
        <ul className="no-of-question-count">
          {questionsList.map((eachquestion, index) => {
            const {id, isAnswered} = eachquestion
            return (
              <li key={id}>
                <button
                  type="button"
                  id={isAnswered ? 'answered-btn' : 'button'}
                  className={
                    selectedQuestionId === id ? 'active-btn button' : 'button'
                  }
                  onClick={() => selectedQuestion(id)}
                >
                  {index + 1}
                </button>
              </li>
            )
          })}
        </ul>
        <div className="submit-button-container">
          <button
            type="button"
            onClick={onSubmitAssessment}
            className="submit-btn"
          >
            Submit Assessment
          </button>
        </div>
      </main>
    </>
  )
})

export default Timer
