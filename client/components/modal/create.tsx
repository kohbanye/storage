import { useState } from 'react'
import { css } from '@emotion/react'
import { HoverMenuName } from 'components/directory/hoverMenu'
import Input from 'components/UI/input'
import CreateButton from './createButton'

interface ModalProps {
  menuName: HoverMenuName
  isOpen: boolean
  onClose: () => void
}

const CreateModal = ({ menuName, isOpen, onClose }: ModalProps) => {
  const [name, setName] = useState('')

  return (
    <div css={[container, isOpen && active]}>
      <div css={overlay} onClick={onClose} />
      <div css={modalContainer}>
        <div css={header}>create {menuName}</div>
        <div css={inputStyle}>
          <Input
            placeholder={`${menuName} name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div css={buttonStyle}>
          <CreateButton onClick={onClose} />
        </div>
      </div>
    </div>
  )
}

const modalWidth = '300px'
const modalHeight = '150px'
const container = css`
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s;
`
const active = css`
  visibility: visible;
  opacity: 1;
`
const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`
const modalContainer = css`
  position: absolute;
  background-color: #ffffff;
  border-radius: 0.5rem;
  top: calc(50vh - ${modalHeight} / 2);
  left: calc(50vw - ${modalWidth} / 2);
  width: ${modalWidth};
  height: ${modalHeight};
  padding: 0.5rem;
`
const header = css`
  font-size: 1.25rem;
  padding: 0.5rem 0.75rem;
`
const inputStyle = css`
  padding: 0.5rem 1rem;
`
const buttonStyle = css`
  display: flex;
  justify-content: flex-end;
  padding: 0.25rem 1.5rem;
`

export default CreateModal
