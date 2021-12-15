import axios from "axios";
import React from "react";
import Table from "../Component/Table4";
import style from "../Css/Main.module.css";
import uStyle from "../Css/UserRegistModal.module.css";

import inputDateRangeExamPng from "../assets/input-date-range-exam.png";
import closeIconPng from "../assets/close-icon.png";
import ReactModal from "react-modal";
import WorkplaceModifyModal from "../Component/WorkplaceModifyModal";
import UserRegistModal from "../Component/UserRegistModal";

const JOINED = ["미완료", "완료"];

export default class Authority extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      data2: null,
      openedRegistModal: false,
      openedModifyModal: false,
      checkedIdxs: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/userinfos").then((res) => {
      if (res.data) {
        this.setState({
          ...this.state,
          data: res.data.map((v) => ({
            ...v,
            joined: JOINED[v.joined],
          })),
        });
      }
    });
  }

  handleClickCheckbox(idx) {
    const _checkedIdx = this.state.checkedIdxs;

    if (_checkedIdx.includes(idx)) {
      this.setState({
        ...this.state,
        checkedIdxs: _checkedIdx.filter((v) => v.idx !== idx),
      });
    } else {
      this.setState({
        ...this.state,
        checkedIdxs: [..._checkedIdx, idx],
      });
    }
  }

  openRegistModal() {
    this.setState({
      ...this.state,
      openedRegistModal: true,
    });
  }

  closeRegistModal() {
    this.setState({
      ...this.state,
      openedRegistModal: false,
    });
  }

  openModifyModal() {
    this.setState({
      ...this.state,
      openedModifyModal: true,
    });
  }

  closeModifyModal() {
    this.setState({
      ...this.state,
      openedModifyModal: false,
    });
  }

  render() {
    return (
      <div>
        <div className={style.contentTitle2}>권한 관리</div>
        <div className={style.layoutContainer2Container}>
          <div className={style.box4}>
            <div className={style.box4Cotnainer}>
              <label className={style.box4Label}>이름</label>
              <input className={style.box4InputText1} />
            </div>
            <div className={style.box4Cotnainer}>
              <label className={style.box4Label}>휴대전화 번호</label>
              <input className={style.box4InputText2} />
            </div>
            <div className={style.box4Cotnainer}>
              <label className={style.box4Label}>회원 가입</label>
              <select className={style.box4Select}>
                <option>전체</option>
                {JOINED.map((v, i) => (
                  <option key={i}>{v}</option>
                ))}
              </select>
            </div>
            <div className={style.box4Cotnainer}>
              <label className={style.box4Label}>최종 상태 일자</label>
              <img src={inputDateRangeExamPng} alt="" />
            </div>
            <div className={style.box4Cotnainer}>
              <button className={style.box4Button}>검색</button>
            </div>
          </div>
          <div className={style.layoutContainer2}>
            <div>
              <div className={style.layoutContainer2TopContainer}>
                <div className={style.contentSubTitle}>사용자 정보</div>
                <div>
                  <button className={style.layoutContainer2Button}>삭제</button>
                  <button
                    className={style.layoutContainer2Button}
                    onClick={this.openRegistModal.bind(this)}
                  >
                    신규등록
                  </button>
                </div>
              </div>
              <Table
                columnNames={{
                  name: "이름",
                  phone: "휴대전화 번호",
                  joined: "회원가입",
                  lastStateDate: "최종 상태 일자",
                }}
                columnWidths={{
                  name: 25,
                  phone: 30,
                  joined: 15,
                  lastStateDate: 25,
                }}
                data={this.state.data}
                onClickCheckbox={this.handleClickCheckbox.bind(this)}
              />
            </div>
            <div>
              <div className={style.layoutContainer2TopContainer}>
                <div className={style.contentSubTitle}>관리 사업장</div>
                <div>
                  <button
                    className={style.layoutContainer2Button}
                    onClick={this.openModifyModal.bind(this)}
                  >
                    수정
                  </button>
                </div>
              </div>
              <div className={style.layotContainer2TableContainer}>
                {!this.state.data2 && (
                  <div className={style.layotContainer2TableContainerNone}>
                    사용자를 선택해주세요
                  </div>
                )}
                {this.state.data2 && (
                  <Table
                    columnNames={{
                      name: "이름",
                      phone: "휴대전화 번호",
                      joined: "회원가입",
                      lastStateDate: "최종 상태 일자",
                    }}
                    columnWidths={{
                      name: 25,
                      phone: 30,
                      joined: 15,
                      lastStateDate: 25,
                    }}
                    data={this.state.data}
                    onClickCheckbox={this.handleClickCheckbox.bind(this)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ReactModal
          isOpen={this.state.openedRegistModal}
          onAfterOpen={() => {}}
          onRequestClose={this.closeRegistModal.bind(this)}
          style={{
            content: {
              top: "calc((100% - 658px) / 2)",
              left: "calc((100% - 611px) / 2)",
              // bottom: 'calc((100% - 842px) / 2)',
              // right: 'calc((100% - 653px) / 2)',
              width: "611px",
              height: "658px",
              // marginRight: '-50%',
              // transform: 'translate(-50%, -50%)',
            },
          }}
          contentLabel="Regist Modal"
        >
          <div className={uStyle.modalContainer}>
            <img
              src={closeIconPng}
              alt="regist close"
              style={{ float: "right", cursor: "pointer" }}
              onClick={this.closeRegistModal.bind(this)}
            />
            <UserRegistModal />
          </div>
        </ReactModal>
        <ReactModal
          isOpen={this.state.openedModifyModal}
          onAfterOpen={() => {}}
          onRequestClose={this.closeModifyModal.bind(this)}
          style={{
            content: {
              top: "calc((100% - 653px) / 2)",
              left: "calc((100% - 842px) / 2)",
              // bottom: 'calc((100% - 842px) / 2)',
              // right: 'calc((100% - 653px) / 2)',
              width: "842px",
              height: "653px",
              // marginRight: '-50%',
              // transform: 'translate(-50%, -50%)',
            },
          }}
          contentLabel="Regist Modal"
        >
          <div className={style.modalContainer}>
            <img
              src={closeIconPng}
              alt="regist close"
              style={{ float: "right", cursor: "pointer" }}
              onClick={this.closeModifyModal.bind(this)}
            />
            <WorkplaceModifyModal />
          </div>
        </ReactModal>
      </div>
    );
  }
}
