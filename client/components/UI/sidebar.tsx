import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { icon } from 'styles/globals'
import Link from 'next/link'

const Sidebar = () => {
  const router = useRouter()

  const menus = [
    {
      name: 'all files',
      icon: <FolderOutlinedIcon css={iconStyle} />,
      isSelected: router.pathname.includes('/dir'),
      path: '/dir',
    },
    {
      name: 'recent',
      icon: <AccessTimeIcon css={iconStyle} />,
      isSelected: router.pathname.includes('/recent'),
      path: '/recent',
    },
    {
      name: 'favorites',
      icon: <StarBorderIcon css={iconStyle} />,
      isSelected: router.pathname.includes('/favorites'),
      path: '/favorites',
    },
  ]

  return (
    <div css={container}>
      {menus.map((menu) => (
        <Link key={menu.name} href={menu.path}>
          <a css={[menuStyle, menu.isSelected && selected]}>
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
  &:hover {
    background-color: #5d9aa8;
  }
`
const selected = css`
  background-color: #51898f;
  &:hover {
    background-color: #51898f;
  }
`
const menuName = css`
  color: #ffffff;
  padding-right: 0.25rem;
`

export default Sidebar
