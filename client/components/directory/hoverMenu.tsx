import { css } from '@emotion/react'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined'
import { useRef } from 'react'
import { ButtonName } from './button'
import { useClickOutside } from './use/useClickOutside'

const menus = ['folder', 'file'] as const
type HoverMenuName = typeof menus[number]

interface HoverMenuProps {
  name: ButtonName
  isOpen: boolean
  onClickOutside: () => void
}

const switchMenu = (buttonName: ButtonName, hoverMenuName: HoverMenuName) => {
  switch (`${buttonName}-${hoverMenuName}`) {
    case 'create-folder':
      return <CreateNewFolderOutlinedIcon />
    case 'create-file':
      return <InsertDriveFileOutlinedIcon />
    case 'upload-file':
      return <UploadFileOutlinedIcon />
    case 'upload-folder':
      return <DriveFolderUploadOutlinedIcon />
  }
}

const HoverMenu = ({ name, isOpen, onClickOutside }: HoverMenuProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  useClickOutside(isOpen, divRef, onClickOutside)

  return (
    <div ref={divRef} css={[container, isOpen && active]}>
      {menus.map((menu) => (
        <div key={menu} css={menuStyle}>
          {switchMenu(name, menu)}
          <div css={menuName}>{menu}</div>
        </div>
      ))}
    </div>
  )
}

const container = css`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #c9c9c9;
  border-radius: 0.5rem;
  top: calc(3.25rem + 2px);
  left: 15%;
  width: 70%;

  opacity: 0;
  transform: translateY(-0.5rem);
  transition: all 0.2s;
`
const active = css`
  opacity: 1;
  transform: translateY(0);
`
const menuStyle = css`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.125rem 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
  }
`
const menuName = css`
  margin-left: 0.25rem;
`

export default HoverMenu