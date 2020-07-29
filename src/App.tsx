import React, {
    useState,
} from 'react';
import {
    Input,
    Select,
    Button,
    Spin,
} from 'antd';
import _ from 'lodash';
import List from './component/List';
import History from './component/History'
import './App.css';
import {
    useDebounce,
    getHistory,
    addHistory,
    cleanHistory,
} from './util/util'
import fetchData from './util/api'

const { Option } = Select
const SORT_OPT = [
    { text: 'Best match', value: '' },
    { text: 'Most stars', value: 'sort:stars' },
    { text: 'Fewest stars', value: 'sort:stars-asc' },
    { text: 'Most forks', value: 'sort:forks' },
    { text: 'Fewest forks', value: 'sort:forks-asc' },
    { text: 'Most updated', value: 'sort:updated' },
    { text: 'Fewest updated', value: 'sort:updated-asc' },
]

interface IPageOpt {
    hasPreviousPage?: boolean
    hasNextPage?: boolean
    startCursor?: string
    endCursor?: string
    rule?: string
}

const App: React.FC = () => {
    // 搜索关键词
    let [searchWord, setSearchWord] = useState<string>('')
    // 搜索历史
    let [history, setHistory] = useState<string[]>(getHistory())
    // 列表数据
    let [listData, setListData] = useState<any[]>([])
    // 筛选器
    let [sortRule, setSortRule] = useState<string>('')
    // 分页配置
    let [pageOpt, SetPageOpt] = useState<IPageOpt>({
        rule: 'first: 3'
    })
    // 列表loading
    let [loading, setLoading] = useState<boolean>(false)

    useDebounce(() => {
        getListData(searchWord)
        setHistory(preState => _.uniq(_.filter([...preState, searchWord])))
        addHistory(searchWord)
    }, 1000, [searchWord, sortRule, pageOpt.rule])

    async function getListData (searchWord: string) {
        setLoading(true)
        let { data } = await fetchData({
            query: `{
                search (query: "${searchWord}${sortRule}", type: REPOSITORY, ${pageOpt.rule}) {
                    repositoryCount
                    pageInfo {
                        hasPreviousPage 
                        hasNextPage
                        startCursor 
                        endCursor
                    }
                    edges {
                        cursor 
                        node {
                            ... on Repository {
                                id
                                nameWithOwner
                                description
                                descriptionHTML 
                                updatedAt 
                                stargazers {
                                    totalCount
                                }
                                languages(first: 1) {
                                    edges {
                                        node {
                                            id
                                            color
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }`
        })

        setListData(data.data.search.edges)
        SetPageOpt(preState => {
            return {
                ...preState,
                ...data.data.search.pageInfo
            }
        })
        setLoading(false)
    }

    function clean () {
        setHistory([])
        cleanHistory()
    }

    function clickHistory (itm: string) {
        setSearchWord(itm)
    }

    return (
        <div className="app">
            <h1 className="title">Giiiithub Searcher</h1>

            {/* 搜索 */}
            <div className="search-wrapper">
                <Input
                allowClear
                placeholder="输入关键词"
                value={ searchWord }
                onChange={e => {
                    setSearchWord(e.target.value)
                }}
                />
            </div>

            {/* 搜索历史 */}
            <div className="history-wrapper">
                <History 
                list={ history }
                onClean={ clean }
                onClick={ clickHistory }
                />
            </div>

            {/* 筛选器 */}
            <div className="filter-wrapper">
                <Select
                    style={{
                        width: '150px'
                    }}
                    value={ sortRule }
                    onChange={(value: string) => {
                        setSortRule(value)
                    }}
                >
                    {_.map(SORT_OPT, i => <Option value={ i.value } key={ i.text }>{ i.text }</Option>)}
                </Select>
            </div>

            {/* 列表 */}
            <div className="list-wrapper">
                <List
                    listData={ listData }
                    highlightKey={ searchWord }
                />
                {loading && <div className="list-wrapper-loading">
                    <Spin />
                </div>}
            </div>

            {/* 分页 */}
            {listData.length > 0 && <div className="pagination-wrapper">
                <Button.Group>
                    <Button
                        disabled={!pageOpt.hasPreviousPage}
                        onClick={() => {
                            SetPageOpt(preState => {
                                return {
                                    ...preState,
                                    rule: `last: 3, before: "${pageOpt.startCursor}"`,
                                }
                            })
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={!pageOpt.hasNextPage}
                        onClick={() => {
                            SetPageOpt(preState => {
                                return {
                                    ...preState,
                                    rule: `first: 3, after: "${pageOpt.endCursor}"`,
                                }
                            })
                        }}
                    >
                        Next
                    </Button>
                </Button.Group>
            </div>}
        </div>
    );
}

export default App;
