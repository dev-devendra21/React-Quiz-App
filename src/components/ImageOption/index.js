import {useOption} from '../../context/OptionContext'

import SelectedOptionId from '../Answers/SelectedOptionId'

import './index.css'

const ImageOption = () => {
  const {option, handleOption, selectedOption} = useOption()

  const optionId = selectedOption === '' ? SelectedOptionId() : selectedOption
  return (
    <>
      <ul className="image-option-container">
        {option?.map(eachOption => (
          <li key={eachOption.id}>
            <img
              alt={eachOption.text}
              onClick={() => handleOption(eachOption.id)}
              src={eachOption.imageUrl}
              className={
                eachOption.id === optionId
                  ? 'image-option selected-image-option'
                  : 'image-option'
              }
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ImageOption
