import React, {
  useState,
  useEffect
} from 'react';
import {

} from 'antd';
import './App.css';

const App: React.FC = () => {
  // 搜索关键词
  let [searchWord, setSearchWord] = useState<string>('')
  // 搜索历史
  let [history, setHistory] = useState<string[]>([])
  // 列表数据
  let [listData, setListData] = useState<any[]>([])
  // 筛选器配置
  let [filterOpt, setFilterOpt] = useState<object>({})

  return (
    <div className="App">
      {/* 搜索 */}
      <div className="search-wrapper">

      </div>

      {/* 搜索历史 */}
      <div className="history-wrapper">

      </div>

      {/* 筛选器 */}
      <div className="filter-wrapper">

      </div>

      {/* 列表 */}
      <div className="list-wrapper">

      </div>
    </div>
  );
}

export default App;
