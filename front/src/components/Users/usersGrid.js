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
    HeaderFilter,
    TextBox,
    Validator,
    RequiredRule
  } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';  
import 'devextreme-react/text-area';  
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
// import FileUploader from 'devextreme-react/file-uploader';

const usersGrid = () => {  

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const idOblects = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [users, setUsers] = useState([]);
// eslint-disable-next-line react-hooks/rules-of-hooks    
     const [image_1, setImage_1] = useState('')
// eslint-disable-next-line react-hooks/rules-of-hooks    
     const [image_2, setImage_2] = useState('')
    
     let qqq = '12'

    async function getUsers() {
      await axios.get(`${window.origin}/api/users`)  
          .then(res => {
              setUsers(res.data);
              console.log(res.data)
          });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        getUsers()
      }, []);

    function insertRow(e) {

      axios.post(`${window.origin}/api/users`, 
        { user_login : e.data.user_login===undefined?'':e.data.user_login, 
          name : e.data.name===undefined?'':e.data.name, 
          user_ip: e.data.user_ip===undefined?0:e.data.user_ip, 
          date_in: e.data.date_in===undefined?null:e.data.date_in, 
          date_out: e.data.date_out===undefined?null:e.data.date_out,         
          post: e.data.post===undefined?'':e.data.post,     
          user_password: e.data.user_password===undefined?'':e.data.user_password,         
        })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
      
    function removeRow(e) {
      console.log(e.key) // поле id
      const iddata = e.key
      axios.delete(`${window.origin}/api/users/${iddata}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    function updateRow(e) {
      const iddata = e.key
      // console.log(blobImage)
      axios.put(`${window.origin}/api/users/${iddata}`, 
        { user_login : e.newData.user_login===undefined?e.oldData.user_login:e.newData.user_login, 
          name : e.newData.name===undefined?e.oldData.name:e.newData.name, 
          user_ip: e.newData.user_ip===undefined?e.oldData.user_ip:e.newData.user_ip, 
          date_in: e.newData.date_in===undefined?e.oldData.date_in:e.newData.date_in, 
          date_out: e.newData.date_out===undefined?e.oldData.date_out:e.newData.date_out,         
          post: e.newData.post===undefined?e.oldData.post:e.newData.post,         
          // user_password: e.newData.user_password===undefined?e.oldData.user_password:e.newData.user_password,         
      })
      .then(res => {
        console.log(res);
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
      console.log('bb', file2)
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
      reader.onloadend = () =>  console.log('ЭТО BASE64 -> ',reader.result)
      
      const urlsrc =  URL.createObjectURL(file)
    //   setImage(urlsrc)
      // setpathPicture(urlsrc)
    //   setblobImage(file)
      console.log('url', urlsrc)




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
      const fileName = e.file.name
    //   setpathPicture(fileName)
      // axios.post(`${window.origin}/api/newss/saveupload`, 
      //    { fileName : fileName, 
      //    })
      //  .then(res => {
      //    console.log(res);
      // })      
    }
    function onRowUpdated(e) {
      console.log('edit', e, 'edit')
    }
    function onShowing(e) {
      // console.log('Showing', e, 'Showing')
    }
    async function onEditingStart(e) {
      // console.log('Editing', e.data.id, 'Editing')
      // setImage_2("/"+e.data.logo_2)
      // setImage_1(e.data.logo_1)
    }

    async function setPassword(e) {
      console.log(e)
      // setImage_2("/"+e.data.logo_2)
      // setImage_1(e.data.logo_1)
    }

    function TextBoxOptions() {
      return {mode: "password"}
    }

    const notesEditorOptions = { height: 100 };

    const pageSizes = [10];
    return (
        <React.Fragment>
          <h2 className={'content-block'}>Сотрудники</h2>
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
                    
                        <Popup title="Сотрудники" showTitle={true} width={700} height={700} onShowing={onShowing}/>      
                        <Form>
                            <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="user_login" />
                                <Item dataField="name" />
                                <Item dataField="post" />
                                <Item dataField="date_in" />
                                <Item dataField="date_out" />
                                <Item dataField="user_password"  editorType="dxTextBox" editorOptions={TextBoxOptions()} />
                              </Item>  
                        </Form>    
                    </Editing>    
                        <Column dataField="user_login" />
                        <Column dataField="name" caption="ФИО" />
                        <Column dataField="post" caption="Должность" />
                        <Column dataField="date_in" caption="Прием" dataType="date" format="dd.MM.yyyy" />
                        <Column dataField="date_out" caption="Увольнение" dataType="date" format="dd.MM.yyyy" />
                        <Column dataField="user_password" caption='Пароль' mode="password" visible={false} />

                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                        <Paging defaultPageSize={10} />
                    </DataGrid>    
           </React.Fragment> 

  )
}  

export default usersGrid;