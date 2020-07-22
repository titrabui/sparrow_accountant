import { Input, Form } from 'antd';
import React from 'react';
import ItemMap from './map';

const FormItem = Form.Item;

const getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }) => {
  const options = {
    rules: rules || customProps.rules,
  };

  if (onChange) {
    options.onChange = onChange;
  }

  if (defaultValue) {
    options.initialValue = defaultValue;
  }

  return options;
};

const LoginItem = (props) => {
  const { onChange, customProps, defaultValue, rules, name, type, ...restProps } = props;

  if (!name) {
    return null;
  } // get getFieldDecorator props

  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

const LoginItems = {};
Object.keys(ItemMap).forEach((key) => {
  const item = ItemMap[key];

  LoginItems[key] = (props) => (
    <LoginItem customProps={item.props} rules={item.rules} {...props} type={key} />
  );
});
export default LoginItems;
