import React, { type FC, type ReactNode } from 'react';
import scssStyle from './index.module.scss'

interface Props {
  children?: ReactNode;
  tile: string;
  subTitle: string
}
interface SubComponents {
  Right: FC<{ children?: ReactNode }>;
}

const PageHeader: FC<Props> & SubComponents = ({ children, tile, subTitle }) => {
  const Right = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === PageHeader.Right
  );
  return (
    <>
      <div className={scssStyle.header}>
        <div className={scssStyle.left}>
          <div className={scssStyle.title}>{tile}</div>
          <div className={scssStyle.subTitle}>{subTitle}</div>
        </div>
        <div className={scssStyle.right}>
          {Right || null}
        </div>
      </div>
    </>
  )
}

// 定义子组件
PageHeader.Right = ({ children }) => <>{children}</>

export default PageHeader