import { css } from '@emotion/react'
import Link from 'next/link'
import { icon } from 'styles/globals'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { MyFile } from 'lib/api'
import { useRouter } from 'next/router'
import { useRelativeTimes } from './use/useRelativeTime'

interface TableProps {
  files: MyFile[]
}

const DirectoryTable = ({ files }: TableProps) => {
  const router = useRouter()
  const relativeTimes = useRelativeTimes(files)

  const headers = [
    {
      label: 'name',
      style: css`
        width: 50%;
      `,
    },
    {
      label: 'modified',
      style: css`
        width: 25%;
      `,
    },
    {
      label: 'size',
      style: css`
        width: 25%;
      `,
    },
  ]

  return (
    <div css={container}>
      <table css={table}>
        <tr css={tableRow}>
          {headers.map((header) => (
            <th key={header.label} css={[tableHeader, header.style]}>
              {header.label}
            </th>
          ))}
        </tr>
        {files.map((file, index) => (
          <tr key={file.name} css={tableRow}>
            <td>
              {file.isDir ? (
                <Link href={`${router.asPath}/${file.name}`}>
                  <a css={[directory, directoryName]}>
                    <FolderIcon css={iconStyle} />
                    {file.name}
                  </a>
                </Link>
              ) : (
                <div css={directoryName}>
                  <InsertDriveFileIcon css={iconStyle} />
                  {file.name}
                </div>
              )}
            </td>
            <td align="center">{relativeTimes[index]}</td>
            <td align="center">{file.size}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
`
const table = css`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
`
const tableHeader = css`
  font-weight: normal;
`
const tableRow = css`
  td,
  th {
    border-bottom: 1px solid #c9c9c9;
    padding: 0.25rem 1rem;
  }
  th {
    padding-bottom: 0.5rem;
  }
`
const iconStyle = css`
  margin-right: 0.5rem;
  ${icon}
`
const directory = css`
  text-decoration: none;
  color: #000000;
  cursor: pointer;
`
const directoryName = css`
  display: flex;
  align-items: center;
`

export default DirectoryTable
