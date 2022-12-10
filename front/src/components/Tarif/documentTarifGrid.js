import '../css/webflow.css'
import '../css/normalize.css'
import '../css/life-group.webflow.css'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
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
    AsyncRule,
    CustomRule,
  } from 'devextreme-react/data-grid';
import { Item, Label } from 'devextreme-react/form';  
import 'devextreme-react/text-area';  
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import FileUploader from 'devextreme-react/file-uploader';



const documentTarifGrid = () => {  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const gridTarif = useRef(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const iddocumentTarifGrid = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [documentTarif, setDocumentTarif] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks                
    const [idhouse, setidHouse] = useState(0)
    // eslint-disable-next-line react-hooks/rules-of-hooks                
    const [idtarif, setidTarif] = useState(0)
    // eslint-disable-next-line react-hooks/rules-of-hooks                
    const [fileName, setfileName] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks                
    const [houses1, setHouse] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks                
    const [rowIndexEdit, setrowIndexEdit] = useState(null);
    
    async function getHouse() {
        await axios.get(`${window.origin}/api/objects`)  
            .then(res => {
                setHouse(res.data);
            });
    }

    async function getDocumentTarif() {
      await axios.get(`${window.origin}/api/documenttarifs`)  
          .then(res => {
              setDocumentTarif(res.data);
            //   console.log(res.data)
          });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        getDocumentTarif()
        getHouse()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/documenttarifs`, 
        { id_house : e.data.id_house===undefined?'':e.data.id_house, 
          name : e.data.name===undefined?'':e.data.name, 
          full_path : e.data.full_path===undefined?'':e.data.full_path,
          sort : e.data.idsort===undefined?'':e.data.idsort
        })
      .then(res => {
        // console.log(res);
        // console.log(res.data);
      })
    }
      
    function removeRow(e) {
      console.log(e.key) // поле id
      const iddata = e.key
      axios.delete(`${window.origin}/api/documenttarifs/${iddata}`)
      .then(res => {
        // console.log(res);
        // console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      axios.put(`${window.origin}/api/documenttarifs/${iddata}`, 
        { id_house : e.newData.id_house===undefined?e.oldData.id_house:e.newData.id_house, 
          name : e.newData.name===undefined?e.oldData.name:e.newData.name, 
          full_path : e.newData.full_path===undefined?e.oldData.full_path:e.newData.full_path, 
          idsort : e.newData.idsort===undefined?e.oldData.idsort:e.newData.idsort

      })
      .then(res => {
        // console.log(res);
        //console.log(res.data);
      })

    }

    function onUpload(e) {

      const file = e.file;
      // const fileReader = new FileReader();
      // fileReader.onload = () => {
      //   setImage(fileReader.resultl)
      //   console.log(file)
      // };
      // fileReader.readAsDataURL(file);

      
      const file2 = JSON.parse(e.request.responseText)
      // console.log('bb', file2)
      // console.log('aa', file.file.data.data)
      // var blob = file.file.data.data;
      // console.log(typeof blob)
      // const fs = require("fs");
      // // fs.writeFile("hello.txt", blob)

      // // // Convert the string to bytes
      // // var bytes = new Uint8Array(data.length / 2);

      // // for (var i = 0; i < data.length; i += 2) {
      // //     bytes[i / 2] = parseInt(data.substr(i, i + 2), /* base = */ 16);
      // // }

      // // // Make a Blob from the bytes
      // // var blob = new Blob([bytes], {type: 'image/bmp'});

      // var urlCreator = window.URL || window.webkitURL;
      // const objUrl = urlCreator.createObjectURL(new Blob(blob, {type: "image/png"}));
      // //window.open(objUrl)

      // // console.log(objUrl) 

      // let img = document.querySelector('img_news');
      // const v = new Blob(blob, {type: "image/png"})
      let reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onloadend = () =>  console.log('ЭТО BASE64 -> ',
      // reader.result
      'q'
      )
      
      const urlsrc =  URL.createObjectURL(file)
      // setImage(urlsrc)
      // setpathPicture(urlsrc)
      // setblobImage(file)
      // console.log('url', urlsrc)




      // var URL = 'data:image/jpg;base64,'+data.data;
      // document.querySelector('#img').src = URL;

      // setImage(objUrl)
      // const chunk = {
      //   segmentSize: e.segmentSize,
      //   bytesLoaded: e.bytesLoaded,
      //   bytesTotal: e.bytesTotal,
      // };
      // this.setState({ chunks: [...this.state.chunks, chunk] });
    }
  
    // function onUploadStarted() {
    //   // this.setState({ chunks: [] });
    // }
  
    // function getValueInKb(value) {
    //   return `${(value / 1024).toFixed(0)}kb`;
    // }

    function onFilesUploaded(e) {
    }

    function onUploadStarted(e) {

      console.log("start", e.file.name, e,'qqq')
      console.log("start2", fileName,'qqq2')
      if ((fileName === null)||(fileName === '')) {
        console.log('null')
        setfileName(e.file.name)            
        gridTarif.current.instance.cellValue(rowIndexEdit, 2, e.file.name);
      }
      
      
       
    //    gridTarif.current.instance.saveEditData();
    //   gridTarif.cellValue(, 2, e.file.name)
    //   setpathPicture(fileName)
      // axios.post(`${window.origin}/api/newss/saveupload`, 
      //    { fileName : fileName, 
      //    })
      //  .then(res => {
      //    console.log(res);
      // })      
    }
    function onRowUpdated(e) {
      //console.log('edit', e, 'edit')
    }
    function onShowing(e) {
      // console.log('Showing', e, 'Showing')
    }
    function onEditingStart(e) {
      console.log('Editing', e.key, 'Editing')
      console.log('Editing1', gridTarif.current.instance.getRowIndexByKey(e.key), 'Editing1')
      setrowIndexEdit(gridTarif.current.instance.getRowIndexByKey(e.key))
      setidHouse( e.data.id_house)
      setidTarif( e.data.id)
      setfileName( e.data.full_path)
    }

    function onRowClick(e) {
        console.log('onRowClick', e.rowIndex, 'onRowClick')
      }
  
    function idValue(e) {
      console.log('c1', e.data.id_house, 'c1')
      setidHouse( e.data.id_house)
      setidTarif( e.data.id)
      return {result: 'Ok'}
    }

    function fileNameValue(e) {
      console.log('c2', e.data.full_path, 'c2')
      setfileName( e.data.full_path)
      return {result: 'Ok'}
    }


    const notesEditorOptions = { height: 100 };

    const pageSizes = [10];

    function HrefCell(cellData) {
      return (
        <div>
          <a href={`/newsInDetal/${cellData.data.id}`}>Подробнее</a>
        </div>  
      );
    }
    return (
      <React.Fragment>
            <h2 className={'content-block'}>Тарифы по МКД</h2>
                    <DataGrid
                        dataSource={documentTarif}
                        keyExpr="id"
                        // defaultColumns={columns}
                        showBorders={true}
                        onRowInserting={insertRow}
                        onRowRemoving={removeRow}
                        onRowUpdating={updateRow}
                        onEditingStart={onEditingStart}
                        onRowClick={onRowClick}
                        ref={gridTarif}
                    >
                    <Paging enabled={false} />
                    <FilterRow visible={true} />
                    <HeaderFilter visible={true} />
                        <Column dataField="id_house" caption="ИД МКД" width={250}>
                          <Lookup dataSource={houses1} displayExpr="adres" valueExpr="id" />
                          < CustomRule validationCallback={idValue}/>
                        </Column>          
                        <Column dataField="name" caption="Название" width={250} />
                        <Column dataField="full_path" caption="Путь до файла" width={300}>
                          < CustomRule validationCallback={fileNameValue}/>
                        </Column>
                        <Column dataField="idsort" caption="Сортировка" width={100}/>
                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={10} />
                    </DataGrid>    
        </React.Fragment>
  )
}  

export default documentTarifGrid;