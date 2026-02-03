import { Button, Card, Group, Switch, type SelectProps } from '@mantine/core'
import scssStyle from './index.module.scss'
import { IconArrowUp, IconBolt, IconChevronLeft, IconChevronRight, IconExternalLink, IconMessageChatbot, IconMessageCircle, IconRefresh, IconSearch } from '@tabler/icons-react'
import { Form, Input, DatePicker, Row, Col, Tag, Card as AntdCard, Table, type TableProps, Select } from 'antd'
import { CloseOutlined, QuestionCircleOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import PageHeader from '@/components/pageHeader'
import Markdown from 'react-markdown'
import type { Dialogue, Message } from './types'

const options = [
  { value: 1, label: 'claude-opus-4-20250514', type: 'openal' },
  { value: 2, label: 'claude-opus-2-20250514', type: 'openal' },
]

const initDialogList = [
  {
    id: 1,
    msgList: []
  }
]

export default function AiResearchAssistant() {
  const getOption = (value: any) => {
    return options.find(item => item.value === value)
  } 

  const [dialogList, setDialogList] = useState<Dialogue[]>(initDialogList)
  const [selectedDialogue, setSelectedDialogue] = useState<null | number>(null)

  const [modelType, setModelType] = useState(0)

  const getDialog = (id: any) => {
    return dialogList.find(dialog => dialog.id === id)
  }

   const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // 重置高度，让 scrollHeight 准确
    textarea.style.height = 'auto';
    // 设置新高度（加 2px 避免滚动条闪烁）
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
  };
   useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleClickSendBtn = () => {
    if(!value) {
      return
    }
    setDialogList(dialogList.map(dialog => {
      if(dialog.id === selectedDialogue) {
        const msgLen = dialog.msgList.length
        dialog.msgList.push(
          {
            id: msgLen + 1,
            content: value,
            belongParty: 'user'
          },
          {
            id: msgLen + 2,
            content: '暂无回答内容',
            belongParty: 'ai'
          },
        )
      }
      return dialog
    }))
    setValue('')
  }

  return (
    <>
      <div className={scssStyle.container}>
        <Card style={{ height: '100vh', width: '350px', borderLeft: 'none', background: 'var(--surface)' }} shadow='xs' padding="lg" withBorder>
          <div className={scssStyle.header}>
            <p className={scssStyle.title}>AI 智能对话</p>
            <Button 
              leftSection={<IconMessageCircle size={14} />} 
              color="indigo" 
              radius="md" 
              variant="filled"
              style={{ fontSize: '12px',fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif' }}
              onClick={() => setSelectedDialogue(1)}
            >
              开始新对话
            </Button>
          </div>
          <div className={scssStyle['third-party-platform-head']}>
            <p className={scssStyle['third-party-platform-title']}>第三方AI平台:</p>
            <p className={scssStyle['third-party-platform-hint']}>无缝集成</p>
          </div>
          <div className={scssStyle['third-party-platform-btn']}>
            <Button 
              leftSection={<IconExternalLink size={14} />} 
              radius="sm" 
              variant="default"
              className={scssStyle.btn}
              style={{ fontSize: '12px', fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              DeepSeek
            </Button>
            <Button 
              leftSection={<IconExternalLink size={14} />} 
              radius="sm" 
              variant="default"
              className={scssStyle.btn}
              style={{ fontSize: '12px', fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              doubao
            </Button>
          </div>
          <p className={scssStyle['hint-1']}>点击按钮使用第三方AI平台</p>
          <p className={scssStyle['hint-2']}>注：部分平台可能需要在新标签页打开</p>
          <div className={scssStyle['model-change']}>
            <div 
              className={classNames(scssStyle['model-type'], modelType === 0 && scssStyle.active)}
              onClick={() => setModelType(0)}
            >
              <IconMessageChatbot size={17} />
              <span>单模型</span>
            </div>
            <div 
              className={classNames(scssStyle['model-type'], modelType === 1 && scssStyle.active)}
              onClick={() => setModelType(1)}
            >·
              <IconBolt size={17} />
              <span>多模型</span>
            </div>
          </div>
          <div className={scssStyle['model-select-header']}>
            <p className={scssStyle['model-select-title']}>选择模型:</p>
            <IconRefresh className={scssStyle.icon} size={17} />
          </div>
          <Select
            defaultValue={1}
            style={{ marginTop: '15px' }}
            options={options}
            optionRender={(option) => (
              <Group flex="1" gap="xs">
                <div style={{ borderRadius: '15px', padding: '0px 12px',paddingBottom: '3px', border: '1px solid var(--border)', background: 'var(--surface-alt)' }}>
                  {option.data.type}
                </div>
                {option.label}
              </Group>
            )}
            labelRender={(props) => (
              <Group flex="1" gap="xs" align='center'>
                <div style={{ borderRadius: '15px', padding: '0px 12px',paddingBottom: '3px', border: '1px solid var(--border)', background: 'var(--surface-alt)' }}>
                  {getOption(props.value)?.type}
                </div>
                {props.label}
              </Group>
            )}
          />
        </Card>
        <div className={scssStyle.content}>
          {
            !selectedDialogue && (
              <div className={scssStyle['welcome-chat-box']}>
                <div className={scssStyle['welcome-icon-box']}>
                  <IconMessageChatbot className={scssStyle.icon} size={40} />
                </div>
                <p className={scssStyle['welcome-title']}>欢迎使用 AI 智能对话</p>
                <p className={scssStyle['select-hint']}>选择一个模型开始对话，或创建新的对话会话</p>
                <Button 
                  leftSection={<IconMessageCircle size={20} />} 
                  radius="sm" 
                  variant="filled"
                  color='indigo'
                  size='md'
                  className={scssStyle.btn}
                  style={{ fontSize: '17px', fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', }}
                  onClick={() => setSelectedDialogue(1)}
                >
                  开始新对话
                </Button>
              </div>
            )
          }
          {
            selectedDialogue && (
              <div className={scssStyle['chat-container']}>
                <div className={scssStyle['chat-wrap']}>
                  <div>
                    {
                      getDialog(selectedDialogue)?.msgList.length ? (
                        <div className={scssStyle['msg-list']}>
                          {
                            getDialog(selectedDialogue)?.msgList.map(msg => (
                              <div className={classNames(scssStyle['msg-item'], scssStyle[msg.belongParty])}>
                                {
                                  msg.belongParty === 'user' && (
                                    <div className={scssStyle['user-msg-content']}>
                                      {msg.content}
                                    </div>
                                  )
                                }
                                {
                                  msg.belongParty === 'ai' && (
                                    <div className={scssStyle['ai-msg-content']}>
                                      {msg.content}
                                    </div>
                                  )
                                }
                              </div>
                            ))
                          }
                        </div>
                      ) : null
                    }
                    <div className={scssStyle['textarea-box']}> 
                      <textarea 
                        className={scssStyle['scroll-area']} 
                        placeholder='给 AI智能对话 发送消息' 
                        rows={2}
                        ref={textareaRef}
                        value={value}
                        onChange={handleChange}
                      ></textarea>
                      <div className={scssStyle.footer}>
                        <div className={scssStyle.left}>
                          <div className={scssStyle['util-btn']}>
                            <IconMessageCircle className={scssStyle.icon} size={15} />
                            <span>深度思考</span>
                          </div>
                          <div className={scssStyle['util-btn']}>
                            <IconMessageCircle className={scssStyle.icon} size={15} />
                            <span>联网搜索</span>
                          </div>
                        </div>
                        <div className={scssStyle.right}>
                          <div className={scssStyle['send-btn']} onClick={() => handleClickSendBtn()}>
                            <IconArrowUp className={scssStyle.icon} size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}