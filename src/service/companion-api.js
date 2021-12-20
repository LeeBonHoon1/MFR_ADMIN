import axios from 'axios';
import { data } from 'jquery';

const HOST = 'https://';

const errors = {
  'ERR-1010': {no: 1, name: '권한없음'},
  'ERR-1020': {no: 2, name: '유효하지 않는 요청'},
  'ERR-1030': {no: 3, name: '서비스 없음'},
  'ERR-2010': {no: 4, name: '내부 연산오류'},
  'ERR-3010': {no: 5, name: '템플릿 추출 서버 없음'},
  'ERR-3011': {no: 6, name: '템플릿 추출서버 내부오류'},
  'ERR-3012': {no: 7, name: '템플릿 추출서버 응답없음'},
  'ERR-3013': {no: 8, name: '템플릿 추출안됨'},
  'ERR-4010': {no: 9, name: 'CLES 내부오류'},
  'ERR-4011': {no: 10, name: 'CLES SFTP 오류'},
  'ERR-4012': {no: 11, name: 'CLES 응답없음'},
  'ERR-4013': {no: 12, name: 'CLES SFTP 응답없음'},
  'ERR-9000': {no: 13, name: '기타 오류'}
}

// AC-1020
export function getServerState(
  
) {
  // recieved data
  /*
  {
    cpuUsageRate: double // CPU 사용량
    memUsageMByte: double // 메모리 사용량
    memeTotalMByte: double // 메모리 총용량
    diskUsageMByte: double // 디스크 사용량
    diskTotalMByte: double // 디스크 총용량
  }
  */
}

// AC-1030
export function getClesList(
  
) {
  // recieved data
  /*
  {
    clesCnt: number
    clesList: [
      {
        clesId: string, // id
        siteName: string, // 사업장 명
        siteCode: string, // 사업장 코드
        clesLinkIp: string, // 접속 IP
        clesLinkPort: string, // 접속 포트
        slesSftpIp: string, // SFTP IP
        clesSftpPort: string, // SFTP 포트
        sdkVersion: string // SDK 버전
      }
    ]
  }
  */
}

// AC-1040
export function getCles(
  clesId, // string
) {
  // recieved data
  /*
  {
     clesId: string, // id
    siteName: string, // 사업장 명
    siteCode: string, // 사업장 코드
    clesLinkIp: string, // 접속 IP
    clesLinkPort: string, // 접속 포트
    slesSftpIp: string, // SFTP IP
    clesSftpPort: string, // SFTP 포트
    sdkVersion: string // SDK 버전
  }
  */
}

// AC-1050
export function getRegistedCles(
  clesId, // string
  domainId, // string
  visitorId // string
) {
  // recieved data
  /*
  {
    clesId: string, // CLES ID
    domainId: string, // 도매인ID
    visitorId: string, // 내방객ID
    employeeNo: string, // 사번
    employeeName: string, // 이름
    companyCode: string, // 회사코드
    companyName: string, // 회사명
    dutyCode: string, // 직급코드
    dutyName: string, // 직급이름
    deptCode: string, // 부서코드
    depName: string, // 부서명
    photoYn: string, // 사진 등록여부
    photoCnt: int // 등록 사진수
  }
  */
}

// AC-1060
export function downloadRegistedPicture(
  clesId, // string
  domainId, // string
  visitorId, // string
) {
  // recieved data
  /*
  {
    clesId: string, // cles id
    domainId: string, // 도메인 ID
    visitorId: string, // 내방객 ID
    photoCnt: int, // 기등록 사진 수
    photoList: [{
      seqNo: int, // 순번
      virGb: string, // VR / IR 구분
      photoData: string, // Base64 Text
    }]
  }
  */
}

// AC-1070
export function registPicture(
  clesId, // string
  domainId, // string
  visitorId, // int
  photoCnt, // int
  photos, // List
) {
  const {
    seqNo, // int
    vrirGb, // string
    faceX, // int
    faceY, // int
    faceWidth, // int
    faceHeight, // int
    photoData, // string Base64 인코딩 텍스트
  } = photos;

  // recieved data
  /*
  null
  */
}