import { getDirectory, MyFile } from 'lib/api'
import { GetServerSideProps } from 'next'
import Directory from './[...path]'

interface HomeDirectoryProps {
  files: MyFile[]
}

const HomeDirectory = ({files}: HomeDirectoryProps) => {
  return <Directory files={files} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const files = await getDirectory('/')
  return {
    props: {
      files,
    },
  }
}

export default HomeDirectory
