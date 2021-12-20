import React from 'react';
import ReactModal from 'react-modal';
import Table from '../Component/Table';
import style from '../Css/Main.module.css';
import { filterLongText } from '../utils';
import axios from 'axios';

import closeIconPng from '../assets/close-icon.png';
import WorkplaceRegistModal from '../Component/WorkplaceRegistModal';
import { getWorkplaces } from '../service/nc-api.js';

export default class WorkplaceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      openedRegistModal: false,
    }
  }

  componentDidMount() {
    getWorkplaces()
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
          <WorkplaceRegistModal 
            onClose={this.closeRegistModal.bind(this)}
          />
        </ReactModal>
      </div>
    );
  }
}