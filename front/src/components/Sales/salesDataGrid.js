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
import React from 'react';
import FileUploader from 'devextreme-react/file-uploader';
// import { createStore } from 'devextreme-aspnet-data-nojquery';
import newsDefaultJpg from "../../static/images/2456034.jpg";



const salesDataGrid = () => {  

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const idSales = useParams();
    //   window.alert(newstop4.find(e => e.id = (idNews?idNews.id:'1') ).news_text)
      // console.log(id.id, `${window.origin}/api/objects/${id?id.id:'1'}`,window)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sales, setSales] = useState([]);
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect( () => {
    //     if (idNews.id>0 && idNews.id<=newstop4.length) {
    //         setNews(newstop4.find(e => e.id === (idNews?idNews.id:'1') ))
    //         console.log(newstop4.find((e) => e.id === (idNews?idNews.id:'1') ))
    //     } else
    //     {setNews(newstop4.find(e => e.id === ('1') ))}    
    // }, []);

    async function getSales() {
      await axios.get(`${window.origin}/api/sales`)  
          .then(res => {
              setSales(res.data);
              console.log(res.data)
          });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        getSales()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/sales`, 
        { id_text : e.data.id_text===undefined?'':e.data.id_text, 
          purchase : e.data.purchase === undefined?'':e.data.purchase, 
          balance : e.data.balance === undefined?'':e.data.balance, 
          litr : e.data.litr === undefined?'':e.data.litr, 
          pay : e.data.pay === undefined?'':e.data.pay, 
          s_date : e.data.s_date === undefined?'':e.data.s_date, 
          d_date : e.data.d_date === undefined?'':e.data.d_date, 
        })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
      
    function removeRow(e) {
      console.log(e.key) // ???????? id
      const iddata = e.key
      axios.delete(`${window.origin}/api/sales/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      axios.put(`${window.origin}/api/sales/${iddata}`, 
        { id_text : e.newData.id_text===undefined?e.oldData.id_text:e.newData.id_text, 
          purchase : e.newData.purchase === undefined?e.oldData.purchase:e.newData.purchase, 
          balance : e.newData.balance === undefined?e.oldData.balance:e.newData.balance, 
          litr : e.newData.litr === undefined?e.oldData.litr:e.newData.litr, 
          pay : e.newData.pay === undefined?e.oldData.pay:e.newData.pay, 
          s_date : e.newData.s_date === undefined?e.oldData.s_date:e.newData.s_date, 
          d_date : e.newData.d_date === undefined?e.oldData.d_date:e.newData.d_date, 
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
          <a href={`/newsInDetal/${cellData.data.id}`}>??????????????????</a>
        </div>  
      );
    }
    return (
        <React.Fragment>
            <h2 className={'content-block'}>??????????????</h2>
                    <DataGrid
                        dataSource={sales}
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
                        <Column dataField="id_text" caption="??????????????" />
                        <Column dataField="purchase" caption="?????? ??????????????" />
                        <Column dataField="pay" caption="?????? ????????????" />
                        <Column dataField="balance" caption="??????????" />
                        <Column dataField="litr" caption="??????????" />
                        <Column dataField="type_data_transfer" caption="?????? ????????????????" />
                        <Column dataField="type_currency" caption="?????? ????????????" />
                        <Column dataField="type_calculation" caption="?????? ??????????????" />
                        <Column dataField="d_date" caption="???????? ??????????" dataType="datetime" format="dd.MM.yyyy HH:mm:ss" />

                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={15} />
                    </DataGrid>    
        </React.Fragment>
  )
}  

export default salesDataGrid;