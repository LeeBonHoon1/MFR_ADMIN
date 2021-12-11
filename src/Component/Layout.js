import React, { useEffect, useState } from 'react';
import style from '../Css/Main.module.css';
import { AuthContext } from '../Context';
import logoPng from '../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';

const MENU = [
  {name: '공지사항', to: '/notice', list: null},
  {name: '사업장 관리', to: '/workplace', list: [
    {name: '전체리스트', to: '/list'},
    {name: '얼굴등록 링크보내기', to: '/link'},
    {name: '얼굴 등록 현황', to: '/regist'},
    {},
  ]},
  {name: '권한 관리', to: '/authority', list: null},
  {name: '서버 상태 관리', to: '/server', list: null},
];

const Navigator = () => {
  const history = useHistory();

  const [openedNavigatorIdxs, setOpenedNavigatorIdxs] = useState([]);
  

  const openSubNavigator = (e, idx) => {
    e.preventDefault();
    if(openedNavigatorIdxs.includes(idx)) {
      setOpenedNavigatorIdxs(openedNavigatorIdxs.filter((_, i) => (i === idx)));
    } else {
      setOpenedNavigatorIdxs([...openedNavigatorIdxs, idx]);
    }
  }

  useEffect(() => {
    console.log(history.location.pathname);
  });

  return (
    <div className={style.navigationContainer}>
      <ul>
        {MENU.map((v, i) => {
          if(v.list) {
            return (
              <li key={i}>
                <Link to="/" className={`/${history.location.pathname.split('/')[1]}` === (v.to) ? `${style.active}` : ''}onClick={(e) => {openSubNavigator(e, i)}}>{v.name}</Link>
                {openedNavigatorIdxs.includes(i) && (
                  <ul className={style.subNavigationContainer}>
                    {v.list.map((vv, ii) => (
                      <li key={ii}>
                        <Link to={v.to+vv.to} className={history.location.pathname === (v.to+vv.to) ? `${style.active}` : ''}>{vv.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          } else {
            return (
              <li key={i}>
                <Link to={v.to} className={history.location.pathname === v.to ? `${style.active}` : ''}>{v.name}</Link>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}


const Logo = () => {
  return (
    <div className={style.logo}>
      <img src={logoPng} alt="logo" />
    </div>
  )
}



export default class Layout extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      isOpenUserMore: false,
    }

    this.toggleUserMore = this.toggleUserMore.bind(this);
    this.openUserMy = this.openUserMy.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log(this.context);
    window.addEventListener('click', this.closeUserMore.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeUserMore.bind(this), false);
  }

  closeUserMore() {
    this.setState({
      ...this.state,
      isOpenUserMore: false,
    });
  }

  toggleUserMore(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      ...this.state,
      isOpenUserMore: !this.state.isOpenUserMore,
    });
  }

  openUserMy(e) {
    e.preventDefault();
  }


  logout(e) {
    e.preventDefault();
    this.props.history.push('/');
    this.context.set(null);
  }


  render() {
    return (
      <>
      <div className={style.headerContainer}>
        <Logo />
        <div className={style.headerTextsContainer}>
          <div className={style.headerText1}>
            <a href="/">알림</a>
          </div>
          <div className={style.headerText2}>
            <a href="/" onClick={this.toggleUserMore}>{this.context.state.name} 관리자님</a>
            {this.state.isOpenUserMore && (
              <div className={style.userMoreContainer}>
                <a href="/" onClick={this.openUserMy}>내정보</a>
                <a href="/" onClick={this.logout}>로그아웃</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={style.bodyContainer}>
        <Navigator />
        <div className={style.contentContainer}>
          <div className={style.contentContainer2}>
            {this.props.children}
          </div>
        </div>
      </div>
      </>
    )
  }
}