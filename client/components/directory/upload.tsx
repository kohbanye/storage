import { ChangeEvent } from 'react'
import { css } from '@emotion/react'

interface UploadProps {
  children: React.ReactNode
  isFolder?: boolean
  onChange: (files: FileList) => void
}

const UploadFile = ({
  children,
  isFolder = false,
  onChange,
}: UploadProps) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      onChange(files)
    }
  }

  return (
    <label>
      {children}
      {isFolder ? (
        <input
          type="file"
          onChange={changeHandler}
          css={input}
          // @ts-expect-error
          webkitdirectory=""
          multiple={true}
        />
      ) : (
        <input type="file" onChange={changeHandler} css={input} />
      )}
    </label>
  )
}

const input = css`
  display: none;
`

export default UploadFile
