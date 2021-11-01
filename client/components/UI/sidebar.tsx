import { css } from '@emotion/react'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { icon } from 'styles/globals'
import Link from 'next/link'

const Sidebar = () => {
  const menus = [
    {
      name: 'all files',
      icon: <FolderOutlinedIcon css={iconStyle} />,
      path: '/',
    },
    {
      name: 'recent',
      icon: <AccessTimeIcon css={iconStyle} />,
      path: '/recent',
    },
    {
      name: 'favorites',
      icon: <StarBorderIcon css={iconStyle} />,
      path: '/favorites',
    },
  ]

  return (
    <div css={container}>
      {menus.map((menu) => (
        <Link key={menu.name} href={menu.path}>
          <a css={menuStyle}>
            {menu.icon}
            <div css={menuName}>{menu.name}</div>
          </a>
        </Link>
      ))}
    </div>
  )
}

const container = css`
  background-color: #66a5ad;
  padding-top: 0.5rem;
`
const iconStyle = css`
  margin-right: 0.5rem;
  ${icon}
`
const menuStyle = css`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
`
const menuName = css`
  color: #ffffff;
  padding-right: 0.25rem;
`

export default Sidebar
