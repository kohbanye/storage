import { useState } from 'react'
import { css } from '@emotion/react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import UploadRoundedIcon from '@mui/icons-material/UploadRounded'
import { icon } from 'styles/globals'
import HoverMenu, { HoverMenuName } from './hoverMenu'

export type ButtonName = 'create' | 'upload'
interface ButtonProps {
  name: ButtonName
  onClickMenu: (name: HoverMenuName) => void
}

const switchIcon = (name: ButtonName) => {
  switch (name) {
    case 'create':
      return <AddRoundedIcon css={icon} />
    case 'upload':
      return <UploadRoundedIcon css={icon} />
  }
}

export const Button = ({ name, onClickMenu }: ButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div css={container}>
      <div css={buttonStyle} onMouseDown={() => setIsMenuOpen(true)}>
        {switchIcon(name)}
        <div css={buttonName}>{name}</div>
      </div>
      <HoverMenu
        name={name}
        isOpen={isMenuOpen}
        onClickMenu={onClickMenu}
        onCloseMenu={() => setIsMenuOpen(false)}
        onClickOutside={() => setIsMenuOpen(false)}
      />
    </div>
  )
}

const container = css`
  position: relative;
`
const buttonStyle = css`
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
