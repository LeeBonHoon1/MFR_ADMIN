import dateformat from 'dateformat';

import crypto from 'crypto';

export const filterDate = (dateStr) => {
  const y = dateStr.substr(0, 4);
  const m = dateStr.substr(4, 2);
  const d = dateStr.substr(6, 2);

  return dateformat(new Date(`${y}-${m}-${d}`), 'yyyy-mm-dd');
}

export const filterLongText = (str, num=10) => {
  if(typeof str !== 'string') return str;

  if(str.length > num) {
    return str.substring(0, num) + '...';
  } else {
    return str;
  }
}

export const dataURLtoFile = (dataurl, fileName) => {
  let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], fileName, {type:mime});
}

export const downloadURI = (uri, name) => { 
  const link = document.createElement("a"); 
  link.download = name; 
  link.href = uri; 
  document.body.appendChild(link); 
  link.click(); 
  document.body.removeChild(link);
  // delete link;
}


/*********************
 * encrpyt data
 *********************/
const ENCRYPT_KEY = 'MfrDlflskAkstp@1#1';
// const INFO_KEY = 'FusalflaAkstp@1#'; // FusalflaAkstp@1#1
const INFO_KEY = crypto.randomBytes(32);


const iv = Buffer.from([
  0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00,
]); 

console.log('iv = ',iv)

export const ecryptInfoText = () => {  
  let cipher = crypto.createCipheriv('aes-256-cbc', INFO_KEY, iv); 
  let encrypted = cipher.update('Hello World', 'utf8', 'base64'); 
  encrypted += cipher.final('base64');
  
  console.log(encrypted);
  return '';
}

export const decryptInfoText = () => {
  return '';
}
