// import React, { Component } from 'react';
// export default class Login extends Component {
//   handleSubmit(e) {
//     e.preventDefault()
//     const value = e.target.elements[0].value;
//     window.localStorage.setItem('rr_login', value);
//   }
//   render() {
//     return (
//       <div className="row">
//         <div className="col-md-12">
//           Пожалуйста, введите логин:
//         </div>
//         <form
//           className="col-md-4"
//           onSubmit={this.handleSubmit}
//         >
//           <input type="text" placeholder="login" />
//           <button type="submit">Войти</button>
//         </form>
//       </div>
//     )
//   }
// }
// import React from 'react';
// import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
// import { Face, Fingerprint } from '@material-ui/icons'
// const styles = theme => ({
//     margin: {
//         margin: theme.spacing.unit * 2,
//     },
//     padding: {
//         padding: theme.spacing.unit
//     }
// });

// class LoginTab extends React.Component {
//     render() {
//         const { classes } = this.props;
//         return (
//             <Paper className={classes.padding}>
//                 <div className={classes.margin}>
//                     <Grid container spacing={8} alignItems="flex-end">
//                         <Grid item>
//                             <Face />
//                         </Grid>
//                         <Grid item md={true} sm={true} xs={true}>
//                             <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
//                         </Grid>
//                     </Grid>
//                     <Grid container spacing={8} alignItems="flex-end">
//                         <Grid item>
//                             <Fingerprint />
//                         </Grid>
//                         <Grid item md={true} sm={true} xs={true}>
//                             <TextField id="username" label="Password" type="password" fullWidth required />
//                         </Grid>
//                     </Grid>
//                     <Grid container alignItems="center" justify="space-between">
//                         <Grid item>
//                             <FormControlLabel control={
//                                 <Checkbox
//                                     color="primary"
//                                 />
//                             } label="Remember me" />
//                         </Grid>
//                         <Grid item>
//                             <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
//                         </Grid>
//                     </Grid>
//                     <Grid container justify="center" style={{ marginTop: '10px' }}>
//                         <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
//                     </Grid>
//                 </div>
//             </Paper>
//         );
//     }
// }

// export default withStyles(styles)(LoginTab);

import React from 'react';
import Login from './loginform.js';
import axios from 'axios';

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

class WelcomePage extends React.Component {
  state ={
    email: '',
    password: '',
    name: '',
    role: '',
    p: ''
  }
  onEmailChange = (e) =>{
    this.setState({
        email: e.target.value
    })
  }  
  onPasswordChahge = (e) =>{
    this.setState({
      password: e.target.value
    })
  }

  

  onSigninSubmit = (e)=> {
    e.preventDefault();
    //console.log('email: ' + this.state.email + ', password: ' + this.state.password);
    window.localStorage.setItem('in_fio', '')
    window.localStorage.setItem('in_role', '')
    window.localStorage.setItem('log', '1')
    axios.get(`api/users/email?email=`+this.state.email)
      .then(res => {
        const email = res.data;
        window.localStorage.setItem('log1', '2')
        if (email.length > 0) {
          this.setState({
  //          p: email[0].p,
            name: email[0].name,
            role: email[0].role
          })
          window.localStorage.setItem('log3', '3')
          window.localStorage.setItem('in_fio', this.state.name)
          window.localStorage.setItem('in_role', this.state.role)
          console.log(this.state.role)
        } else
        {
          window.localStorage.setItem('log4', '4')
          this.setState({
            //          p: email[0].p,
                      name: '',
                      role: ''
         })
          window.localStorage.setItem('in_fio', '')
          window.localStorage.setItem('in_role', '')

        }
      })
    window.localStorage.setItem('in_login', this.state.email)
//    window.localStorage.setItem('in_password', this.state.password)
    window.location.assign('/');
  }
  render() {
    return(
      <Login 
        onSigninSubmit={this.onSigninSubmit} 
        onEmailChange={this.onEmailChange}
        email={this.state.email}
        password={this.state.password}
        onPasswordChahge={this.onPasswordChahge}
      />
    )
  }
}

export default WelcomePage;