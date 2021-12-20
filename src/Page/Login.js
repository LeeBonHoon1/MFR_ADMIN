import React from 'react';
import style from '../Css/Main.module.css';
import { AuthContext } from '../Context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUser } from '../service/nc-api.js';

export default class Login extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem('savedId') || '',
      password: '',
      savedId: localStorage.getItem('savedId') === null ? false : true,
      autoLogin: false,
      error: false,
    }

    this.login = this.login.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydownWindow.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydownWindow.bind(this), false);
  }

  handleKeydownWindow(e) {
    // console.log(e.keyCode);
    switch(e.keyCode) {
      case 13:
        this.login();
        break;
      default:
        break;
    }
  }

  handleChangeInput(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  handleChangeCheckbox(e) {
    console.log(e.target.name, e.target.value, e.target.checked);
    this.setState({
      ...this.state,
      [e.target.name]: e.target.checked,
    });
  }

  login() {
    const {id: _id, password: _password} = this.state;

    // Todo... login logic
    getUser(_id, _password)
    .then((res) => {
      const successedLogin = res.data.length > 0;
      if(successedLogin) {
        if(this.state.savedId) {
          localStorage.setItem('savedId', _id);
        }
        
        localStorage.setItem('loginInfo', 'true');
        const {id, password, name} = res.data[0];

        this.context.set({
          id, password, name,
        });    
        this.props.history.push('/');
      } else {
        this.setState({...this.state, error: true});
      }
    });
    // end Todo... login logic
  }

  render() {
    return (
      <div className={style.fullContainer}>
        <div className={style.loginContainer}>
          <div className={style.loginContainer2}>
            <div className={style.loginTitle}>서비스 로고/이름</div>
            <input className={style.loginInput} name="id" type="text" placeholder="아이디" value={this.state.id} onChange={this.handleChangeInput} />
            <input className={style.loginInput} name="password" type="password" placeholder="비밀번호" value={this.state.password} onChange={this.handleChangeInput} />
            <div className={style.loginError}>
              {this.state.error ? '잘못된 아이디 또는 비밀번호 입니다.' : ''}
            </div>
            <div className={style.loginCheckboxContainer}>
              <div>
                <input type="checkbox" id="save-id" name="savedId" className={style.loginCheckbox} checked={this.state.savedId} onChange={this.handleChangeCheckbox.bind(this)} />
                <label className={style.loginCheckboxLabel} for="save-id">아이디 저장</label>
              </div>
              <div>
                <input type="checkbox" id="auto-login" name="autoLogin" className={style.loginCheckbox} checked={this.state.autoLogin} onChange={this.handleChangeCheckbox.bind(this)}/>
                <label className={style.loginCheckboxLabel} for="auto-login">로그인 상태유지</label>
              </div>
            </div>
            <div className={style.loginButtonContainer}>
              <button className={style.primaryButton} onClick={this.login}>로그인</button>
            </div>
            {/* <div className={style.loginNavigator}>
              <Link to="/signup">회원가입</Link>
              <Link to="/searchid">ID찾기</Link>
              <Link to="/resetpassword">비밀번호 재설정</Link>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}