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
import FileUploader from 'devextreme-react/file-uploader';
// import { createStore } from 'devextreme-aspnet-data-nojquery';
import newsDefaultJpg from "../../static/images/2456034.jpg";



const ikeyDataGrid = () => {  

    const type_keys = [
      {id: 'Безлимитный', name: "Безлимитный"},
      {id: 'Дебетовый', name: "Дебетовый"},
    ]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const idTips = useParams();
    //   window.alert(newstop4.find(e => e.id = (idNews?idNews.id:'1') ).news_text)
      // console.log(id.id, `${window.origin}/api/objects/${id?id.id:'1'}`,window)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ikey, setIkey] = useState([]);
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect( () => {
    //     if (idNews.id>0 && idNews.id<=newstop4.length) {
    //         setNews(newstop4.find(e => e.id === (idNews?idNews.id:'1') ))
    //         console.log(newstop4.find((e) => e.id === (idNews?idNews.id:'1') ))
    //     } else
    //     {setNews(newstop4.find(e => e.id === ('1') ))}    
    // }, []);

    async function getIkey() {
      await axios.get(`${window.origin}/api/ikey`)  
          .then(res => {
              setIkey(res.data);
              console.log(res.data)
          });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        getIkey()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/tips`, 
        { id_text : e.data.id_text===undefined?'':e.data.id_text, 
          balance : e.data.balance === undefined?'':e.data.balance, 
          ikey : e.data.ikey === undefined?'':e.data.ikey, 
          balance_litr : e.data.balance_litr === undefined?'':e.data.balance_litr, 
          s_date : e.data.s_date === undefined?'':e.data.s_date, 
          d_date : e.data.d_date === undefined?'':e.data.d_date, 
        })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
      
    function removeRow(e) {
      console.log(e.key) // поле id
      const iddata = e.key
      axios.delete(`${window.origin}/api/tips/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      axios.put(`${window.origin}/api/ikey/${iddata}`, 
        { balance : e.newData.balance === undefined?e.oldData.balance:e.newData.balance,  
          type_key : e.newData.type_key === undefined?e.oldData.type_key:e.newData.type_key,  
      })
      .then(res => {
        console.log(res);
        //console.log(res.data);
      })

    }

    const notesEditorOptions = { height: 100 };

    const pageSizes = [15];

    function HrefCell(cellData) {
      return (
        <div>
          <a href={`/newsInDetal/${cellData.data.id}`}>Подробнее</a>
        </div>  
      );
    }
    return (
        <React.Fragment>
            <h2 className={'content-block'}>Ключи</h2>
                    <DataGrid
                        dataSource={ikey}
                        keyExpr="id"
                        // defaultColumns={columns}
                        // onRowInserting={insertRow}
                        // onRowRemoving={removeRow}
                        onRowUpdating={updateRow}
                        showBorders={false}
                        focusedRowEnabled={true}
                        defaultFocusedRowIndex={0}
                        columnAutoWidth={true}
                        columnHidingEnabled={true}
                    >
                    <Paging enabled={false} />
                    <FilterRow visible={true} />
                    <HeaderFilter visible={true} />
                    <Editing
                        mode="popup"
                        allowUpdating={true}
                    >
                        <Popup title="Ключи" showTitle={true} width={700} height={525}/>      
                        <Form>
                            <Item itemType="group" colCount={1} colSpan={1}>
                                <Item dataField="ikey" />
                                <Item dataField="balance" />
                                <Item dataField="type_key" />
                                <Item dataField="number_u" />
                              </Item>  
                        </Form>    
                    </Editing>    

                        <Column dataField="id" caption="ИД" width={60} visible={true}  allowEditing={false} />
                        {/* <Column dataField="id_text" caption="Станция" width={150} visible={false}/> */}
                        <Column dataField="ikey" caption="Ключ" allowEditing={false} />
                        <Column dataField="balance" caption="Баланс"/>
                        <Column dataField="type_key" caption="Тип ключа">
                          <Lookup dataSource={type_keys} displayExpr="name" valueExpr="id" />
                        </Column>                         
                        {/* <Column dataField="s_date" caption="Дата время стр." width={200} /> */}
                        {/* <Column dataField="d_date" caption="Дата время" dataType="datetime" format="dd.MM.yyyy HH:mm:ss" width={200} /> */}
                        <Column dataField="number_u" caption="Код ключа"  allowEditing={false} />

                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={15} />
                    </DataGrid>    
        </React.Fragment>
  )
}  

export default ikeyDataGrid;