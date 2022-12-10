import axios from 'axios';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
import DataGrid, {
    Column,
    // FormItem,
    Editing,
    Paging,
    Lookup,
    Popup,
    Form,
    Pager,
    FilterRow,
    HeaderFilter
  } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';  
import 'devextreme-react/text-area';  
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';

const Maintenance = () => {  
    const arr_type_catrige = [
        {id: 'мех', name: "мех"},
        {id: 'угол', name: "угол"},
        {id: 'отмос', name: "отмос"},
        ]

        const arr_status = [
            {id: 'В работе', name: "В работе"},
            {id: 'Не в работе', name: "Не в работе"},
            ]
            
    const [maintenance, setMaintenance] = useState([]);
    const [station, setStation] = useState([]);

    async function getStation() {
        await axios.get(`${window.origin}/api/station`)  
            .then(res => {
                setStation(res.data);
                console.log(res.data)
            });
      }

    async function getMaintenance() {
      await axios.get(`${window.origin}/api/maintenance`)  
          .then(res => {
              setMaintenance(res.data);
              // console.log(res.data)
          });
    }

    useEffect( () => {
        getMaintenance();
        getStation();
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/maintenance`, 
        {   id_station: e.data.id_station===undefined?'':e.data.id_station,
            date_replace: e.data.date_replace===undefined?'':e.data.date_replace,
            type_catrige: e.data.type_catrige===undefined?'':e.data.type_catrige,
            qty_litr: e.data.qty_litr===undefined?'':e.data.qty_litr,
            procent_of_used: e.data.procent_of_used===undefined?0:e.data.procent_of_used,
            status: e.data.status===undefined?'':e.data.status,
            comment: e.data.comment===undefined?'':e.data.comment,
        })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
      
    function removeRow(e) {
      console.log(e.key) // поле id
      const iddata = e.key
      axios.delete(`${window.origin}/api/maintenance/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      // console.log(blobImage)
      axios.put(`${window.origin}/api/maintenance/${iddata}`, 
        {   id_station: e.newData.id_station===undefined?e.oldData.id_station:e.newData.id_station,
            date_replace: e.newData.date_replace===undefined?e.oldData.date_replace:e.newData.date_replace,
            type_catrige: e.newData.type_catrige===undefined?e.oldData.type_catrige:e.newData.type_catrige,
            qty_litr: e.newData.qty_litr===undefined?e.oldData.qty_litr:e.newData.qty_litr,
            procent_of_used: e.newData.procent_of_used===undefined?e.oldData.procent_of_used:e.newData.procent_of_used,
            status: e.newData.status===undefined?e.oldData.status:e.newData.status,
            comment: e.newData.comment===undefined?e.oldData.comment:e.newData.comment,
        })
      .then(res => {
        console.log(res);
      })

    }
    function preupdateRow(e) {
      console.log(station)
    }  

    const pageSizes = [15];
    return (
      <React.Fragment>
                    <DataGrid
                        className={'dx-card wide-card'}
                        dataSource={maintenance}
                        keyExpr="id"
                        onRowInserting={insertRow}
                        onRowRemoving={removeRow}
                        onRowUpdating={updateRow}
                        onEditingStart={preupdateRow}
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
                        allowAdding={true}
                        allowDeleting={true}>
                    
                        <Popup title="ТО" showTitle={true} width={700} height={525}/>      
                        <Form>
                            <Item itemType="group" colCount={1} colSpan={1}>
                                <Item dataField="id_station" />
                                <Item dataField="date_replace" />
                                <Item dataField="type_catrige" />
                                <Item dataField="qty_litr" />
                                <Item dataField="procent_of_used" />
                                <Item dataField="status" />
                                <Item dataField="comment" />
                              </Item>  
                        </Form>    
                    </Editing>    
                        <Column dataField="id" caption="ИД" />
                        <Column dataField="id_station" caption="Станция" >
                            <Lookup dataSource={station} displayExpr="name" valueExpr="id_station" />
                        </Column> 
                        <Column dataField="date_replace" caption="Дата замены" dataType="date" format="dd.MM.yyyy" />
                        <Column dataField="type_catrige" caption="Тип фильтра">
                            <Lookup dataSource={arr_type_catrige} displayExpr="name" valueExpr="id" />
                        </Column>

                        <Column dataField="qty_litr" caption="Ресурс литры" />
                        <Column dataField="procent_of_used" caption="% использования" />
                        <Column dataField="status" caption="Статус">
                            <Lookup dataSource={arr_status} displayExpr="name" valueExpr="id" />
                        </Column>

                        <Column dataField="comment" caption="Коментарий" />
                        
                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={15} />
                    </DataGrid>    
           </React.Fragment> 

  )
}  

export default Maintenance;