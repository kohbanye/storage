import { GetServerSideProps } from 'next'
import { css } from '@emotion/react'
import { File, getDirectory } from 'lib/api'
import DirectoryTable from 'components/directory/table'
import Button from 'components/directory/button'

interface DirectoryProps {
  files: File[]
}

const Directory = (props: DirectoryProps) => {
  return (
    <>
      <div css={buttons}>
        <Button name="create" />
        <Button name="upload" />
      </div>
      <div css={table}>
        <DirectoryTable files={props.files} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO
  /* const files = await getDirectory(`/${(context.query.path as string[]).join('/')}`) */
  return {
    props: {
      files: [
        {
          name: 'some_directory',
          isDir: true,
          size: 0,
          modified: new Date().toISOString(),
        },
        {
          name: 'a.txt',
          isDir: false,
          size: 1024,
          modified: new Date().toISOString(),
        },
        {
          name: 'b.txt',
          isDir: false,
          size: 1024,
          modified: new Date().toISOString(),
        },
        {
          name: 'c.txt',
          isDir: false,
          size: 1024,
          modified: new Date().toISOString(),
        },
      ],
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
