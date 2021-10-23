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

export default Directory
