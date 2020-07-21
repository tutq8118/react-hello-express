import React from 'react';
import { Alert } from 'antd';

function LoginForm(props) {
  const {formLogin} = props;  
  return (
    <div className="row">
      {formLogin.errors && (
        <div className="col-12 mb-3">
          {formLogin.errors.map((error, index) => (
          <Alert message={error} key={index} type="error" />
          ))}
        </div>
      )}
      <div className="col-sm-6">
        <h2 className="mb-3">Login</h2>
        <p className="mb-3">If you've already had an account, just login</p>
        <form className="mb-5" onSubmit={props.action}>
          <div className="form-group">
            <label>Email* </label>
            <input className="form-control" type="text" name="email" required="required" />
          </div>
          <div className="form-group">
            <label>Password* </label>
            <input className="form-control" type="password" name="password" required="required" />
          </div>
          <div className="form-group text-right">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
      <div className="col-sm-6">
        <h2 className="mb-3">Register</h2>
        <p className="mb-3">If you don't have any account, create one</p>
        <form method="POST" action="/auth/create">
          <div className="form-group">
            <label>Name </label>
            <input className="form-control" type="text" name="name" />
          </div>
          <div className="form-group">
            <label>Email* </label>
            <input className="form-control" type="text" name="email" required="required" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" title="Must contain '@' and at least 2 letters" />
          </div>
          <div className="form-group">
            <label>Password* </label>
            <input className="form-control" type="password" name="pwd" required="required" autoComplete="new-password" pattern=".{6,}" title="Must contain 6 or more characters" />
          </div>
          <div className="form-group text-right">
            <button className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
