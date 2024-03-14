import DefaultOption from '../DefaultOption'
import ImageOption from '../ImageOption'
import SingleSelectOption from '../SingleSelectOption'

const Answers = ({optionType}) => {
  switch (optionType) {
    case 'DEFAULT':
      return <DefaultOption />
    case 'IMAGE':
      return <ImageOption />
    case 'SINGLE_SELECT':
      return <SingleSelectOption />
    default:
      return null
  }
}

export default Answers
