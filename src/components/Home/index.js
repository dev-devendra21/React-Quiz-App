import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <section className="home-image-container">
        <img
          className="assessment_instructions_img"
          src="https://res.cloudinary.com/ddox0bhgm/image/upload/v1707468392/NxtAssess/instructions_img_zsyxha.jpg"
          alt="assessment"
        />
      </section>
      <section className="instructions_card">
        <h1>Instructions</h1>
        <ol>
          <li>
            <p>
              <span>Total Questions:</span> 10
            </p>
          </li>
          <li>
            <p>
              <span>Types of Questions:</span> MCQs
            </p>
          </li>
          <li>
            <p>
              <span>Duration:</span> 10 Mins
            </p>
          </li>
          <li>
            <p>
              <span>Marking Scheme:</span> Every Correct response, get 1 mark
            </p>
          </li>
          <li>
            <p>
              All the progress will be lost, if you reload during the assessment
            </p>
          </li>
        </ol>
        <Link to="/assessment">
          <button type="button" className="start-assessment-btn">
            Start Assessment
          </button>
        </Link>
      </section>
    </div>
  </>
)

export default Home
