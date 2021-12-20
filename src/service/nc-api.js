import axios from 'axios';

const HOST_NAME = 'http://localhost:4000';
// const HOST_NAME = `http://${window.location.host}`;

/**************
 * Login
 **************/
export function getUser(id, password) {
  return axios.get(HOST_NAME + `/users?id=${id}&password=${password}`)
}

/**************
 * Notice
 **************/
export function getNotices() {
  return axios.get(HOST_NAME + '/notices');
}

/**************
 * WorkplaceList
 **************/
export function getWorkplaces() {
  return axios.get(HOST_NAME + '/workplaces');
}

/**************
 * WorkplaceLink
 **************/
export function getSendUsers() {
  return axios.get(HOST_NAME + '/sendUsers');
}

/**************
 * WorkplaceRegist
 **************/
export function getProcesses() {
  return axios.get(HOST_NAME + '/processes');
}

/**************
 * Authority
 **************/
export function getWorkplacesByUserIdx() {
  return axios.get(HOST_NAME + '/workplacesByUserIdx');
}

export function getAllWorkplaces() {
  return axios.get(HOST_NAME + '/allWorkplaces');
}

export function getSelectdWorkplaces() {
  return axios.get(HOST_NAME + '/selectedWorkplaces');
}

export function getUserinfos() {
  return axios.get(HOST_NAME + '/userinfos');
}

/**************
 * Server
 **************/
export function getServers() {
  return axios.get(HOST_NAME + '/servers');
}
