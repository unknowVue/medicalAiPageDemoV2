import type { RouteObject } from 'react-router-dom'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import LazyLoad from '@/components/lazyLoad'
import { useEffect } from 'react'

function Redirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/mainLayout', { replace: true })
    }
  }, [navigate, location])
  return (
    <>
      <Outlet />
    </>
  )
}

function ConditionalNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // 只有当路径严格等于 /mainLayout 时才重定向
    if (location.pathname === '/mainLayout') {
      navigate('infoDashboard', { replace: true });
    }
  }, [navigate, location]);
  
  return null; // 不渲染内容
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Redirect />,
    children: [
      {
        path: '/mainLayout',
        element: LazyLoad(() => import('@/layout/mainLayout/index'))(),
        children: [
          {
            index: true, // 当访问 /mainLayout 时
            element: <ConditionalNavigate />
          },
          {
            path: 'infoDashboard',
            element: LazyLoad(() => import('@/pages/infoDashboard/index'))()
          },
          {
            path: 'literatureAdmin',
            element: LazyLoad(() => import('@/pages/literatureAdmin/index'))()
          },
          {
            path: 'aiResearchAssistant',
            element: LazyLoad(() => import('@/pages/aiResearchAssistant/index'))()
          }
        ]
      }
    ]
  },
]

export default routes