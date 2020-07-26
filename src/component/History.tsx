import React from 'react'
import _ from 'lodash'
import {
    Button,
} from 'antd'
import { 
    DeleteOutlined
} from '@ant-design/icons'

interface IProps {
    list: string[]
    onClean: () => void
    onClick: (itm: string) => void
}

const History: React.FC<IProps> = (props) => {
    const {
        list,
        onClean,
        onClick,
    } = props

    return (
        <div className="history">
            <Button 
                type="primary" 
                shape="circle" 
                icon={<DeleteOutlined />} 
                onClick={() => onClean()}
            />
            <ul className="history_list">
                {_.map(list, (itm, idx) => <li 
                    className="history_item"
                    key={ idx }
                    onClick={() => onClick(itm)}
                >
                    { itm }
                </li>)}
            </ul>
        </div>
    )
}

export default History