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
// import 'devextreme-react/text-area';  
// import 'devextreme/dist/css/dx.common.css';
// import 'devextreme/dist/css/dx.light.css';
import React from 'react';



const statusDataGrid = () => {  

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const idNews = useParams();
    //   window.alert(newstop4.find(e => e.id = (idNews?idNews.id:'1') ).news_text)
      // console.log(id.id, `${window.origin}/api/objects/${id?id.id:'1'}`,window)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState([]);
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect( () => {
    //     if (idNews.id>0 && idNews.id<=newstop4.length) {
    //         setNews(newstop4.find(e => e.id === (idNews?idNews.id:'1') ))
    //         console.log(newstop4.find((e) => e.id === (idNews?idNews.id:'1') ))
    //     } else
    //     {setNews(newstop4.find(e => e.id === ('1') ))}    
    // }, []);

    async function getStatus() {
      await axios.get(`${window.origin}/api/status`)  
          .then(res => {
              setStatus(res.data);
              console.log(res.data)
          });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        getStatus()
      }, []);

    const pageSizes = [15];

    return (
      <React.Fragment>
            <h2 className={'content-block'}>Статусы</h2>

                    <DataGrid 
                        className={'dx-card wide-card'}
                        dataSource={status}
                        keyExpr="id"
                        showBorders={true}
                        focusedRowEnabled={true}
                        defaultFocusedRowIndex={0}
                        columnAutoWidth={true}
                        columnHidingEnabled={true}
                    >
                    <Paging enabled={false} />
                    <FilterRow visible={true} />
                    <HeaderFilter visible={true} />
                        <Column dataField="id" caption="ИД" width={60} visible={false}/>
                        <Column dataField="id_text" caption="Станция" />
                        <Column dataField="valve" caption="Сообщение" />
                        {/* <Column dataField="s_date" caption="Дата время c" width={300} /> */}
                        <Column dataField="d_date" caption="Дата время"  dataType="datetime" format="dd.MM.yyyy HH:mm:ss" />

                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={15} />
                    </DataGrid>                        
      </React.Fragment>                
  )
}  

export default statusDataGrid;