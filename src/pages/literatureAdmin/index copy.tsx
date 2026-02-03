import { Button, Card, Switch } from '@mantine/core'
import scssStyle from './index.module.scss'
import { IconChevronLeft, IconChevronRight, IconRefresh, IconSearch } from '@tabler/icons-react'
import { Form, Input, DatePicker, Row, Col, Tag, Card as AntdCard, Table, type TableProps, InputNumber } from 'antd'
import { CloseOutlined, QuestionCircleOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import PageHeader from '@/components/pageHeader'
import Markdown from 'react-markdown'
import { literatureData } from './mock'

export default function LiteratureAdmin() {
  const markdown = "# Hello,Reacr Markdown"
  const [form] = Form.useForm()
  const [searchForm, setSearchForm] = useState({ keyword: '' })

  const [list, setList] = useState<any[]>([])

  const pagination = useRef<any>({
    current: 0,
    total: 0,
    quickPage: null
  })
  const [count, setCount] = useState(1)
  
  const forceRender = () => {
    setCount(count === 1 ? 0 : 1)
  }
  
  const getList = () => {
    let res = []
    // 根据关键字搜索
    let keyword = searchForm.keyword || ''
    res = literatureData.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()))
    pagination.current.total = res.length
    setList(res)
    pagination.current.current = 0
    if(res.length > 0) {
      pagination.current.current = 1
      pagination.current.quickPage = null
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const handleChangePage = (page: number) => {
    pagination.current.current = page
    // useRef的值改变不会触发组件重新渲染，所以手动强制更新一个useState的值
    forceRender()
  }

  const handleClickJumpPage = () => {
    if (pagination.current.quickPage) {
      pagination.current.current = pagination.current.quickPage
      pagination.current.quickPage = null
      // useRef的值改变不会触发组件重新渲染，所以手动强制更新一个useState的值
      forceRender()
    }
  }

  return (
    <>
      <PageHeader
        tile='文献管理'
        subTitle='管理和搜索上传的文献数据'
      >
      </PageHeader>
      {/* 搜索 */}
      <Card style={{ marginTop: '15px' }} shadow='xs' padding="lg" radius="md" withBorder>
        <Form
          layout='horizontal'
          form={form}
          className={scssStyle.searchForm}
        >
          <div className={scssStyle['form-wrap']}>
            <div className={scssStyle['input-box']}>
              {/* <Form.Item label="" name="keyword"> */}
                <Input 
                  placeholder="搜索文献标题、概要或内容" 
                  onChange={(e) => { setSearchForm({ ...searchForm, keyword: e.target.value }) }} 
                  value={searchForm.keyword}
                />
              {/* </Form.Item> */}
            </div>
            <div>
              <Button leftSection={<IconSearch size={14} />} size='xs' variant="default" onClick={getList}>
                搜索
              </Button>
            </div>
            <div style={{ marginLeft: '10px' }}>
              <Switch
                withThumbIndicator={false}
                labelPosition="left"
                label={
                  (
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '3px' }}>
                      <span style={{ color: '#757575' }}>PubMed</span>
                      <QuestionCircleOutlined style={{ color: '#b9b9b9ff' }} />
                    </div>
                  )
                }
              />
            </div>
          </div>
        </Form>
      </Card>
      {/* 文章 */}
      <Card style={{ marginTop: '20px' }} shadow='xs' padding="lg" radius="md" withBorder>
        <div className={scssStyle.pagination}>
          <Button 
            disabled={pagination.current.current <= 1} 
            className={scssStyle.prePage} 
            leftSection={<IconChevronLeft size={14} />} 
            size='xs' 
            variant="default"
            onClick={() => handleChangePage(pagination.current.current - 1)}
          >
            上一页
          </Button>
          <span className={scssStyle.page}>第 {pagination.current.current} / {pagination.current.total}</span>
          <Button 
            disabled={pagination.current.current >= pagination.current.total}
            className={scssStyle.prePage} 
            rightSection={<IconChevronRight size={14} />} 
            size='xs' 
            variant="default"
            onClick={() => handleChangePage(pagination.current.current + 1)}
          >
            下一页
          </Button>
          <div className={scssStyle['vertical-line']}></div>
          <div className={scssStyle['jump-box']}>
            <span className={scssStyle.jump}>跳至</span>
            <InputNumber placeholder='' style={{ width: '60px' }} onChange={(val) => { pagination.current.quickPage = val; forceRender() }} value={pagination.current.quickPage}  />
            <Button size='xs' variant="default" style={{ color: '#8b8b8bff' }} onClick={handleClickJumpPage}>
              跳转
            </Button>
          </div>
        </div>
        <div style={{ paddingTop: '40px' }}>
          {/* <Markdown>{markdown}</Markdown> */}
          {
            list[pagination.current.current - 1] ? (
              list[pagination.current.current - 1].content
            ) : null
          }
        </div>
      </Card>
    </>
  )
}