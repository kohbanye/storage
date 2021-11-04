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
      // eslint-disable-next-line react/display-name
      icon: function () {
        return <FolderOutlinedIcon css={iconStyle(this.isSelected)} />
      },
      isSelected: router.pathname.includes('/dir'),
      path: '/dir',
    },
    {
      name: 'recent',
      // eslint-disable-next-line react/display-name
      icon: function () {
        return <AccessTimeIcon css={iconStyle(this.isSelected)} />
      },
      isSelected: router.pathname.includes('/recent'),
      path: '/recent',
    },
    {
      name: 'favorites',
      // eslint-disable-next-line react/display-name
      icon: function () {
        return <StarBorderIcon css={iconStyle(this.isSelected)} />
      },
      isSelected: router.pathname.includes('/favorites'),
      path: '/favorites',
    },
  ]

  return (
    <div css={container}>
      {menus.map((menu) => (
        <Link key={menu.name} href={menu.path}>
          <a css={[menuStyle, menu.isSelected && selected]}>
            {menu.icon()}
            <div css={[menuName, menu.isSelected && selectedMenuName]}>
              {menu.name}
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

const container = css`
  background-color: #ececec;
  padding: 0.5rem 1rem 0 0;
`
const iconStyle = (isSelected: boolean) => css`
  ${icon}
  margin-right: 0.5rem;
  ${!isSelected && 'color: #777777;'}
`
const menuStyle = css`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1.5rem 0.5rem 1rem;
  margin: 0.25rem 0.5rem;
  &:hover {
    background-color: #dbdbdb;
  }
`
const selected = css`
  background-color: #096e74;
  &:hover {
    background-color: #096e74;
  }
`
const menuName = css`
  color: #777777;
`
const selectedMenuName = css`
  color: #ffffff;
`

export default Sidebar
