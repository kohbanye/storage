import { css } from '@emotion/react'

interface createButtonProps {
  onClick: () => void
}

const CreateButton = ({ onClick }: createButtonProps) => {
  return (
    <button onClick={onClick} css={button}>
      create
    </button>
  )
}

const button = css`
  color: #ffffff;
  background-color: #66a5ad;
  border: none;
  border-radius: 10rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

export default CreateButton
