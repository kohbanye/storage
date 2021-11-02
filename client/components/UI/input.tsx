import { css } from '@emotion/react'

interface InputProps {
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ placeholder, value, onChange }: InputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      css={inputStyle}
    />
  )
}

const inputStyle = css`
  border: 1px solid #c9c9c9;
  border-radius: 0.25rem;
  padding: 0.25rem;
  transition: all 0.2s;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #c4def6;
    box-shadow: 0 0 0 0.1rem #c4def650;
  }
`

export default Input
