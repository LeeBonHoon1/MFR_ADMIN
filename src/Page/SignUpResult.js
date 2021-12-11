import React from 'react';
import style from '../Css/Main.module.css';

export default class SignUpResult extends React.Component {
  constructor(props) {
    super(props);

    this.goLogin = this.goLogin.bind(this);
  }

  goLogin() {
    this.props.history.push('/');
  }

  render() {
    return (
      <>
      <div className={style.signupTitle}>회원가입 정보 입력</div>
      <div className={style.fullContainer}>
        <div calssName={style.signupResultContainer}>
          <div className={style.signUpResultTextContainer}>
            <div className={style.signupResultText}>회원가입이</div>
            <div className={style.signupResultText}>완료되었습니다</div>
          </div>
          <div className={style.signUpResultSubTextContainer}>
            <div className={style.signupResultSubText}>관리자로부터 최종 승인을 받으신 후</div>
            <div className={style.signupResultSubText}>사용하실 수 있습니다.</div>
          </div>
          <div className={style.signUpResultButtonContainer}>
            <button className={style.primaryButton} onClick={this.goLogin}>로그인</button>
          </div>
        </div>
      </div>
      </>
    );
  }
}