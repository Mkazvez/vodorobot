import axios from 'axios';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
import DataGrid, {
    Column,
    // FormItem,
    ColumnFixing,
    ColumnChooser,
    Editing,
    Paging,
    // Lookup,
    Popup,
    Form,
    Pager,
    FilterRow,
    HeaderFilter,
    Button
  } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';  
import 'devextreme-react/text-area';  
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';

const SetupStation = () => {  

    const [setupStation, setSetupStation] = useState([]);

    async function getSetupStation() {
      await axios.get(`${window.origin}/api/setup`)  
          .then(res => {
              setSetupStation(res.data);
              console.log(res.data)
          });
    }

    useEffect( () => {
        getSetupStation()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/setup`, 
        {   id_text: e.data.id_text===undefined?'':e.data.id_text,
            price: e.data.price===undefined?'':e.data.price,
            discount: e.data.discount===undefined?'':e.data.discount,
            twater: e.data.twater===undefined?'':e.data.twater,
            tifw: e.data.tifw===undefined?'':e.data.tifw,
            Free: e.data.Free===undefined?'':e.data.Free,
            discountONclock: e.data.discountONclock===undefined?'':e.data.discountONclock,
            discountONminute: e.data.discountONminute===undefined?'':e.data.discountONminute,
            discountOFFclock: e.data.discountOFFclock===undefined?'':e.data.discountOFFclock,
            discountOFFminute: e.data.discountOFFminute===undefined?'':e.data.discountOFFminute,
            MoDe: e.data.MoDe===undefined?'':e.data.MoDe,
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
      axios.delete(`${window.origin}/api/setup/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function setupClick(e) {
      //setupTX,3,1,22,18,30,21,0,9,0,2,
      console.log(e.row.data);
      const e_message = 'setupTX,'+e.row.data.price+','
                        +e.row.data.discount+','
                        +e.row.data.twater+','
                        +e.row.data.tifw+','
                        +e.row.data.Free+','
                        +e.row.data.discountONclock+','
                        +e.row.data.discountONminute+','
                        +e.row.data.discountOFFclock+','
                        +e.row.data.discountOFFminute+','
                        +e.row.data.MoDe+','
      console.log('setupTX,'+e_message);
      axios.post(`${window.origin}/api/mqtt`, 
        { code: e.row.data.id_text,
          message: e_message,
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }  

    function updateRow(e) {
      const iddata = e.key
      // console.log(blobImage)
      axios.put(`${window.origin}/api/setup/${iddata}`, 
        {   id_text: e.newData.id_text===undefined?e.oldData.id_text:e.newData.id_text,
            price: e.newData.price===undefined?e.oldData.price:e.newData.price,
            discount: e.newData.discount===undefined?e.oldData.discount:e.newData.discount,
            twater: e.newData.twater===undefined?e.oldData.twater:e.newData.twater,
            tifw: e.newData.tifw===undefined?e.oldData.tifw:e.newData.tifw,
            Free: e.newData.Free===undefined?e.oldData.Free:e.newData.Free,
            discountONclock: e.newData.discountONclock===undefined?e.oldData.discountONclock:e.newData.discountONclock,
            discountONminute: e.newData.discountONminute===undefined?e.oldData.discountONminute:e.newData.discountONminute,
            discountOFFclock: e.newData.discountOFFclock===undefined?e.oldData.discountOFFclock:e.newData.discountOFFclock,
            discountOFFminute: e.newData.discountOFFminute===undefined?e.oldData.discountOFFminute:e.newData.discountOFFminute,
            MoDe: e.newData.MoDe===undefined?e.oldData.MoDe:e.newData.MoDe,
            s_date : e.newData.s_date === undefined?e.oldData.s_date:e.newData.s_date, 
            d_date : e.newData.d_date === undefined?e.oldData.d_date:e.newData.d_date,         
        })
      .then(res => {
        console.log(res);
      })

    }

    const pageSizes = [10];
    return (
      <React.Fragment>
          <h2 className={'content-block'}>Настройка цен</h2>
                    <DataGrid
                        className={'dx-card wide-card'}
                        dataSource={setupStation}
                        keyExpr="id"
                        onRowInserting={insertRow}
                        onRowRemoving={removeRow}
                        onRowUpdating={updateRow}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        columnAutoWidth={true}
                        showBorders={true}
                    >
                    <Paging enabled={false} />
                    <FilterRow visible={true} />
                    <HeaderFilter visible={true} />
                    <Editing
                        mode="popup"
                        allowUpdating={true}
                        allowAdding={true}
                        allowDeleting={true}>
                    
                        <Popup title="Настройка цен" showTitle={true} width={700} height={525}/>      
                        <Form>
                            <Item itemType="group" colCount={1} colSpan={1}>
                                <Item dataField="id_text" />
                                <Item dataField="price" />
                                <Item dataField="discount" />
                                <Item dataField="twater" />
                                <Item dataField="tifw" />
                                <Item dataField="Free" />
                                <Item dataField="discountONclock" />
                                <Item dataField="discountONminute" />
                                <Item dataField="discountOFFclock" />
                                <Item dataField="discountOFFminute" />
                                <Item dataField="MoDe" />
                                {/* <Item dataField="d_date" /> */}
                              </Item>  
                        </Form>    
                    </Editing>    
                        <ColumnChooser enabled={true} />
                        <ColumnFixing enabled={true} />
                        <Column dataField="id" caption="ИД" />
                        <Column dataField="id_text" caption="Код" />
                        <Column dataField="price" caption="Цена" />
                        <Column dataField="discount" caption="discount" />
                        <Column dataField="twater" caption="Т.воды" />
                        <Column dataField="tifw" caption="tifw" />
                        <Column dataField="Free" caption="Free" />
                        <Column dataField="discountONclock" caption="discountONclock" />
                        <Column dataField="discountONminute" caption="discountONminute" />
                        <Column dataField="discountOFFclock" caption="discountOFFclock" />
                        <Column dataField="discountOFFminute" caption="discountOFFminute" />
                        <Column dataField="MoDe" caption="MoDe" />
                        {/* <Column dataField="s_date" caption="s_date" width={200} /> */}
                        <Column dataField="d_date" caption="s_date" dataType="datetime" format="dd.MM.yyyy HH:mm:ss" />
                        <Column type="buttons" width={110}>
                          <Button name="delete" />
                          <Button name="edit" />
                          <Button hint="setup" icon="check"  onClick={setupClick} />
                        </Column>  
                        
                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={15} />
                    </DataGrid>    
           </React.Fragment> 

  )
}  

export default SetupStation;