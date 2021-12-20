import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from '../Css/Main.module.css';
import Table from './Table6';
import Table2 from './Table7';

import multiselectButtonsPng from '../assets/multiselect-buttons.png';
import { getAllWorkplaces, getSelectdWorkplaces } from '../service/nc-api.js';

const State = [
  '', '운영자', '관리자'
]


function WorkplaceModifyModal(props) {
  const [state, setState] = useState({
    allList: [],
    selectedList: [],
  });

  useEffect(() => {
    getAllWorkplaces()
    .then((res) => {
      getSelectdWorkplaces()
      .then((res2) => {
        if(res.data && res2.data) {
          const _state = {
            ...state,
            allList: res.data,
            selectedList: res2.data.map((v) => ({...v, state: State[v.state]})),
          }
          setState(_state);
        }
      });
    });
  }, []);

  const submit = () => {
    // TODO...
    alert(JSON.stringify(state));
    props.onClose && props.onClose();
  }

  const cancel = () => {
    props.onClose && props.onClose();
  }

  return (
    <div>
      <div className={style.modalTitle3}>관리 사업장</div>
      <div className={style.modalTopContent}>
        <div>
          <div className={style.modalLabel}>이름</div>
          <input value="김*자" className={style.modalInput} />
        </div>
        <div>
          <div className={style.modalLabel}>휴대전화 번호</div>
          <input value="010-0000-0000" className={style.modalInput} />
        </div>
      </div>
      <div className={style.modalContentContainer}>
        <div>
          <div className={style.modalContentContainerTitle1}>전체 사업장</div>
          <div>
            <Table 
              columnNames={{workplace: '사업장'}}
              columnWidths={{workplace: 50}}
              data={state.allList} />
          </div>
        </div>
        <div className={style.modalContentContainerButtonsContainer}>
          <img src={multiselectButtonsPng} alt="" />
          {/* <button>선택&gt;</button>
          <button>&lt;삭제</button> */}
        </div>
        <div>
          <div className={style.modalContentContainerTitle2}>관리 사업장</div>
          <div>
            <Table2 
              columnNames={{workplace: '사업장', state: '권한'}}
              columnWidths={{workplace: 60, state: 30}}
              data={state.selectedList} />
          </div>
        </div>
      </div>
      <div className={style.modalFormButtonsContainer}>
        <button className={style.modalFormCancelButton} onClick={cancel}>취소</button>
        <button className={style.modalFormConfirmButton} onClick={submit}>저장</button>
      </div>
    </div>
  )
}

export default WorkplaceModifyModal;