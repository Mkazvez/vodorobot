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

const Collection = () => {  

    const [collection, setCollection] = useState([]);
    const [users, setUsers] = useState([]);
    const [station, setStation] = useState([]);

    async function getStation() {
        await axios.get(`${window.origin}/api/station`)  
            .then(res => {
                setStation(res.data);
                // console.log(res.data)
            });
      }

    async function getCollection() {
      await axios.get(`${window.origin}/api/collection`)  
          .then(res => {
              setCollection(res.data);
            //   console.log(res.data)
          });
    }

    async function getUsers() {
        await axios.get(`${window.origin}/api/users`)  
            .then(res => {
                setUsers(res.data);
                // console.log(res.data)
            });
      }
 

    useEffect( () => {
        getCollection();
        getUsers();
        getStation()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/collection`, 
        { id_station: e.data.id_station===undefined?'':e.data.id_station,
          balance: e.data.balance===undefined?'':e.data.balance,
          id_user: e.data.id_user===undefined?0:e.data.id_user,
          user_string: e.data.user_string===undefined?'':e.data.user_string,
          date_maintenance: e.data.date_maintenance===undefined?'':e.data.date_maintenance,
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
      axios.delete(`${window.origin}/api/collection/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      // console.log(blobImage)
      axios.put(`${window.origin}/api/collection/${iddata}`, 
        {   id_station: e.newData.id_station===undefined?e.oldData.id_station:e.newData.id_station,
            balance: e.newData.balance===undefined?e.oldData.balance:e.newData.balance,
            id_user: e.newData.id_user===undefined?e.oldData.id_user:e.newData.id_user,
            user_string: e.newData.user_string===undefined?e.oldData.user_string:e.newData.user_string,
            date_maintenance: e.newData.date_maintenance===undefined?e.oldData.date_maintenance:e.newData.date_maintenance,
            comment: e.newData.comment===undefined?e.oldData.comment:e.newData.comment,
        })
      .then(res => {
        console.log(res);
      })

    }

    const pageSizes = [15];
    return (
      <React.Fragment >
          <h2 className={'content-block'}>Инкассация</h2>
                    <DataGrid
                        className={'dx-card wide-card'}
                        dataSource={collection}
                        keyExpr="id"
                        onRowInserting={insertRow}
                        onRowRemoving={removeRow}
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
                        allowAdding={true}
                        allowDeleting={true}>
                    
                        <Popup title="Инкассация" showTitle={true} width={700} height={525}/>      
                        <Form>
                            <Item itemType="group" colCount={1} colSpan={1}>
                                <Item dataField="id_station" />
                                <Item dataField="balance" />
                                <Item dataField="id_user" width={300}/>
                                {/* <Item dataField="user_string" /> */}
                                <Item dataField="date_maintenance" />
                                <Item dataField="comment" />
                              </Item>  
                        </Form>    
                    </Editing>    
                        <Column dataField="id" caption="ИД" />
                        <Column dataField="id_station" caption="Станция">
                            <Lookup dataSource={station} displayExpr="name" valueExpr="id_station" />
                        </Column> 
                        <Column dataField="balance" caption="Сумма инкасации" />
                        <Column dataField="balance" caption="Сумма инкасации" />
                        <Column dataField="id_user" caption="Сотрудник">
                            <Lookup dataSource={users} displayExpr="name" valueExpr="id" />
                        </Column> 
                        {/* <Column dataField="user_string" caption="ФИО" width={200} /> */}
                        <Column dataField="date_maintenance" caption="Дата инкассации" dataType="date" format="dd.MM.yyyy" />
                        <Column dataField="comment" caption="Коментарий" />
                        
                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={15} />
                    </DataGrid>    
           </React.Fragment> 

  )
}  

export default Collection;