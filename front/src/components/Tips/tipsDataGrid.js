import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import DataGrid, {
    Column,
    FormItem,
    Editing,
    Paging,
    Lookup,
    Popup,
    Form,
    Pager,
    FilterRow,
    HeaderFilter,
  } from 'devextreme-react/data-grid';
import { Item, Label } from 'devextreme-react/form';  
import 'devextreme-react/text-area';  
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
// import FileUploader from 'devextreme-react/file-uploader';
// import { createStore } from 'devextreme-aspnet-data-nojquery';




const tipsDataGrid = () => {  

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const idTips = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tips, setTips] = useState([]);
    
    async function getTips() {
      await axios.get(`${window.origin}/api/tips`)  
          .then(res => {
              setTips(res.data);
              console.log(res.data)
          });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        getTips()
      }, []);

    const pageSizes = [15];
   
    return (
        <React.Fragment>
            <h2 className={'content-block'}>Чаевые</h2>
                    <DataGrid
                        className={'dx-card wide-card'}
                        dataSource={tips}
                        keyExpr="id"
                        showBorders={false}
                        focusedRowEnabled={true}
                        defaultFocusedRowIndex={0}
                        columnAutoWidth={true}
                        columnHidingEnabled={true}
                    >
                    <Paging enabled={false} />
                    <FilterRow visible={true} />
                    <HeaderFilter visible={true} />
                        {/* <Column dataField="id" caption="ИД" visible={false}/> */}
                        <Column dataField="id_text" caption="Станция" />
                        <Column dataField="tips_balance" caption="Тип" />
                        <Column dataField="comment" caption="К" />
                        <Column dataField="d_date" caption="Дата время"  dataType="datetime" format="dd.MM.yyyy HH:mm:ss" />

                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={15} />
                    </DataGrid>    
        </React.Fragment>
  )
}  

export default tipsDataGrid;