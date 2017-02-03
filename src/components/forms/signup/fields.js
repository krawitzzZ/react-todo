import React from 'react';
import TextField from 'material-ui/TextField';

export default (fields) => (
  <div>
    <TextField
      {...fields.first_name.input}
      floatingLabelText="First Name"
      className="input"
    />
    <br/>
    <TextField
      {...fields.last_name.input}
      floatingLabelText="Last Name"
      className="input"
    />
    <br/>
    <TextField
      {...fields.email.input}
      floatingLabelText="Email"
      type="email"
      className="input"
      errorText={fields.email.meta.touched && fields.email.meta.error}
    />
    <br/>
    <TextField
      {...fields.username.input}
      floatingLabelText="Username"
      className="input"
      errorText={fields.username.meta.touched && fields.username.meta.error}
    />
    <br/>
    <TextField
      {...fields.password.input}
      floatingLabelText="Password"
      type="password"
      className="input"
      errorText={fields.password.meta.touched && fields.password.meta.error}
    />
    <br/>
    <TextField
      {...fields.repeatPassword.input}
      floatingLabelText="Repeat Password"
      type="password"
      className="input"
      errorText={fields.repeatPassword.meta.touched && fields.repeatPassword.meta.error}
    />
  </div>
);
