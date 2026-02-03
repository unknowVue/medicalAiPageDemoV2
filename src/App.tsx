import { useRoutes } from 'react-router-dom'
import routes from '@/router/index'
import { MantineProvider } from '@mantine/core'

function App() {
  const element = useRoutes(routes)

  return (
    <>
    <MantineProvider
      theme={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif',
        primaryColor: 'teal',
        defaultRadius: 'md'
      }}
    >
      {element}
    </MantineProvider>
    </>
  )
}

export default App
