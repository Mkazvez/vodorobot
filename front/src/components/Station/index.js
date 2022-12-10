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

const Station = () => {  

    const [users, setStation] = useState([]);

    async function getStation() {
      await axios.get(`${window.origin}/api/station`)  
          .then(res => {
              setStation(res.data);
              console.log(res.data)
          });
    }

    useEffect( () => {
        getStation()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/station`, 
        { id_station: e.data.id_station===undefined?'':e.data.id_station,
          name: e.data.name===undefined?'':e.data.name,
          start: e.data.start===undefined?0:e.data.start,
          adres: e.data.adres===undefined?'':e.data.adres,
          location: e.data.location===undefined?'':e.data.location,
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
      axios.delete(`${window.origin}/api/station/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      // console.log(blobImage)
      axios.put(`${window.origin}/api/station/${iddata}`, 
        {   id_station: e.newData.id_station===undefined?e.oldData.id_station:e.newData.id_station,
            name: e.newData.name===undefined?e.oldData.name:e.newData.name,
            start: e.newData.start===undefined?e.oldData.start:e.newData.start,
            adres: e.newData.adres===undefined?e.oldData.adres:e.newData.adres,
            location: e.newData.location===undefined?e.oldData.location:e.newData.location,
            comment: e.newData.comment===undefined?e.oldData.comment:e.newData.comment,
        })
      .then(res => {
        console.log(res);
      })

    }

    const pageSizes = [10];
    return (
      <React.Fragment>
          <h2 className={'content-block'}>Станции</h2>
                    <DataGrid
                        dataSource={users}
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
                    
                        <Popup title="Станции" showTitle={true} width={700} height={525}/>      
                        <Form>
                            <Item itemType="group" colCount={1} colSpan={1}>
                                <Item dataField="id_station" />
                                <Item dataField="name" />
                                <Item dataField="start" />
                                <Item dataField="adres" />
                                <Item dataField="location" />
                                <Item dataField="comment" />
                              </Item>  
                        </Form>    
                    </Editing>    
                        <Column dataField="id" caption="ИД" />
                        <Column dataField="id_station" caption="Код" />
                        <Column dataField="name" caption="Название" />
                        <Column dataField="start" caption="Дата запуска" dataType="datetime" format="dd.MM.yyyy HH:mm:ss" />
                        <Column dataField="adres" caption="Адрес" />
                        <Column dataField="location" caption="Расположение" />
                        <Column dataField="comment" caption="Комменитарий" />
                        
                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={10} />
                    </DataGrid>    
           </React.Fragment> 

  )
}  

export default Station;