import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import { uploadFile } from 'lib/api'
import { useRef } from 'react'
import { ButtonName } from './button'
import UploadFile from './upload'
import HoverMenuRow from './hoverMenuRow'
import { useClickOutside } from './use/useClickOutside'

const menus = ['folder', 'file'] as const
export type HoverMenuName = typeof menus[number]

interface HoverMenuProps {
  name: ButtonName
  isOpen: boolean
  onClickMenu: (name: HoverMenuName) => void
  onCloseMenu: () => void
  onClickOutside: () => void
}

const HoverMenu = ({
  name,
  isOpen,
  onClickMenu,
  onCloseMenu,
  onClickOutside,
}: HoverMenuProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  useClickOutside(isOpen, divRef, onClickOutside)

  const router = useRouter()
  const uploadFiles = async (files: FileList) => {
    if (files.length === 1) {
      uploadFile(
        `${router.asPath.replace('/dir', '')}/${files[0].name}`,
        files[0]
      )
    } else {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i) as File
        uploadFile(
          `${router.asPath.replace('/dir', '')}/${file.webkitRelativePath}`,
          file
        )
      }
    }

    router.push(router.asPath)
  }

  return (
    <div ref={divRef} css={[container, isOpen && active]}>
      {menus.map((menu) =>
        name === 'create' ? (
          <HoverMenuRow
            name={name}
            menu={menu}
            onClickMenu={onClickMenu}
            onCloseMenu={onCloseMenu}
          ></HoverMenuRow>
        ) : (
          <UploadFile isFolder={menu === 'folder'} onChange={uploadFiles}>
            <HoverMenuRow
              name={name}
              menu={menu}
              onClickMenu={onClickMenu}
              onCloseMenu={onCloseMenu}
            ></HoverMenuRow>
          </UploadFile>
        )
      )}
    </div>
  )
}

const buttonHeight = '3.25rem'
const container = css`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #c9c9c9;
  border-radius: 0.5rem;
  top: calc(${buttonHeight} + 2px);
  left: 15%;
  width: 70%;
  z-index: 1;

  visibility: hidden;
  opacity: 0;
  transform: translateY(-0.5rem);
  transition: all 0.2s;
`
const active = css`
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
`

export default HoverMenu
