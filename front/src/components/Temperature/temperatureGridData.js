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



const temperatureDataGrid = () => {  

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const idTips = useParams();
    //   window.alert(newstop4.find(e => e.id = (idNews?idNews.id:'1') ).news_text)
      // console.log(id.id, `${window.origin}/api/objects/${id?id.id:'1'}`,window)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [temperature, setTemperature] = useState([]);
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect( () => {
    //     if (idNews.id>0 && idNews.id<=newstop4.length) {
    //         setNews(newstop4.find(e => e.id === (idNews?idNews.id:'1') ))
    //         console.log(newstop4.find((e) => e.id === (idNews?idNews.id:'1') ))
    //     } else
    //     {setNews(newstop4.find(e => e.id === ('1') ))}    
    // }, []);

    async function getTemperature() {
      await axios.get(`${window.origin}/api/temperature`)  
          .then(res => {
              setTemperature(res.data);
              console.log(res.data)
          });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        getTemperature()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/temperature`, 
        { id_station : e.data.id_station===undefined?'':e.data.id_station, 
          comment : e.data.comment === undefined?'':e.data.comment, 
          temparature : e.data.temparature === undefined?'':e.data.temparature, 
        })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
      
    function removeRow(e) {
      console.log(e.key) // поле id
      const iddata = e.key
      axios.delete(`${window.origin}/api/temperature/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      axios.put(`${window.origin}/api/sales/${iddata}`, 
        { id_station : e.newData.id_station===undefined?e.oldData.id_station:e.newData.id_station, 
          comment : e.newData.comment === undefined?e.oldData.comment:e.newData.comment, 
          temparature : e.newData.temparature === undefined?e.oldData.temparature:e.newData.temparature, 
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
            <h2 className={'content-block'}>Температура</h2>
                    <DataGrid
                        dataSource={temperature}
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
                        <Column dataField="id_station" caption="Станция" />
                        <Column dataField="temparature" caption="Температура" />
                        <Column dataField="createdAt" caption="Дата время" dataType="datetime" format="dd.MM.yyyy HH:mm:ss" />

                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={15} />
                    </DataGrid>    
        </React.Fragment>
  )
}  

export default temperatureDataGrid;