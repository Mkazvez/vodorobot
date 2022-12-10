// import '../css/webflow.css'
// import '../css/normalize.css'
// import '../css/life-group.webflow.css'
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



const trafficDataGrid = () => {  

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const idNews = useParams();
    //   window.alert(newstop4.find(e => e.id = (idNews?idNews.id:'1') ).news_text)
      // console.log(id.id, `${window.origin}/api/objects/${id?id.id:'1'}`,window)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [traffic, setTraffic] = useState([]);
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect( () => {
    //     if (idNews.id>0 && idNews.id<=newstop4.length) {
    //         setNews(newstop4.find(e => e.id === (idNews?idNews.id:'1') ))
    //         console.log(newstop4.find((e) => e.id === (idNews?idNews.id:'1') ))
    //     } else
    //     {setNews(newstop4.find(e => e.id === ('1') ))}    
    // }, []);

    async function getTraffic() {
      await axios.get(`${window.origin}/api/traffic`)  
          .then(res => {
              setTraffic(res.data);
              console.log(res.data)
          });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        getTraffic()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/newss`, 
        { id_text : e.data.id_text===undefined?'':e.data.id_text, 
          valve : e.data.valve===undefined?'':e.data.valve, 
          s_date : e.data.s_date===undefined?'':e.data.s_date, 
        })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
      
    function removeRow(e) {
      console.log(e.key) // поле id
      const iddata = e.key
      axios.delete(`${window.origin}/api/status/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      axios.put(`${window.origin}/api/newss/${iddata}`, 
        { id_text : e.newData.id_text===undefined?e.oldData.id_text:e.newData.id_text, 
          valve : e.newData.valve===undefined?e.oldData.valve:e.newData.valve, 
          s_date : e.newData.s_date===undefined?e.oldData.s_date:e.newData.s_date, 
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
              <h2 className={'content-block'}>Трафик</h2>
                    <DataGrid
                        className={'dx-card wide-card'}
                        dataSource={traffic}
                        showBorders={false}
                        focusedRowEnabled={true}
                        defaultFocusedRowIndex={0}
                        columnAutoWidth={true}
                        columnHidingEnabled={true}
                    >
                    <Paging defaultPageSize={15}/>
                    <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                    <FilterRow visible={true} />

                    {/* <HeaderFilter visible={true} /> */}
                        <Column dataField="id" caption="ИД" width={60} visible={false}/>
                        <Column dataField="id_text" caption="Станция" />
                        <Column dataField="traffic" caption="Трафик" />
                        <Column dataField="d_date" caption="Дата время" dataType="datetime" format="dd.MM.yyyy HH:mm:ss"/>
                    </DataGrid>    
            </React.Fragment>
  )
}  

export default trafficDataGrid;