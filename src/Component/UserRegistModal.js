import React from "react";
import style from "../Css/UserRegistModal.module.css";

function UserRegistModal() {
  return (
    <div className={style.container}>
      <div className={style.top}>신규등록</div>
      <div>이름</div>
    </div>
  );
}

export default UserRegistModal;
