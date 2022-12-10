import axios from 'axios';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
import DataGrid, {
    Column,
    // FormItem,
    Editing,
    Paging,
    // Lookup,
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

const Ownerstation = () => {  

    const [tabledata, setOwnerStation] = useState([]);

    async function getOwnerStation() {
      await axios.get(`${window.origin}/api/ownerstation`)  
          .then(res => {
              setOwnerStation(res.data);
              console.log(res.data)
          });
    }

    useEffect( () => {
        getOwnerStation()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/ownerstation`, 
        { id_station: e.data.id_station===undefined?'':e.data.id_station,
          name: e.data.name===undefined?'':e.data.name,
          comment: e.data.comment===undefined?'':e.data.comment,
          datebegin: e.data.datebegin===undefined?'':e.data.datebegin,
          dateend: e.data.dateend===undefined?'':e.data.dateend,
        })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
      
    function removeRow(e) {
      console.log(e.key) // поле id
      const iddata = e.key
      axios.delete(`${window.origin}/api/ownerstation/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      // console.log(blobImage)
      axios.put(`${window.origin}/api/ownerstation/${iddata}`, 
        {   id_station: e.newData.id_station===undefined?e.oldData.id_station:e.newData.id_station,
            name: e.newData.name===undefined?e.oldData.name:e.newData.name,
            comment: e.newData.comment===undefined?e.oldData.comment:e.newData.comment,
            datebegin: e.newData.datebegin===undefined?e.oldData.datebegin:e.newData.datebegin,
            dateend: e.newData.dateend===undefined?e.oldData.dateend:e.newData.dateend,
        })
      .then(res => {
        console.log(res);
      })

    }

    const pageSizes = [10];
    return (
      <React.Fragment>
          <h2 className={'content-block'}>Собственники станций</h2>
                    <DataGrid
                        dataSource={tabledata}
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
                    
                        <Popup title="Собственники станций" showTitle={true} width={700} height={525}/>      
                        <Form>
                            <Item itemType="group" colCount={1} colSpan={1}>
                                <Item dataField="id_station" />
                                <Item dataField="name" />
                                <Item dataField="datebegin" />
                                <Item dataField="dateend" />
                                <Item dataField="comment" />
                              </Item>  
                        </Form>    
                    </Editing>    
                        <Column dataField="id" caption="ИД" />
                        <Column dataField="id_station" caption="Код" />
                        <Column dataField="name" caption="Название" />
                        <Column dataField="datebegin" caption="Дата начало" dataType="datetime" format="dd.MM.yyyy HH:mm:ss" />
                        <Column dataField="dateend" caption="Дата окончания" dataType="datetime" format="dd.MM.yyyy HH:mm:ss" />
                        <Column dataField="comment" caption="Комменитарий" />
                        
                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={10} />
                    </DataGrid>    
           </React.Fragment> 

  )
}  

export default Ownerstation;