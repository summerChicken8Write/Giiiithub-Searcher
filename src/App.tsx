import React, {
  useState,
  useEffect
} from 'react';
import {
  Input,
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

const App: React.FC = () => {
  // 搜索关键词
  let [searchWord, setSearchWord] = useState<string>('')
  // 搜索历史
  let [history, setHistory] = useState<string[]>(getHistory())
  // // 列表数据
  let [listData, setListData] = useState<any[]>([])
  // // 筛选器配置
  let [filterOpt, setFilterOpt] = useState<object>({})

  useDebounce(() => {
    getListData(searchWord)
    setHistory(preState => _.uniq(_.filter([...preState, searchWord])))
    addHistory(searchWord)
  }, 1000, [searchWord])

  async function getListData (searchWord: string) {
    let { data } = await fetchData({
      query: `{
        viewer {
          login
          name
          id
        }

        search (query: "${searchWord}", type: REPOSITORY, first: 5) {
          repositoryCount
          wikiCount
          userCount
          issueCount
          codeCount 
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              ... on Repository {
                id
                name
                description
                viewerHasStarred
                descriptionHTML 
                stargazers {
                  totalCount
                }
              }
            }
          }
        }
        
      }`
    })

    setListData(data.data.search.edges)
  }

  function clean () {
    setHistory([])
    cleanHistory()
  }

  function clickHistory (itm: string) {
    setSearchWord(itm)
  }

  return (
    <div className="App">
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

      </div>

      {/* 列表 */}
      <div className="list-wrapper">
        <List
          listData={ listData }
        />
      </div>
    </div>
  );
}

export default App;
