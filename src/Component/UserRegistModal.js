import React from "react";
import style from "../Css/UserRegistModal.module.css";

function UserRegistModal() {
  return (
    <div className={style.container}>
      <div className={style.top}>신규등록</div>
      <div className={style.nameComtainer}>
        <div className={style.name}>이름</div>
        <input className={style.inputText}></input>
      </div>
      <div className={style.nameComtainer}>
        <div className={style.name}>휴대전화 번호</div>
        <input className={style.inputText}></input>
      </div>
      <div className={style.nameComtainer}>
        <div className={style.name}>이메일</div>
        <input className={style.inputText}></input>
      </div>
      <div className={style.nameComtainer}>
        <div className={style.name}>
          전송내용
          <br />
          미리보기
        </div>
        <textarea className={style.inputText1}></textarea>
      </div>
      <div className={style.btn}>
        <button className={style.cancelBtn}>취소</button>
        <button className={style.sendBtn}>전송</button>
      </div>
    </div>
  );
}

export default UserRegistModal;
