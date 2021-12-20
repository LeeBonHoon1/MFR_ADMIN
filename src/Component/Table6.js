import React, { useEffect, useRef } from 'react';
import style from '../Css/Main.module.css';

// import jzip from 'jzip';

import * as JSZip from 'jszip';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-buttons';

window.JSZip = JSZip;

const Table = (props) => {
  // const container = useRef();
  // const datatables = useRef();

  useEffect(() => {
    // if(props.data) {
    //   if(datatables.current) {
    //     datatables.current.destroy();
    //   }
      
    //   const table = $(container.current).DataTable({
    //     // paginate: false,
    //     // scrollY: 300,
    //     buttons: [
    //       'copy', 'excel', 'pdf'
    //     ]
    //   });

    //   datatables.current = table;
    // }
  }, [props]);

  const handleChangeCheckbox = (e, idx) => {
    console.log(e, idx);

    props.onChangeCheckbox && props.onChangeCheckbox(idx);
  }

  const handleClickRow = (e, idx) => {
    props.onClickRow && props.onClickRow(idx);
  }

  if(!props?.columnWidths) {
    return null;
  }

  return (
    <>
      <div className={style.tableContainer7}>
        <table 
          // ref={container}
        >
          <thead>
            <tr>
              <th width="5%"></th>
              <th width="15%">번호</th>
              {props.columnNames && Object.keys(props.columnNames).map((v, i) => (
                <th key={i} width={`${props?.columnWidths[v]+'%' || ''}` }>{props.columnNames[v]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props?.data?.map((v, i) => (
              <tr key={i} onClick={(e) => {handleClickRow(e, v.idx)}}>
                <td><input type="checkbox" onChange={(e) => {handleChangeCheckbox(e, v.idx)}} /></td>
                <td>{props.data.length - i}</td>
                {props.columnNames && Object.keys(props?.columnNames).map((vv, ii) => (
                  <td key={ii} 
                    className={(props.calsses && props.classes[vv](v[vv])) || ''}>
                    {v[vv]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table;