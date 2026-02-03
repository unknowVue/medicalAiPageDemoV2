import { Button, Card, Switch } from '@mantine/core'
import scssStyle from './index.module.scss'
import { IconSearch } from '@tabler/icons-react'
import { Form, Input, Card as AntdCard, Table, type TableProps, type PaginationProps } from 'antd'
import { QuestionCircleOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import type { DataType } from './types'
import PageHeader from '@/components/pageHeader'
import { literatureData } from './mock'

const columns: TableProps<DataType>['columns'] = [
  {
    title() {
      return (
        <div style={{ color: 'var(--text-muted)' }}>标题</div>
      )
    },
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a style={{ fontWeight: 600, color: 'var(--primary)' }}>{text}</a>,
  },
];

export default function LiteratureAdmin() {
  const markdown = "# Hello,Reacr Markdown"
  const [form] = Form.useForm()
  const [searchForm, setSearchForm] = useState({ keyword: '' })  
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const [list, setList] = useState<any[]>([])

  const pagination = useRef<PaginationProps>({
      showQuickJumper: true,
      hideOnSinglePage: false,
      showSizeChanger: true,
      current: 1,
      pageSize: 10,
      total: 0,
      size: "default",
      pageSizeOptions: [10, 20, 50],
      locale: {
        jump_to: "跳转至",
        items_per_page: "/ 页",
        page: "",
      },
      onChange: (page, pageSize) => {
        pagination.current.current = page;
        pagination.current.pageSize = pageSize;
        getList();
      },
    });

  
  const getList = () => {
    let res = []
    // 根据关键字搜索
    const keyword = searchForm.keyword || ''
    res = literatureData.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()))

    const { current, pageSize } = pagination.current
    const resByPage = res.slice((current! - 1) * pageSize!, current! * pageSize!)
      setList(resByPage)
      pagination.current.total = res.length
    }

    const searchData = () => {
      pagination.current.current = 1;
      getList()
    }

  useEffect(() => {
    getList()
  }, [])


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
              <Button leftSection={<IconSearch size={14} />} size='xs' variant="default" onClick={searchData}>
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
      {/* 文献管理列表 */}

      <Card style={{ marginTop: '20px' }} withBorder shadow="sm" radius="md">
        <Card.Section>
          <div className={scssStyle['list-header']}>
            <div className={scssStyle.left}>
              <div className={scssStyle['list-title']}>文献管理列表</div>
            </div>
            <div className={scssStyle.right}>
              <span>共</span>
              <span>{pagination.current.total}</span>
              <span>条</span>
            </div>
          </div>
        </Card.Section>
      <Card.Section bg={'var(--surface-alt)'}>
          <div className={scssStyle['list-content']}>
            <Table<DataType> 
              rowKey='id'
              columns={columns} 
              dataSource={list}
              pagination={pagination.current}
              rowClassName='table-row'
              expandable={{
                expandedRowRender: (record) => (
                  // 这里应该是一个无限展开，因为是不清楚多少层可以展开，应该是这样一个数据结构，只要children有值就需要展开
                  /**
                   * [
                   *    {
                   *      title: 'xx',
                   *      children: [
                   *          {
                   *              title: 'xx',
                   *              children: []
                   *           }
                   *        ] 
                   *     }
                   * ]
                   */
                  <div>
                     {record.content}
                  </div>
                ),
                expandedRowKeys: expandedRowKeys,  // 使用状态控制展开的行
                onExpand: (expanded, record) => {
                  if (expanded) {
                    setExpandedRowKeys([record.id]);
                  } else {
                    setExpandedRowKeys([]);
                  }
                },
                columnWidth: 70,
                expandIcon({ expanded, record }) {
                  return (
                    <div 
                      onClick={() => {
                      // 切换展开状态
                      setExpandedRowKeys(prev => 
                        prev.includes(record.id) ? [] : [record.id]
                      );
                    }}
                      style={{ cursor: 'pointer' }}
                    >
                        {expanded ? <UpOutlined /> : <RightOutlined />}
                    </div>
                  )
                }
              }}
            />
          </div>
        </Card.Section>
      </Card>
    </>
  )
}