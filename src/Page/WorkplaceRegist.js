import React from 'react';
import style from '../Css/Main.module.css';

import inputDateRangePng from '../assets/input-date-range-exam.png';
import axios from 'axios';
import Table from '../Component/Table3';
import { getProcesses } from '../service/nc-api.js';

export default class WorkplaceRegist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      openedRegistModal: false,
    }
  }

  componentDidMount() {
    getProcesses()
    .then((res) => {
      if(res.data) {
        this.setState({
          ...this.state, 
          data: res.data.map((v) => ({
            ...v, 
          }))
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className={style.contentTitle}>얼굴등록 현황</div>
        <div className={style.box3}>
          <div>
            <div className={style.box3Row}>
              <div>
                <label className={style.box3Label}>구분</label>
                <select className={style.box3Select}>
                  <option>전체</option>
                </select>
              </div>
              <div>
                <label className={style.box3Label}>얼굴 등록 여부</label>
                <select className={style.box3Select}>
                  <option>전체</option>
                </select>
              </div>
              <div>
                <label className={style.box3Label}>서버상태</label>
                <select className={style.box3Select}>
                  <option>전체</option>
                </select>
              </div>
            </div>
            <div className={style.box3Row}>
              <div>
                <label className={style.box3Label}>사업장명</label>
                <select className={style.box3Select}>
                  <option>전체</option>
                </select>
              </div>
              <div>
                <label className={style.box3Label}>진행단계</label>
                <select className={style.box3Select}>
                  <option>전체</option>
                </select>
              </div>
              <div>
                <label className={style.box3Label}>최종 상태 일자</label>
                <img src={inputDateRangePng} alt="" />
              </div>
            </div>
          </div>
          <div className={style.box3SearchButtonWrapper}>
            <button>검색</button>
          </div>
        </div>
        <div className={style.tableContainer}>
          <Table 
            columnNames={{workplace: '사업장명', name: '이름', registed: '얼굴 등록 여부', state: "진행단계", lastDate: "최종 상태 일자"}}
            columnWidths={{workplace: 20, name: 10, registed: 10, state: 35, lastDate: 10}} 
            data={this.state.data} />
        </div>
      </div>
    );
  }
}