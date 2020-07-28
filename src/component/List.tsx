import React from 'react'
import _ from 'lodash'

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
        return html.replace(highlightKey, `<span className="highlightKey">${highlightKey}</span>`)
    }

    return (
        <ul className="list">
            {_.map(listData, (itm, idx) => <li
                className="list_item"
                key={ idx }
            >
                <p>name: {itm.node.name}</p>
                <p>description: <span dangerouslySetInnerHTML={{__html: highLight(itm.node.descriptionHTML)}} /></p>
                <p>star: {itm.node.stargazers.totalCount}</p>
            </li>)}
        </ul>
    )
}

export default List