import axios from 'axios';
import React from 'react';
import ReactModal from 'react-modal';
import Table from '../Component/Table';
import style from '../Css/Main.module.css';
import { filterLongText } from '../utils';

import closeIconPng from '../assets/close-icon.png';

export default class WorkplaceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      openedRegistModal: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/workplaces')
    .then((res) => {
      if(res.data) {
        this.setState({
          ...this.state, 
          data: res.data.map((v) => ({
            ...v,
            qr: filterLongText(v.qr, 25),
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
        <div className={style.contentTitle}>전체 리스트</div>
        <Table 
          topButtonItem={{
            text: '사업장 등록',
            onClick: this.openRegistModal.bind(this),
          }}
          columnNames={{name: '사업장명', address: '주소', sms: 'SMS전송', mail: '메일전송', qr: 'Qr'}}
          columnWidths={{name: 10, address: 35, sms: 10, mail: 10, qr: 20}}
          data={this.state.data} />
        <ReactModal
          isOpen={this.state.openedRegistModal}
          onAfterOpen={() => {}}
          onRequestClose={this.closeRegistModal.bind(this)}
          style={{
            content: {
              top: 'calc((100% - 925px) / 2)',
              left: 'calc((100% - 1145px) / 2)',
              // bottom: 'calc((100% - 842px) / 2)',
              // right: 'calc((100% - 653px) / 2)',
              width: '1145px',
              height: '880px',
              // marginRight: '-50%',
              // transform: 'translate(-50%, -50%)',
              overflowY: 'scroll',
            }
          }}
          contentLabel="Regist Modal" >
          <img src={closeIconPng} alt="regist close" style={{float: 'right', cursor: 'pointer'}} onClick={this.closeRegistModal.bind(this)} />
          <div className={style.modalTitle2}>사업장 등록</div>
          <div className={style.modalContainer}>
            {/* 기본정보 */}
            <div className={style.modalSubTitle}>기본정보</div>
            <div className={style.modalSubContainer}>
              <div className={style.modalRow1}>
                <label className={style.modalFormLabel1}>제목</label>
                <input className={style.modalFormInputText2} placeholder='화성 캠퍼스' />
                <input className={style.modalFormInputText3} placeholder='P1 정문' />
              </div>
              <div className={style.modalRow1}>
                <label className={style.modalFormLabel1}>주소</label>
                <input className={style.modalFormInputText4} placeholder='' />
              </div>
              <div className={style.modalRow1}>
                <label className={style.modalFormLabel1}>비고</label>
                <input className={style.modalFormInputText4} placeholder='' />
              </div>
              <div className={style.modalRow1}>
                <label className={style.modalFormLabel1}>URL</label>
                <button className={style.modalFormGenButton1}>생성하기</button>
                <input className={style.modalFormInputText5} placeholder='' />
              </div>
              <div className={style.modalRow3}>
                <div className={style.qrImageContainer}>
                  QR CODE IMAGE
                </div>
                <button className={style.modalFormDownloadButton1}>다운로드</button>
              </div>
            </div>
            {/* 전송정보 */}
            <div className={style.modalSubTitle}>전송정보</div>
            <div className={style.modalSubContainer}>
              <div className={style.modalRow1}>
                <label className={style.modalFormLabel1}>총무담당자</label>
                <input className={style.modalFormInputText2} placeholder='이름' />
                <input className={style.modalFormInputText3} placeholder='전화번호(번호만 입력)' />
              </div>
              <div className={style.modalRow2}>
                <label className={style.modalFormLabel1}>SMS</label>
                <div>
                  <div className={style.modalFormRadioContainer}>
                    <div className={style.modalFormRadioContainer2}>
                      <input type="radio" name="sms" className={style.modalFormInputRadio}/>
                      <label className={style.modalFormRadioLabel}>문자전송</label>
                    </div>
                    <input placeholder='아이디' className={style.modalFormInputText6} />
                    <input placeholder='비밀번호' className={style.modalFormInputText6} />
                  </div>
                  <div className={style.modalFormRadioContainer}>
                    <div className={style.modalFormRadioContainer2}>
                      <input type="radio" name="sms" className={style.modalFormInputRadio}/>
                      <label className={style.modalFormRadioLabel}>KNOX API v1</label>
                    </div>
                    <input placeholder='key입력' className={style.modalFormInputText6} disabled />
                    <input placeholder='key입력' className={style.modalFormInputText6} disabled />
                  </div>
                  <div className={style.modalFormRadioContainer}>
                    <div className={style.modalFormRadioContainer2}>
                      <input type="radio" name="sms" className={style.modalFormInputRadio}/>
                      <label className={style.modalFormRadioLabel}>KNOX API v2</label>
                    </div>
                    <input placeholder='key입력' className={style.modalFormInputText6} disabled />
                    <input placeholder='key입력' className={style.modalFormInputText6} disabled />
                  </div>
                </div>
              </div>
              <div className={style.modalRow2}>
                <label className={style.modalFormLabel1}>SMTP</label>
                <div>
                  <div className={style.modalFormRadioContainer}>
                    <div className={style.modalFormRadioContainer2}>
                      <input type="radio" name="sms" className={style.modalFormInputRadio}/>
                      <label className={style.modalFormRadioLabel}>SMTP</label>
                    </div>
                    <input placeholder='주소' className={style.modalFormInputText7} />
                    <input placeholder='포트번호' className={style.modalFormInputText7} />
                    <input placeholder='아이디' className={style.modalFormInputText7} />
                    <input placeholder='비밀번호' className={style.modalFormInputText7} />
                  </div>
                  <div className={style.modalFormRadioContainer}>
                    <div className={style.modalFormRadioContainer2}>
                      <input type="radio" name="sms" className={style.modalFormInputRadio}/>
                      <label className={style.modalFormRadioLabel}>KNOX API v1</label>
                    </div>
                    <input placeholder='key입력' className={style.modalFormInputText6} disabled />
                    <input placeholder='key입력' className={style.modalFormInputText6} disabled />
                  </div>
                  <div className={style.modalFormRadioContainer}>
                    <div className={style.modalFormRadioContainer2}>
                      <input type="radio" name="sms" className={style.modalFormInputRadio}/>
                      <label className={style.modalFormRadioLabel}>KNOX API v2</label>
                    </div>
                    <input placeholder='key입력' className={style.modalFormInputText6} disabled />
                    <input placeholder='key입력' className={style.modalFormInputText6} disabled />
                  </div>
                </div>
              </div>
            </div>
            <div className={style.modalFormButtonsContainer}>
              <button className={style.modalFormCancelButton}>취소</button>
              <button className={style.modalFormConfirmButton}>저장</button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}