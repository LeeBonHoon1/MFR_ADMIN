import React from 'react';
import style from '../Css/Main.module.css';

const JOINED_IDS = [
  'admin',
]


const Input = (props) => {
  const handleClickConfirm = () => {
    props.onCheck();
  }

  return (
    <>
    <div className={style.signUpInputContainer}>
      <div className={style.signUpInputContainer2}>
        <label className={style.signUpInputLabel}>{props.label}</label> <input className={style.signUpInput} {...props}/> 
        {props.onCheck && <button className={`${style.signUpConfirmButton} ${props.confirmId ? style.signUpConfirmButtonActive : ''}`} onClick={handleClickConfirm}>중복확인</button>}
      </div>
      {props.infos?.map((info, i) => (
        <div key={i} className={style.signUpInfo}>{info}</div>
      ))}
    </div>
    </>
  )
}

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '', 
      confirmId: false,
      name: '',
      password: '',
      confirmPassword: '',
    }
    
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.checkId = this.checkId.bind(this);
    this.join = this.join.bind(this);
  }

  handleChangeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    let confirmId = true;

    if(name === 'id' && this.state.id !== value) {
      confirmId = false;
    }

    this.setState({
      ...this.state,
      confirmId,
      [name]: value,
    })
  }

  checkId() {
    if(this.state.id === '') {
      alert('ID를 입력해주세요.');
    }

    const confirm = !JOINED_IDS.includes(this.state.id);
    if(confirm) {
      this.setState({...this.state, confirmId: true})
    } else {
      alert('존재하는 ID 입니다.');
    }
  }

  join() {
    this.props.history.push('/signupresult');
  }

  render() {
    return (
      <>
      <div className={style.signupTitle}>회원가입 정보 입력</div>
      <div className={style.fullContainer}>
        <div className={style.signupContainer}>
          <div className={style.signupSubTitle}>회원가입 정보를 입력해주세요</div>
          <Input label="아이디" placeholder="아이디 입력" name="id" vaule={this.state.id} onChange={this.handleChangeInput} onCheck={this.checkId} confirmId={this.state.confirmId}
            infos={[
              "영문 소문자, 숫자 조합을 4~12자 혼용하여야 합니다."
            ]} />
          <Input label="사용자명" placeholder="사용자명 입력" vaule={this.state.name} />
          <Input label="비밀번호" placeholder="비밀번호 입력"  vaule={this.state.password} />
          <Input label="비밀번호확인" placeholder="비밀번호 확인"  vaule={this.state.confirmPassword}
            infos={[
              "ID가 포함되면 안됩니다.",
              "같은 문자와 숫자를 3번 이상 반복할 수 없습니다.",
              "영문 대/소문자, 숫자, 특수문자를 8~12자 혼용하여야 합니다",
            ]} />
          <div className={style.signUpButtonContainer}>
            <button className={style.primaryButton} onClick={this.join}>완료</button>
          </div>
        </div>
      </div>
      </>
    );
  }
}