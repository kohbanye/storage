import { useState } from 'react'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import CancelIcon from '@mui/icons-material/Cancel'
import { HoverMenuName } from 'components/directory/hoverMenu'
import Input from 'components/UI/input'
import CreateButton from './createButton'
import { createFile } from 'lib/api'

interface ModalProps {
  menuName: HoverMenuName
  isOpen: boolean
  onClose: () => void
}

const CreateModal = ({ menuName, isOpen, onClose }: ModalProps) => {
  const [name, setName] = useState('')

  const router = useRouter()
  const onClick = (fileName: string, type: HoverMenuName) => {
    onClose()
    const path = `${router.asPath.replace('/dir', '')}/${fileName}`
    createFile(path, type === 'folder')

    router.push(router.asPath)
  }

  return (
    <div css={[container, isOpen && active]}>
      <div css={overlay} onClick={onClose} />
      <div css={modalContainer}>
        <div css={header}>
          <div css={headerTitle}>create {menuName}</div>
          <CancelIcon css={icon} onClick={onClose} />
        </div>
        <div css={inputStyle}>
          <Input
            placeholder={`${menuName} name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div css={buttonStyle}>
          <CreateButton onClick={() => onClick(name, menuName)} />
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
  display: flex;
  font-size: 1.25rem;
`
const headerTitle = css`
  padding: 0.75rem;
`
const icon = css`
  color: #ff6e6e;
  cursor: pointer;
  margin-left: auto;
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
