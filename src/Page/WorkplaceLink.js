import React from 'react';
import style from '../Css/Main.module.css';

import inputFileExamPng from '../assets/input-file-exam.png';
import trashIconPng from '../assets/trash-icon.png';

import Table from '../Component/Table2';
import axios from 'axios';

export default class WorkplaceLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      openedRegistModal: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/sendUsers')
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
        <div className={style.contentTitle}>얼굴등록 링크보내기</div>
        <div className={style.box1}>
          <div className={style.box1Title}>
            <div>발송방법 선택</div>
            <div className={style.box1RadioBox}>
              <input type="radio" className={style.inputRadio} /><label>SMS</label>
              <input type="radio" className={style.inputRadio} /><label>SMTP</label>
            </div>
          </div>
          <div className={style.box1ButtonContainer}>
            <button>전송</button>
          </div>
        </div>
        <div className={style.layoutContainer1}>
          {/* 미리보기 */}
          <div>
            <div className={style.layoutContainer1Title}>미리보기</div>
            <div className={style.layoutContainer1Box}>
              <div>
              *** 사업장 출입을 위하여 아래 링크를 통해 얼굴을 등록해주세요
              <br />
              (링크는 자동생성)
              </div>
            </div>
          </div>
          {/* 수신자 입력 */}
          <div>
            <div className={style.layoutContainer1Title}>수신자 입력</div>
            <div className={style.box2}>
              <div className={style.box2Label}>전체 입력</div>
              <div>
                <button className={style.excelsheetDownloadButton}>엑셀시트 다운로드</button>
                <div>
                  <img src={inputFileExamPng} alt="" />
                  <img src={trashIconPng} alt="" />
                </div>
              </div>
            </div>
            <div className={style.box2}>
              <div className={style.box2Label}>개별 입력</div>
              <div>
                <input placeholder='이름' className={style.box2InputText1}/>
                <input placeholder='휴대전화 번호(-제외)' className={style.box2InputText2}/>
                <button className={style.box2Button}>등록</button>
              </div>
            </div>
            <Table
              columnNames={{name: '이름', phone: '휴대전화 번호', email: '이메일'}}
              columnWidths={{name: 25, phone: 30, email: 40}} 
              data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}