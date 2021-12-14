import axios from 'axios';
import React from 'react';
import Table from '../Component/Table';
import style from '../Css/Main.module.css';
import { filterDate } from '../utils';

const STATE = [
  '비정상', // 0
  '정상' // 1
]


export default class Server extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      openedRegistModal: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/servers')
    .then((res) => {
      if(res.data) {
        this.setState({
          ...this.state, 
          data: res.data.map((v) => ({
            ...v, 
            state: STATE[v.state],
            lastStateDate: filterDate(v.lastStateDate),
          }))
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className={style.contentTitle}>서버 상태 관리</div>
        <Table 
          columnNames={{name: '서버이름', workplace: '사업장', state: '상태', lastStateDate: '최종 상태 일자'}}
          columnWidths={{name: 10, workplace: 40, state: 10, lastStateDate: 10}} 
          classes={{state: (v) => {return v}}}
          data={this.state.data} />
      </div>
    );
  }
}