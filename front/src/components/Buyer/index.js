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
import React from 'react';
import FileUploader from 'devextreme-react/file-uploader';
// import { createStore } from 'devextreme-aspnet-data-nojquery';
import newsDefaultJpg from "../../static/images/2456034.jpg";



const buyerDataGrid = () => {  

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const idTips = useParams();
    //   window.alert(newstop4.find(e => e.id = (idNews?idNews.id:'1') ).news_text)
      // console.log(id.id, `${window.origin}/api/objects/${id?id.id:'1'}`,window)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [buyer, setBuyer] = useState([]);
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect( () => {
    //     if (idNews.id>0 && idNews.id<=newstop4.length) {
    //         setNews(newstop4.find(e => e.id === (idNews?idNews.id:'1') ))
    //         console.log(newstop4.find((e) => e.id === (idNews?idNews.id:'1') ))
    //     } else
    //     {setNews(newstop4.find(e => e.id === ('1') ))}    
    // }, []);

    async function getBuyer() {
      await axios.get(`${window.origin}/api/buyer`)  
          .then(res => {
              setBuyer(res.data);
              console.log(res.data)
          });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        getBuyer()
      }, []);

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
            <h2 className={'content-block'}>Покупатели</h2>
                    <DataGrid
                        dataSource={buyer}
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
                        <Column dataField="qty" caption="Кол-во" />
                        <Column dataField="comment" caption="Комментарий" />
                        <Column dataField="createdAt" caption="Дата время" dataType="datetime" format="dd.MM.yyyy HH:mm:ss" />
                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={15} />
                    </DataGrid>    
        </React.Fragment>
  )
}  

export default buyerDataGrid;