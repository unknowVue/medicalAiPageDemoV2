import { Button, Card } from '@mantine/core'
import scssStyle from './index.module.scss'
import { IconRefresh } from '@tabler/icons-react'
import { Form, Input, DatePicker, Row, Col, Tag, Card as AntdCard, Table, type TableProps, type PaginationProps, message } from 'antd'
import { CloseOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import type { SelectTimeOption, ArrayKeys, DataType } from './types'
import classNames from 'classnames'
import PageHeader from '@/components/pageHeader'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { flushSync } from 'react-dom'

const initialSelectTimeOptions = [
  {
    label: '今天',
    value: 'today'
  },
  {
    label: '三天内',
    value: 'threeDays'
  },
  {
    label: '一周内',
    value: 'week'
  },
  {
    label: '近一个月',
    value: 'month'
  },
  {
    label: '近半年',
    value: 'halfYear'
  },
  {
    label: '近一年',
    value: 'year'
  }
]

const data: DataType[] = [
  {
    id: 1,
    title: 'Approach to the Cardiac Patient',
    // children: [
    //   {
    //     id: 11,
    //     title: 'Introduction to the Cardiac Patient',
    //     time: '2026-01-01',
    //     describe: '内容'
    //   },
    //   {
    //     id: 22,
    //     title: 'Cardiovascular Examination',
    //     time: '2026-01-02',
    //     describe: '内容'
    //   },
    //   {
    //     id: 33,
    //     title: 'Cardiac Auscultation',
    //     time: '2026-01-03',
    //     describe: '内容'
    //   }
    // ],
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2026-01-01',
    describe: '内容',
    source: 'Avidity',
    classify: 'news'
  },
  {
    id: 2,
    title: 'Symptoms of Cardiovascular Disorders',
    subTitleList: ['Chest Pain', 'Edema', 'Limb Pain', 'Orthostatic Hypotension', 'Palpitations', 'Syncope'],
    time: '2026-01-02',
    describe: '内容',
    source: 'REGENERON',
    classify: 'events'
  },
  {
    id: 3,
    title: 'Cardiovascular Tests and Procedures',
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2025-01-03',
    describe: '内容',
    source: 'WAVE',
    classify: 'events'
  },
  {
    id: 4,
    title: 'Overview of Arrhythmias and Conduction Disorders',
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2025-01-01',
    describe: '内容',
    source: 'WAVE',
    classify: 'events'
  },
  {
    id: 5,
    title: "Specific Cardiac Arrhythmias",
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2025-12-10',
    describe: '内容',
    source: 'REGENERON',
    classify: 'events'
  },
  {
    id: 6,
    title: 'Arrhythmogenic Cardiac Disorders',
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2025-12-09',
    describe: '内容',
    source: 'WAVE',
    classify: 'events'
  },
  {
    id: 7,
    title: "Arteriosclerosis",
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2025-12-08',
    describe: '内容',
    source: 'Avidity',
    classify: 'news'
  },
  {
    id: 8,
    title: "Cardiac Tumors",
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2025-11-08',
    describe: '内容',
    source: 'REGENERON',
    classify: 'events'
  },
  {
    id: 9,
    title: "Cardiomyopathies",
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2026-01-01',
    describe: '内容',
    source: 'WAVE',
    classify: 'events'
  },
  {
    id: 10,
    title: "Diseases of the Aorta and Its Branches",
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2026-01-06',
    describe: '内容',
    source: 'Avidity',
    classify: 'news'
  },
  {
    id: 11,
    title: "Myocarditis and Pericarditis",
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2026-01-03',
    describe: '内容',
    source: 'REGENERON',
    classify: 'events'
  },
  {
    id: 12,
    title: "Peripheral Artery Disorders",
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2026-06-04',
    describe: '内容',
    source: 'WAVE',
    classify: 'events'
  },
  {
    id: 13,
    title: "Peripheral Venous Disorders",
    subTitleList: ['Introduction to the Cardiac Patient', 'Cardiovascular Examination', 'Cardiac Auscultation'],
    time: '2026-01-04',
    describe: '内容',
    source: 'REGENERON',
    classify: 'events'
  },
];

export function dayjsToString(dayjsObj: Dayjs, format = 'YYYY-MM-DD'): string {
  return dayjsObj.format(format);
}

export default function InfoDashboard() {
  const [form] = Form.useForm()
  const [selectTimeOptions, setSelectTimeOptions] = useState<SelectTimeOption[]>(initialSelectTimeOptions)
  const [currentTimeOption, setCurrentTimeOption] = useState<null | string>(null)

  const [tableData, setTableData] = useState<DataType[]>([])
  const [tableFilters, setTableFilters] = useState<Record<string, (string | number)[] | null>>({})

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
  {
    title() {
      return (
        <div style={{ color: 'var(--text-muted)' }}>来源</div>
      )
    },
    dataIndex: 'source',
    key: 'source',
    filteredValue: tableFilters.source || null,
    render: (text) => <span style={{ color: '#fff', background: 'var(--primary)', border: '1px', borderRadius: '999px', padding: '2px 8px' }}>{text}</span>,
    filters:[
      {
        text: 'Avidity',
        value: 'Avidity'
      },
      {
        text: 'REGENERON',
        value: 'REGENERON'
      },
      {
        text: 'WAVE',
        value: 'WAVE'
      }
    ],
    onFilter: (value, record) => record.source.indexOf(value as string) === 0,
  },
  {
    title() {
      return (
        <div style={{ color: 'var(--text-muted)' }}>分类</div>
      )
    },
    dataIndex: 'classify',
    key: 'classify',
    filteredValue: tableFilters.classify || null,
    render: (text) => <span style={{ color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '999px', padding: '2px 8px', background: 'var(--surface-alt)' }}>{text}</span>,
    filters:[
      {
        text: 'news',
        value: 'news'
      },
      {
        text: 'events',
        value: 'events'
      }
    ],
    onFilter: (value, record) => record.classify.indexOf(value as string) === 0,
  },
  {
    title() {
      return (
        <div style={{ color: 'var(--text-muted)' }}>时间</div>
      )
    },
    dataIndex: 'time',
    key: 'time',
    render: (text) => <span style={{ color: 'var(--text-muted)' }}>{text}</span>,
  },
];

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
      getTableList();
    },
  });

  const handleCancelSelectTimeOption = () => {
    setCurrentTimeOption('')
  }

  const getTableList = (filters?: Record<string, (string | number)[] | null>) => {
    const values = form.getFieldsValue()
    // 第一步：根据关键字去筛选
    let res = [...data]
    const w = form.getFieldValue('keyword') || ''
    if (w) {
    res = res.filter(item => 
      item.title.toLowerCase().includes(w.toLowerCase()) ||
      (item.source && item.source.toLowerCase().includes(w.toLowerCase())) ||
      (item.classify && item.classify.toLowerCase().includes(w.toLowerCase()))
    )
  }

  // 应用表格筛选器
    if (filters && Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, filterValues]) => {
        if (filterValues && filterValues.length > 0) {
          res = res.filter(item => filterValues.includes(item[key]))
        }
      })
    }
    // res = data.filter(item => item.title.toLowerCase().includes(w.toLowerCase()))
    // 第二步：根据时间去筛选
    let timeRanges: string[] = []
    if(values.timeRange) {
      timeRanges = [dayjsToString(values.timeRange[0]), dayjsToString(values.timeRange[1])]
    }
    if(currentTimeOption) {
      if(currentTimeOption === 'week') {
        timeRanges = [
          dayjsToString(dayjs().subtract(1, 'week').startOf('day')), // 一年前的今天
          dayjsToString(dayjs().endOf('day')) // 今天结束
        ];
      } else if(currentTimeOption === 'month') {
        timeRanges = [
          dayjsToString(dayjs().subtract(1, 'month').startOf('day')), // 一年前的今天
          dayjsToString(dayjs().endOf('day')) // 今天结束
        ];
      } else if(currentTimeOption === 'year') {
        timeRanges = [
          dayjsToString(dayjs().subtract(1, 'year').startOf('day')), // 一年前的今天
          dayjsToString(dayjs().endOf('day')) // 今天结束
        ];
      } else if(currentTimeOption === 'threeDays') {
        timeRanges = [
          dayjsToString(dayjs().subtract(2, 'day').startOf('day')), // 前天开始
          dayjsToString(dayjs().endOf('day')) // 今天结束
        ]
      } else if(currentTimeOption === 'today') {
        timeRanges = [
          dayjsToString(dayjs().startOf('day')),
          dayjsToString(dayjs().endOf('day'))
        ]
      } else if(currentTimeOption === 'halfYear') {
        timeRanges = [
          dayjsToString(dayjs().subtract(5, 'month').startOf('month')), // 6个月前月初
          dayjsToString(dayjs().endOf('month')) // 当前月月末
        ]
      }
    }
    if(timeRanges.length > 0) {
      console.log(timeRanges);
      
      res = res.filter(item => item.time >= timeRanges[0] && item.time <= timeRanges[1])
    }
    // 分页
    let { current, pageSize } = pagination.current
    let resByPage = res.slice((current! - 1) * pageSize!, current! * pageSize!)
    setTableData(resByPage)
    pagination.current.total = res.length
  }

  const searchData = () => {
    pagination.current.current = 1
    getTableList()
  }

