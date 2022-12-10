import defaultUser from '../utils/default-user';
import axios from 'axios';
import { EmailRule } from 'devextreme-react/data-grid';

export async function signIn(email, password) {
  try {
    // Send request
    console.log(email, password);
    axios.post(`${window.origin}/api/users/findPassword`,
      { user_login : email,
        password : password
      }
    )
      .then(res => {
        const email = res.data;
        console.log(email)
  //       window.localStorage.setItem('log1', '2')
  //       if (email.length > 0) {
  //         this.setState({
  // //          p: email[0].p,
  //           name: email[0].name,
  //           role: email[0].role
  //         })
  //         window.localStorage.setItem('log3', '3')
  //         window.localStorage.setItem('in_fio', this.state.name)
  //         window.localStorage.setItem('in_role', this.state.role)
  //         // console.log(this.state.role)
  //       } else
  //       {
  //         window.localStorage.setItem('log4', '4')
  //         this.setState({
  //           //          p: email[0].p,
  //                     name: '',
  //                     role: ''
  //        })
  //         window.localStorage.setItem('in_fio', '')
  //         window.localStorage.setItem('in_role', '')

  //       }
      })

    return {
      isOk: true,
      data: defaultUser
    };
  }
  catch {
    return {
      isOk: false,
      message: "Authentication failed"
    };
  }
}

export async function getUser() {
  try {
    // Send request


    return {
      isOk: true,
      data: defaultUser
    };
  }
  catch {
    return {
      isOk: false
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
