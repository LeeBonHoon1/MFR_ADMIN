import React from 'react';
import style from '../Css/Main.module.css';


export default class Notice extends React.Component {
  render() {
    return (
      <div>
        <div className={style.contentTitle}>공지사항</div>
      </div>
    );
  }
}