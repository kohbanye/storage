import Image from 'next/image'
import Link from 'next/link'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { css } from '@emotion/react'
import { icon, headerHeight } from 'styles/globals'
import logo from 'assets/storage.png'

const Header = () => {
  return (
    <div css={container}>
      <Link href="/dir" passHref>
        <Image
          src={logo}
          alt="storage logo"
          width={160}
          height={45}
          css={logoStyle}
        />
      </Link>
      <div css={headerRight}>
        <MoreVertIcon css={icon} />
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
const logoStyle = css`
  cursor: pointer;
`
const headerRight = css`
  display: flex;
  align-items: center;
  margin-left: auto;
`

export default Header
