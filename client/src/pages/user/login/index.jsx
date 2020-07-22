import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect } from 'umi';
import LoginForm from './components/Login';
import styles from './style.less';

const { UserName, Password, Submit } = LoginForm;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: values,
    });
  };

  return (
    <div className={styles.main}>
      <LoginForm onSubmit={handleSubmit}>
        {status === 'error' && !submitting && (
          <LoginMessage content="Tài khoản hoặc mật khẩu không đúng" />
        )}

        <UserName
          name="userName"
          placeholder="Tài khoản"
          rules={[
            {
              required: true,
              message: 'Làm ơn nhập tài khoản!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="Mật khẩu"
          rules={[
            {
              required: true,
              message: 'Làm ơn nhập mật khẩu!',
            },
          ]}
        />
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            Tự động đăng nhập
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            Quên mật khẩu
          </a>
        </div>
        <Submit loading={submitting}>Đăng nhập</Submit>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            Đăng ký
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
