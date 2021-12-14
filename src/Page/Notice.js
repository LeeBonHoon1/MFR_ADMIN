import React from 'react';
import style from '../Css/Main.module.css';

import Table from '../Component/Table';
import { filterDate } from '../utils';
import axios from 'axios';
import ReactModal from 'react-modal';

import closeIconPng from '../assets/close-icon.png';
import trashIconPng from '../assets/trash-icon.png';
import inputFileExamPng from '../assets/input-file-exam.png';
import inputDateRangeExamPng from '../assets/input-date-range-exam.png';

const CATEGORY = [
  '배포', // 0 
  '안내', // 1
];

export default class Notice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      openedRegistModal: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/notices')
    .then((res) => {
      if(res.data) {
        this.setState({
          ...this.state, 
          data: res.data.map((v) => ({
            ...v, 
            category: CATEGORY[v.category],
            regDate: filterDate(v.regDate),
          }))
        });
      }
    });
  }

  openRegistModal() {
    this.setState({
      ...this.state,
      openedRegistModal: true,
    });
  }

  closeRegistModal() {
    this.setState({
      ...this.state,
      openedRegistModal: false,
    });
  }

  render() {
    return (
      <div>
        <div className={style.contentTitle}>공지사항</div>
        <Table 
          topButtonItem={{
            text: '등록',
            onClick: this.openRegistModal.bind(this),
          }}
          columnNames={{category: '구분', title: '제목', fileName: '첨부파일', regDate: '등록일', readCnt: '조회'}}
          columnWidths={{category: 10, title: 40, fileName: 10, regDate: 10, readCnt: 10}} 
          data={this.state.data} />
        <ReactModal
          isOpen={this.state.openedRegistModal}
          onAfterOpen={() => {}}
          onRequestClose={this.closeRegistModal.bind(this)}
          style={{
            content: {
              top: 'calc((100% - 653px) / 2)',
              left: 'calc((100% - 842px) / 2)',
              // bottom: 'calc((100% - 842px) / 2)',
              // right: 'calc((100% - 653px) / 2)',
              width: '842px',
              height: '653px',
              // marginRight: '-50%',
              // transform: 'translate(-50%, -50%)',
            }
          }}
          contentLabel="Regist Modal" >
          <div className={style.modalContainer}>
            <img src={closeIconPng} alt="regist close" style={{float: 'right', cursor: 'pointer'}} onClick={this.closeRegistModal.bind(this)} />
            <div className={style.modalTitle}>공지사항 등록</div>
            <div>
              <div className={style.modalRow1}>
                <label className={style.modalFormLabel1}>제목</label>
                <input className={style.modalFormInputText1} placeholder='입력해주세요' />
              </div>
              <div className={style.modalRow1}>
                <label className={style.modalFormLabel1}>구분</label>
                <select className={style.modalFormSelect1}>
                  <option>선택</option>
                  {CATEGORY.map((v, i) => (
                    <option key={i} value={i+''} >{v}</option>
                  ))}
                </select>
                <label className={style.modalFormLabel2}>공개대상</label>
                <select className={style.modalFormSelect1}>
                  <option>선택</option>
                </select>
              </div>
              <div className={style.modalRow2}>
                <label className={style.modalFormLabel1}>내용</label>
                <textarea className={style.modalFormTextarea1} placeholder='입력해주세요' >
                </textarea>
              </div>
              <div className={style.modalRow1}>
                <label className={style.modalFormLabel1}>첨부파일</label>
                <div className={style.modalFormFileContainer}>
                  <img src={inputFileExamPng} alt="" />
                  <input type="file" style={{display: "none"}}/>
                </div>
                <img src={trashIconPng} alt="" />
              </div>
              {/* 20211214 알림 기능 삭제 하는것으로 확인(ojs) : lts */}
              {/* <div className={style.modalRow1}>
                <label className={style.modalFormLabel1}>알림설정</label>
                <select className={style.modalFormSelect2}>
                  <option value="Y">사용안함</option>
                  <option value="N">사용</option>
                </select>
                <div className={style.modalFormImageRangeContainer}>
                  <img src={inputDateRangeExamPng} alt="" /> */}
                  {/* <input type="date" />
                  <input type="date" /> */}
                {/* </div>
              </div> */}
            </div>
            <div className={style.modalFormButtonsContainer}>
              <button className={style.modalFormCancelButton}>취소</button>
              <button className={style.modalFormConfirmButton}>등록</button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}