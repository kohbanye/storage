import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { File, getDirectory } from 'lib/api'

interface DirectoryProps {
  files: File[]
}

const Directory = (props: DirectoryProps) => {
  const router = useRouter()

  return (
    <div>
      <ul>
        {props.files.map((file) => (
          <li key={file.name}>
            <a href={`${router.asPath}/${file.name}`}>{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const files = await getDirectory(`/${(context.query.path as string[]).join('/')}`)
  return {
    props: {
      files,
    },
  }
}

export default Directory
