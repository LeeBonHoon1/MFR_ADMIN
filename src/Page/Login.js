import React from 'react';
import style from '../Css/Main.module.css';
import { AuthContext } from '../Context';
import { Link } from 'react-router-dom';

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
      error: false,
    }

    this.login = this.login.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {

  }

  handleChangeInput(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  login() {
    const {id, password} = this.state;

    // Todo... login logic
    if(id !== 'admin') {
      this.setState({...this.state, error: true});
      return;
    } else if (password !== 'admin') {
      this.setState({...this.state, error: true});
      return ;
    }

    const name = '이택수';

    this.props.history.push('/');
    this.context.set({
      id, password, name,
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
              <CheckBox label="아이디 저장" />
              <CheckBox label="로그인 상태유지" />
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