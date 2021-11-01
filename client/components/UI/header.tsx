import Image from 'next/image'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { css } from '@emotion/react'
import { icon, headerHeight } from 'styles/globals'
import logo from 'assets/storage.png'
import userIcon from 'assets/monterey.png'

const Header = () => {
  return (
    <div css={container}>
      <Image src={logo} alt="storage logo" width={160} height={45} />
      <div css={headerRight}>
        <MoreVertIcon css={iconStyle} />
        <Image
          src={userIcon}
          alt="user icon"
          css={userIconStyle}
          width="32"
          height="32"
        />
      </div>
    </div>
  )
}

const container = css`
  display: flex;
  align-items: center;
  background-color: #07575b;
  padding: 0.5rem 1rem;
  height: ${headerHeight};
`
const headerRight = css`
  display: flex;
  align-items: center;
  margin-left: auto;
`
const iconStyle = css`
  margin-left: auto;
  margin-right: 0.25rem;
  ${icon}
`
const userIconStyle = css`
  border-radius: 50%;
`

export default Header
