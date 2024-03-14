import {useOption} from '../../context/OptionContext'
import SelectedOptionId from '../Answers/SelectedOptionId'
import './index.css'

const DefaultOption = () => {
  const {option, handleOption, selectedOption} = useOption()

  const optionId = selectedOption === '' ? SelectedOptionId() : selectedOption

  return (
    <>
      <ul className="default-option-container">
        {option?.map(eachOption => (
          <li key={eachOption.id}>
            <button
              type="button"
              onClick={() => handleOption(eachOption.id)}
              className={
                eachOption.id === optionId
                  ? 'default-option-button selected-default-option'
                  : 'default-option-button'
              }
            >
              {eachOption.text}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default DefaultOption
