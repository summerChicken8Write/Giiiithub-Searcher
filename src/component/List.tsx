import React from 'react'
import _ from 'lodash'

interface IPorps {
    listData: any[]
}

const List: React.FC<IPorps> = (props) => {
    const {
        listData
    } = props

    return (
        <ul className="list">
            {_.map(listData, (itm, idx) => <li
                className="list_item"
                key={ idx }
            >
                <p>name: {itm.node.name}</p>
                <p>description: {itm.node.description}</p>
                <p>star: {itm.node.stargazers.totalCount}</p>
            </li>)}
        </ul>
    )
}

export default List