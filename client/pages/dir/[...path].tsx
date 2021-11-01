import { GetServerSideProps } from 'next'
import { File, getDirectory } from 'lib/api'
import DirectoryTable from 'components/directory/table'
import { css } from '@emotion/react'

interface DirectoryProps {
  files: File[]
}

const Directory = (props: DirectoryProps) => {
  return (
    <div css={table}>
      <DirectoryTable files={props.files} />
    </div>
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

const table = css`
  padding: 2rem;
`

export default Directory
