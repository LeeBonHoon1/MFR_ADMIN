import React, { useState } from 'react';
import style from '../Css/Main.module.css';

import QRCode from 'qrcode';
import { downloadURI } from '../utils';

const WorkplaceRegistModal = (props) => {
  const [state ,setState] = useState({
    qrText: 'https://121.165.242.171:9786',
    qrImage: null,
  })

  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    setState({ ...state, [name]: value });
  }

  const createQrcode = () => {
    if(!state.qrText) {
      alert('URL을 입력해주세요.');
      return;
    }

    QRCode.toDataURL(state.qrText, {errorCorrectionLevel: 'H'}, (err, url) => {
      if(err) {
        alert('오류가 발생했습니다.');
        console.error(err);
        return;
      }
      
      setState({
        ...state,
        qrImage: url,
      });

      // const file = dataURLtoFile(url, 'qrCode');
    });
  }

  const downloadQr = () => {
    downloadURI(state.qrImage, 'test.png');
  }

  const submit = () => {
    // TODO...
    alert(JSON.stringify(state));
    props.onClose && props.onClose();
  }

  const cancel = () => {
    props.onClose && props.onClose();
  }

  return (
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
          <button className={style.modalFormGenButton1} onClick={createQrcode}>생성하기</button>
          <input name="qrText" className={style.modalFormInputText5} value={state.qrText} onChange={handleChangeInput} placeholder='' />
        </div>
        <div className={style.modalRow3}>
          <div className={style.qrImageContainer}>
            {!state.qrImage && <div>QR CODE IMAGE</div>}
            {state.qrImage && <img src={state.qrImage} alt="" />}
          </div>
          <button className={style.modalFormDownloadButton1} onClick={downloadQr}>다운로드</button>
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
        <button className={style.modalFormCancelButton} onClick={cancel}>취소</button>
        <button className={style.modalFormConfirmButton} onClick={submit}>저장</button>
      </div>
    </div>
  )
}

export default WorkplaceRegistModal;