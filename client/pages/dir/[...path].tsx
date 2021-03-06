import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { css } from '@emotion/react'
import { MyFile, getDirectory } from 'lib/api'
import DirectoryTable from 'components/directory/table'
import Button from 'components/directory/button'
import CreateModal from 'components/modal/create'
import { HoverMenuName } from 'components/directory/hoverMenu'

interface DirectoryProps {
  files: MyFile[]
}

const Directory = (props: DirectoryProps) => {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [isFileModalOpen, setIsFileModalOpen] = useState(false)

  const handleOpenModal = (type: HoverMenuName) => {
    if (type === 'folder') {
      setIsFolderModalOpen(true)
    } else if (type === 'file') {
      setIsFileModalOpen(true)
    }
  }

  return (
    <>
      <div css={buttons}>
        <Button name="create" onClickMenu={handleOpenModal} />
        <Button name="upload" onClickMenu={() => {}} />
      </div>
      <div css={table}>
        <DirectoryTable files={props.files} />
      </div>
      <CreateModal
        menuName="folder"
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
      />
      <CreateModal
        menuName="file"
        isOpen={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const files = await getDirectory(
    `${(context.query.path as string[]).join('/')}`
  )
  return {
    props: {
      files: files,
    },
  }
}

const buttons = css`
  display: flex;
  padding-left: 1rem;
`
const table = css`
  padding: 0.5rem 2rem;
`

export default Directory
