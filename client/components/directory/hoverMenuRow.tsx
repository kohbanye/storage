import { css } from '@emotion/react'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined'
import { ButtonName } from './button'
import { HoverMenuName } from './hoverMenu'

interface HoverMenuRowProps {
  name: ButtonName
  menu: HoverMenuName
  onClickMenu: (name: HoverMenuName) => void
  onCloseMenu: () => void
}

const HoverMenuRow = ({ name, menu, onClickMenu, onCloseMenu }: HoverMenuRowProps) => {
  const switchIcon = (buttonName: ButtonName, hoverMenuName: HoverMenuName) => {
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

  const onClick = (menuName: HoverMenuName) => {
    onClickMenu(menuName)
    onCloseMenu()
  }

  return (
    <div key={menu} css={menuStyle} onClick={() => onClick(menu)}>
      {switchIcon(name, menu)}
      <div css={menuName}>{menu}</div>
    </div>
  )
}

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

export default HoverMenuRow
