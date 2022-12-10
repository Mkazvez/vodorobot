import axios from 'axios';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
import DataGrid, {
    Column,
    ColumnFixing,
    ColumnChooser,
    // FormItem,
    Editing,
    Paging,
    Lookup,
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

function pred_post(value, defaultvalue) {
  return value===undefined?defaultvalue:value
}

const Setting = () => {  

    const [tabeldata, setSetting] = useState([]);
    const [station, setStation] = useState([]);

    async function getStation() {
        await axios.get(`${window.origin}/api/station`)  
            .then(res => {
                setStation(res.data);
                // console.log(res.data)
            });
      }

    async function getSetting() {
      await axios.get(`${window.origin}/api/setting`)  
          .then(res => {
              setSetting(res.data);
              console.log(res.data)
          });
    }

    useEffect( () => {
        getSetting();
        getStation();
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/setting`, 
        { id_text: pred_post(e.data.id_text,''),
          exr1: pred_post(e.data.exr1,''),
          exr2: pred_post(e.data.exr2,''),
          tONexr1: pred_post(e.data.tONexr1,''),
          mONexr1: pred_post(e.data.mONexr1,''),
          tONexr2: pred_post(e.data.tONexr2,''),
          mONexr2: pred_post(e.data.mONexr2,''),
          tOFFexr1: pred_post(e.data.tOFFexr1,''),
          tOFFexr2: pred_post(e.data.tOFFexr2,''),
          mOFFexr1: pred_post(e.data.mOFFexr1,''),
          mOFFexr2: pred_post(e.data.mOFFexr2,''),
          player: pred_post(e.data.player,''),
          se_date: pred_post(e.data.se_date,''),
          d_date: pred_post(e.data.d_date,''),
        })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
      
    function removeRow(e) {
      console.log(e.key) // поле id
      const iddata = e.key
      axios.delete(`${window.origin}/api/setting/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function setupClick(e) {
        console.log(e);
              //setupTX,3,1,22,18,30,21,0,9,0,2,
      console.log(e.row.data);
      const e_message =  'settingTX,'+e.row.data.exr1+','
                        +e.row.data.exr2+','
                        +e.row.data.tONexr1+','
                        +e.row.data.mONexr1+','
                        +e.row.data.tONexr2+','
                        +e.row.data.mONexr2+','
                        +e.row.data.tOFFexr1+','
                        +e.row.data.tOFFexr2+','
                        +e.row.data.mOFFexr1+','
                        +e.row.data.mOFFexr2+','
                        +e.row.data.player+','
              
        console.log('settingTX,'+e_message);

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
      axios.put(`${window.origin}/api/setting/${iddata}`, 
        { id_text: e.newData.id_text===undefined?e.oldData.id_text:e.newData.id_text,
          exr1: e.newData.exr1===undefined?e.oldData.exr1:e.newData.exr1,
          exr2: e.newData.exr2===undefined?e.oldData.exr2:e.newData.exr2,
          tONexr1: e.newData.tONexr1===undefined?e.oldData.tONexr1:e.newData.tONexr1,
          mONexr1: e.newData.nONexr1===undefined?e.oldData.nONexr1:e.newData.nONexr1,
          tONexr2: e.newData.tONexr2===undefined?e.oldData.tONexr2:e.newData.tONexr2,
          mONexr2: e.newData.nONexr2===undefined?e.oldData.nONexr2:e.newData.nONexr2,
          tOFFexr1: e.newData.tOFFexr1===undefined?e.oldData.tOFFexr1:e.newData.tOFFexr1,
          tOFFexr2: e.newData.tOFFexr2===undefined?e.oldData.tOFFexr2:e.newData.tOFFexr2,
          mOFFexr1: e.newData.mOFFexr1===undefined?e.oldData.mOFFexr1:e.newData.mOFFexr1,
          mOFFexr2: e.newData.mOFFexr2===undefined?e.oldData.mOFFexr2:e.newData.mOFFexr2,
          player: e.newData.player===undefined?e.oldData.player:e.newData.player,
          se_date: e.newData.se_date===undefined?e.oldData.se_date:e.newData.se_date,
          d_date: e.newData.d_date===undefined?e.oldData.d_date:e.newData.d_date,
        })
      .then(res => {
        console.log(res);
      })

    }

    const pageSizes = [15];
    return (
      <React.Fragment>
            <h2 className={'content-block'}>Настройка станций</h2>
                    <DataGrid
                        className={'dx-card wide-card'}
                        dataSource={tabeldata}
                        keyExpr="id"
                        onRowInserting={insertRow}
                        onRowRemoving={removeRow}
                        onRowUpdating={updateRow}
                        useIcons={true}
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
                        // allowDeleting={true}
                        >
                    
                        <Popup title="Настройка станций" showTitle={true} width={700} height={525}/>      
                        <Form>
                            <Item itemType="group" colCount={1} colSpan={1}>
                                {/* <Item dataField="id_station" /> */}
                                <Item dataField="id_text" />
                                <Item dataField="exr1" />
                                <Item dataField="exr2" />
                                <Item dataField="tONexr1" />
                                <Item dataField="mONexr1" />
                                <Item dataField="tONexr2" />
                                <Item dataField="mONexr2" />
                                <Item dataField="tOFFexr1" />
                                <Item dataField="tOFFexr2" />
                                <Item dataField="mOFFexr1" />
                                <Item dataField="mOFFexr2" />
                                <Item dataField="player" />
                                {/* <Item dataField="se_date" />
                                <Item dataField="d_date" /> */}
                              </Item>  
                        </Form>    
                    </Editing>    
                      <ColumnChooser enabled={true} />
                      <ColumnFixing enabled={true} />
                        {/* <Column dataField="id" caption="ИД" width={100} /> */}
                        <Column dataField="id_text" caption = "Станция" />
                        <Column dataField="exr1" caption = "Реле 1" />
                        <Column dataField="exr2" caption = "Реле 2" />
                        <Column dataField="tONexr1" caption = "Таймер 1 (часы выкл)" />
                        <Column dataField="mONexr1" caption = "Таймер 2 (часы вкл)" />
                        <Column dataField="tONexr2" caption = "Таймер 1 (минуты вкл)" />
                        <Column dataField="mONexr2" caption = "Таймер 2 (минуты вкл)" />
                        <Column dataField="tOFFexr1" caption = "Таймер 1 (часы выкл)" />
                        <Column dataField="tOFFexr2" caption = "Таймер 2 (часы выкл)" />
                        <Column dataField="mOFFexr1" caption = "Таймер 1 (минуты выкл)" />
                        <Column dataField="mOFFexr2" caption = "Таймер 2 (минуты выкл)" />
                        <Column dataField="player" caption = "Уровень звука" />
                        <Column type="buttons" width={110}>
                          <Button name="edit" />
                          <Button hint="setup" icon="check"  onClick={setupClick} />
                        </Column>  
                        {/* <Column dataField="se_date" width={100} /> */}
                        {/* <Column dataField="d_date" dataType="datetime" format="dd.MM.yyyy HH:mm:ss" width={100} /> */}
                        
                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={15} />
                    </DataGrid>    
           </React.Fragment> 

  )
}  

export default Setting;