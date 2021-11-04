import { css } from '@emotion/react'
import Link from 'next/link'
import Image from 'next/image'
import { icon } from 'styles/globals'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { MyFile } from 'lib/api'
import { useRouter } from 'next/router'
import { useRelativeTimes } from './use/useRelativeTime'
import { fileSizeToString } from 'lib/unit'
import emptyFolder from 'assets/empty_folder.svg'

interface TableProps {
  files: MyFile[]
}

const DirectoryTable = ({ files }: TableProps) => {
  const router = useRouter()
  const relativeTimes = useRelativeTimes(files) as string[]

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
      {files !== null ? (
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
              <td align="center">
                {file.isDir ? '---' : fileSizeToString(file.size)}
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <div css={emptyMessage}>
          <Image src={emptyFolder} alt="empty folder" width="100" height="100" />
          <div css={messageHeader}>This folder is empty.</div>
          <div css={messageContent}>You can add files and folders.</div>
        </div>
      )}
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
  &:hover {
    td {
      background-color: #f5f5f5;
    }
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
const emptyMessage = css`
  text-align: center;
`
const messageHeader = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`
const messageContent = css`
  font-size: 1.25rem;
`

export default DirectoryTable
