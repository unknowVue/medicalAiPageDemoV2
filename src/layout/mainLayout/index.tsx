import React, { useMemo, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import scssStyle from './mainLayou.module.scss'
import { BarChartOutlined, FolderOpenOutlined, MessageOutlined } from "@ant-design/icons"
import { MenuItemId, type MenuItem } from './types'
import classNames from "classnames"

// 待做：应该把menu组件封装出去

const initialMenuList: MenuItem[] = [
  {
    title: '情报看板',
    desc: '查看订阅和分析报告',
    id: MenuItemId.INFO_DASHBOARD,
    icon: <BarChartOutlined />,
    toPath: '/mainLayout/infoDashboard'
  },
  {
    title: '文献管理',
    desc: '管理和搜索上传的文件数据',
    id: MenuItemId.LITERATURE_ADMIN,
    icon: <FolderOpenOutlined />,
    toPath: '/mainLayout/literatureAdmin'
  },
  {
    title: 'AI科研助手',
    desc: '与AI模型进行智能对话交流',
    id: MenuItemId.AI_RESEARCH_ASSISTANT,
    icon: <MessageOutlined />,
    toPath: '/mainLayout/aiResearchAssistant',
    contentStyle: { padding: 0 }
  },
]

export default function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const initMenu = initialMenuList.find(menu => menu.toPath === location.pathname)?.id || MenuItemId.INFO_DASHBOARD

  const [menuList,setMenuList] = useState(initialMenuList)
  const [activeMenu, setActiveMenuItem] = useState<MenuItemId>(initMenu)
  
  const handleClickMenu = (menu: MenuItem) => {
    setActiveMenuItem(menu.id)
    navigate(menu.toPath)
  }

  const currentMenu = useMemo(() => {
    return menuList.find(menu => menu.id === activeMenu)
  }, [menuList, activeMenu])

  return (
    <div className={scssStyle.app}>
      <aside className={scssStyle.sidebar}>
        <div className={scssStyle.brand}>
          <div className={scssStyle.logo}>Q</div>
          <div className={scssStyle.brandText}>
            <div className={scssStyle.brandTitle}>情报中台</div>
            <div className={scssStyle.brandSub}>Qingbao Kanban</div>
          </div>
        </div>
        <div className={scssStyle.sectionTitle}>模块导航</div>
        <nav className={scssStyle.menuList}>
          {
            menuList.map((menu) => (
              <div 
                key={menu.id} 
                className={classNames(scssStyle.menuItem, (activeMenu === menu.id) && scssStyle.active)}
                onClick={handleClickMenu.bind(null, menu)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handleClickMenu(menu)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-current={activeMenu === menu.id ? 'page' : undefined}
              >
                <div className={scssStyle.menuIcon}>
                  {menu.icon}
                </div>
                <div className={scssStyle.menuContent}>
                  <div className={scssStyle.menuTitle}>{menu.title}</div>
                  <div className={scssStyle.menuDesc}>{menu.desc}</div>
                </div>
              </div>
            ))
          }
        </nav>
      </aside>
      <div className={scssStyle.main}>
        <header className={scssStyle.topbar}>
          <div className={scssStyle.context}>
            <div className={scssStyle.contextTitle}>{currentMenu?.title}</div>
            <div className={scssStyle.contextDesc}>{currentMenu?.desc}</div>
          </div>
        </header>
        <div className={scssStyle.content} style={ currentMenu?.contentStyle || {} }>
          <Outlet />
        </div>
      </div>
    </div>
  )
}