import { css } from '@emotion/react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import UploadRoundedIcon from '@mui/icons-material/UploadRounded'
import { icon } from 'styles/globals'

type ButtonName = 'create' | 'upload'
interface ButtonProps {
  name: ButtonName
}

const switchIcon = (name: ButtonName) => {
  switch (name) {
    case 'create':
      return <AddRoundedIcon css={icon} />
    case 'upload':
      return <UploadRoundedIcon css={icon} />
  }
}

export const Button = ({ name }: ButtonProps) => {
  return (
    <div css={container}>
      {switchIcon(name)}
      <div css={buttonName}>{name}</div>
    </div>
  )
}

const container = css`
  display: flex;
  align-items: center;
  background-color: #66a5ad;
  border-radius: 3rem;
  cursor: pointer;
  width: fit-content;
  padding: 0.25rem 1.5rem 0.25rem 1rem;
  margin: 1rem 0.5rem;
  &:hover {
    opacity: 0.8;
  }
`
const buttonName = css`
  color: #ffffff;
`

export default Button
