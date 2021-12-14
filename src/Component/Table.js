import React, { useEffect, useRef } from 'react';
import style from '../Css/Main.module.css';

// import jzip from 'jzip';

// import $ from 'jquery';

// import Datatable from 'datatables.net';
// import dataTablesButtons from 'datatables.net-buttons/js/dataTables.buttons';
// import 'datatables.net-buttons/js/buttons.html5';

// window.JSZip = jzip;

const Table = (props) => {
  // const container = useRef();
  // const datatables = useRef();

  useEffect(() => {
    // if(props.data) {
    //   if(datatables.current) {
    //     datatables.current.destroy();
    //   }
      
    //   const table = new Datatable($(container.current), {
    //     // paginate: false,
    //     scrollY: 300,
    //     buttons: [
    //       'excelHtml5',
    //     ]
    //   } );

    //   datatables.current = table;
    // }
  }, [props]);

  if(!props?.columnWidths) {
    return null;
  }

  return (
    <>
    <div className={style.tableContainer}>
      <div className={style.topButtonContainer}>
      {props.topButtonItem && (  
        <button className={style.topButton} onClick={props.topButtonItem.onClick}>
          {props.topButtonItem.text}
        </button>
      )}
      </div>
      <div className={style.tableContainer2}>
        <table 
          // ref={container}
        >
          <thead>
            <tr>
              <th width="5%">번호</th>
              {props.columnNames && Object.keys(props.columnNames).map((v, i) => (
                <th key={i} width={`${props?.columnWidths[v]+'%' || ''}` }>{props.columnNames[v]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props?.data?.map((v, i) => (
              <tr key={i}>
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
    </div>
    </>
  )
}

export default Table;