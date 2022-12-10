import '../css/webflow.css'
import '../css/normalize.css'
import '../css/life-group.webflow.css'
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
// import FileUploader from 'devextreme-react/file-uploader';

const topicGrid = () => {  

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const idOblects = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [topics, setTopics] = useState([]);
    

    async function getTopics() {
      await axios.get(`${window.origin}/api/topicis`)  
          .then(res => {
              setTopics(res.data);
              console.log(res.data)
          });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        getTopics()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/topicis`, 
        { name : e.data.name=undefined?'':e.data.name, 
          qty_day : e.data.qty_day=undefined?'':e.data.qty_day, 
        })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
      
    function removeRow(e) {
      console.log(e.key) // поле id
      const iddata = e.key
      axios.delete(`${window.origin}/api/topicis/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      // console.log(blobImage)
      axios.put(`${window.origin}/api/topicis/${iddata}`, 
        { name : e.newData.name=undefined?e.oldData.name:e.newData.name, 
        qty_day : e.newData.qty_day=undefined?e.oldData.qty_day:e.newData.qty_day 
      })
      .then(res => {
        console.log(res);
        //console.log(res.data);
      })

    }

    function onShowing(e) {
      // console.log('Showing', e, 'Showing')
    }
    async function onEditingStart(e) {
      // console.log('Editing', e.data.id, 'Editing')
    }


    const notesEditorOptions = { height: 100 };

    const pageSizes = [10];
    return (
      <div class="container-9 w-container">
          <h1 class="heading-object">Темы обращений</h1>
              <div class="div-block-22">      
                    <DataGrid
                        dataSource={topics}
                        keyExpr="id"
                        // defaultColumns={columns}
                        showBorders={true}
                        onRowInserting={insertRow}
                        onRowRemoving={removeRow}
                        onRowUpdating={updateRow}
                        onEditingStart={onEditingStart}
                    >
                    <Paging enabled={false} />
                    <FilterRow visible={true} />
                    <HeaderFilter visible={true} />
                    <Editing
                        mode="popup"
                        allowUpdating={true}
                        allowAdding={true}
                        allowDeleting={true}>
                    
                        <Popup title="Темы обращений" showTitle={true} width={700} height={525} onShowing={onShowing}/>      
                        <Form>
                            <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="name" />
                                <Item dataField="qty_day" />
                              </Item>  
                        </Form>    
                    </Editing>    
                        <Column dataField="name" caption="Тема" width={400} />
                        <Column dataField="qty_day" caption="Кол-во дней" width={200} />
                        
                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={10} />
                    </DataGrid>    
             </div> 
           </div> 

  )
}  

export default topicGrid;