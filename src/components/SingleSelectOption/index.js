import {useOption} from '../../context/OptionContext'

import './index.css'

const SingleSelectOption = () => {
  const {option, handleOption} = useOption()
  return (
    <>
      <select
        onChange={event => handleOption(event.target.value)}
        className="select-option"
      >
        {option.map(eachOption => (
          <option key={eachOption.id} value={eachOption.id}>
            {eachOption.text}
          </option>
        ))}
      </select>
    </>
  )
}

export default SingleSelectOption