const handleClickClearForm = () => {
  form.resetFields()
  pagination.current.current = 1
  setCurrentTimeOption(null)
  setTableFilters({});
  getTableList({})
}

const handleColumnsFilterChange = (pagination, filters, sorter, extra) => {
  console.log('表格外部筛选:', pagination, filters, sorter, extra);

  setTableFilters(filters);
  getTableList(filters)
}

  useEffect(() => {
    setCurrentTimeOption('week')
  },[])

  useEffect(() => {
    if(currentTimeOption !== null) {
      pagination.current.current = 1
      getTableList()
    }
  },[currentTimeOption])

  return (
    <>
      <PageHeader
        tile='情报看板'
        subTitle='情报数据概览'
      >
        <PageHeader.Right>
          <Button leftSection={<IconRefresh size={14} />} variant="default" onClick={searchData}>
            刷新数据
          </Button>
        </PageHeader.Right>
      </PageHeader>
      {/* 查询 */}
      <Card style={{ marginTop: '15px' }} shadow="sm" padding="lg" radius="md" withBorder>
        <Form
          layout='vertical'
          form={form}
          className={scssStyle.searchForm}
        >
          <Row gutter={[20,20]}>
            <Col span={12}>
              <Form.Item label="关键字" name="keyword">
                <Input placeholder="请输入关键字或公司名称搜索" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="开始日期-结束日期" name="timeRange">
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                  onChange={(value, dateString) => {
                    console.log('Selected Time: ', value);
                    console.log('Formatted Selected Time: ', dateString);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* 分割线 */}
        <div className={scssStyle.divider}></div>
        {/* 清除筛选 */}
        <div
          className={scssStyle['clear-search']}
          onClick={handleClickClearForm}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleClickClearForm()
            }
          }}
          role="button"
          tabIndex={0}
        >
          <CloseOutlined />
          <span>清除筛选</span>
        </div>
      </Card>
      {/* 当前筛选 */}
      <div className={scssStyle['current-filter']}>
        <span className={scssStyle['current-filter-title']}>当前筛选:</span>
        <div className={scssStyle['filter-label-list']}>
          {
            currentTimeOption && (
              <Tag 
                styles={{
                  root: {
                    background: '#fff2df',
                    color: '#9a4a1e',
                    borderRadius: '999px'
                  },
                }}
                closeIcon={<CloseOutlined style={{ fontSize: '9px' }} />} 
                onClose={handleCancelSelectTimeOption}
              >
                快速选择: {initialSelectTimeOptions.find(item => item.value === currentTimeOption)?.label}
              </Tag>
            )
          }
        </div>
      </div>
      {/* 情报监测列表 */}
      <Card style={{ marginTop: '20px' }} withBorder shadow="sm" radius="md">
        <Card.Section>
          <div className={scssStyle['list-header']}>
            <div className={scssStyle.left}>
              <div className={scssStyle['list-title']}>情报监测列表</div>
              <div className={scssStyle['time-options-list']}>
                {
                  selectTimeOptions.map((option) => (
                    <div 
                      key={option.value} 
                      className={classNames(scssStyle['time-option'], (currentTimeOption === option.value) && scssStyle.active)}
                      onClick={() => setCurrentTimeOption(option.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setCurrentTimeOption(option.value)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      {option.label}
                    </div>
                  ))
                }
              </div>
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
              dataSource={tableData}
              pagination={pagination.current}
              rowClassName='table-row'
              onChange={handleColumnsFilterChange}
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
                    {
                      record.subTitleList.map((item, index) => (
                        <div key={index} style={{ color: 'var(--text)' }}>
                          {item}
                        </div>
                      ))
                    }
                  </div>
                ),
                columnWidth: 70,
                expandIcon({ expanded, onExpand, record }) {
                  return (
                    <div 
                      onClick={(e) => onExpand(record, e)}
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