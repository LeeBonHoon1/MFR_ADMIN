import React from 'react';
import style from '../Css/Main.module.css';
import { AuthContext } from '../Context';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CheckBox = (props) => {
  return (
    <div>
      <input type="checkbox" className={style.loginCheckbox} {...props}/>
      <label className={style.loginCheckboxLabel}>{props.label}</label>
    </div>
  )
}

export default class Login extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      password: '',
      savedLogin: false,
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

  login() {
    const {id: _id, password: _password} = this.state;

    // Todo... login logic
    axios.get(`http://localhost:4000/users?user=${_id}&password=${_password}`)
    .then((res) => {
      if(res.data.length > 0) {
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
              <CheckBox label="아이디 저장" value={this.state.savedLogin} />
              <CheckBox label="로그인 상태유지" value={this.state.autoLogin} />
            </div>
            <div className={style.loginButtonContainer}>
              <button className={style.primaryButton} onClick={this.login}>로그인</button>
            </div>
            <div className={style.loginNavigator}>
              <Link to="/signup">회원가입</Link>
              <Link to="/searchid">ID찾기</Link>
              <Link to="/resetpassword">비밀번호 재설정</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}