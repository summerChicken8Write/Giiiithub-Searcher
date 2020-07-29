import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import {
    BookOutlined,
    StarOutlined,
} from '@ant-design/icons'
import './style/List.css'

interface IPorps {
    listData: any[]
    highlightKey: string
}

const List: React.FC<IPorps> = (props) => {
    const {
        listData,
        highlightKey,
    } = props

    const highLight = (html: string) => {
        return html.replace(highlightKey, `<strong>${highlightKey}</strong>`)
    }

    const openUrl = (url:string) => {
        return window.open(`https://github.com/${url}`)
    }

    return (
        <ul className="list">
            {_.map(listData, (itm, idx) => <li
                className="list_item"
                key={ idx }
            >
                <p 
                    className="list_item--name"
                    onClick={() => openUrl(itm.node.nameWithOwner)}
                >
                    <BookOutlined />
                    {itm.node.nameWithOwner}
                </p>
                <p
                    className="list_item--description"
                >
                    <span dangerouslySetInnerHTML={{__html: highLight(itm.node.descriptionHTML)}} />
                </p>
                <p
                    className="list_item--info"
                >
                    <StarOutlined />
                    {itm.node.stargazers.totalCount}
                    <span 
                        className="list_item--circle"
                        style={{
                            backgroundColor: itm.node.languages.edges[0].node.color
                        }}
                    />
                    <span className="list_item--language">
                        {itm.node.languages.edges[0].node.name}
                    </span>
                    <span className="list_item--update">
                        Updated on
                        {moment(itm.node.updatedAt).format('YYYY/MM/DD HH:mm:ss')}
                    </span>
                </p>
            </li>)}
        </ul>
    )
}

export default List