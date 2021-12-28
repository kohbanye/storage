import { GetServerSideProps } from 'next'
import { css } from '@emotion/react'
import { DBFile, getRecentFiles } from 'lib/api'
import DirectoryTable from 'components/directory/table'

interface RecentProps {
  files: DBFile[]
}

const Recent = (props: RecentProps) => {
  return (
    <div css={table}>
      <DirectoryTable files={props.files} />
    </div>
  )
}

const table = css`
  padding: 1rem 2rem;
`

export const getServerSideProps: GetServerSideProps = async () => {
  const files = await getRecentFiles()
  return {
    props: {
      files: files,
    },
  }
}

export default Recent
