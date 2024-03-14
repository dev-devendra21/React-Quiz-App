import {useHistory} from 'react-router-dom'
import {useEffect, useCallback} from 'react'
import Confetti from 'react-confetti'
import Header from '../Header'
import './index.css'

const WINNER =
  'https://res.cloudinary.com/ddox0bhgm/video/upload/v1710394157/NxtAssess/winner_ivmntn.mp3'
const TIMEUP =
  'https://res.cloudinary.com/ddox0bhgm/video/upload/v1710394842/NxtAssess/time-up_rrpjvz.mp3'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight - 20

const Results = () => {
  const history = useHistory()
  const totalScoreAndTimeTaken = JSON.parse(
    localStorage.getItem('userScoreAndTimeTaken'),
  )

  const timeOutScore = JSON.parse(localStorage.getItem('timeOutScore'))

  const playSound = useCallback(() => {
    let soundEffect = null
    if (totalScoreAndTimeTaken === null) {
      soundEffect = new Audio(TIMEUP).play()
    } else if (timeOutScore === null) {
      soundEffect = new Audio(WINNER).play()
    }

    return soundEffect
  }, [])

  useEffect(() => {
    playSound()
  }, [playSound])

  let score = null
  let takenTime = null

  if (timeOutScore === null) {
    const {totalScore, timeTakenInSeconds} = totalScoreAndTimeTaken
    score = totalScore

    // calculation of timeTaken
    const minutes = Math.trunc(timeTakenInSeconds / 60)
    const seconds = Math.floor(((250 / 60) % 1) * 60)
    takenTime = `00:0${minutes}:${seconds}`
  } else if (totalScoreAndTimeTaken === null) {
    score = timeOutScore
  }

  const onReattemt = () => {
    localStorage.clear()
    history.replace('/assessment')
  }

  function onSubmitView() {
    return (
      <>
        <img
          src="https://res.cloudinary.com/ddox0bhgm/image/upload/v1707470606/NxtAssess/congarts_img_z82l0q.jpg"
          alt="submit"
          className="submit-view"
        />
        <h1 className="congarts-text">
          Congrats! You completed the assessment.
        </h1>
        <div className="time-taken-container">
          <p className="submit-time-taken-text">Time Taken:</p>
          <p className="submit-time-taken">{takenTime}</p>
        </div>
      </>
    )
  }

  function onTimeUp() {
    return (
      <>
        <img
          src="https://res.cloudinary.com/ddox0bhgm/image/upload/v1707470590/NxtAssess/times_up_img_jvwvq8.jpg"
          alt="time up"
          className="time-up"
        />
        <h1 className="time-up-heading">Time is up!</h1>
        <p className="not-complete-text">
          You did not complete the assessment within the time.
        </p>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="results-container">
        {timeOutScore === null ? (
          <Confetti width={WIDTH} height={HEIGHT} recycle={false} />
        ) : null}
        <section className="results-card">
          {timeOutScore === null ? onSubmitView() : onTimeUp()}
          <div className="score-container">
            <p className="your-score-text">Your Score:</p>
            <p className="your-score-count">{score}</p>
          </div>

          <button type="button" className="reattempt-btn" onClick={onReattemt}>
            Reattempt
          </button>
        </section>
      </div>
    </>
  )
}

export default Results
