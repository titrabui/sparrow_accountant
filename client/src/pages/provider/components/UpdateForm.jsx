import React, { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const UpdateForm = (props) => {
  const [formVals, setFormVals] = useState({
    id: props.values.id,
    name: props.values.name,
    phone: props.values.phone,
    address: props.values.address,
  });
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleSave = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="Tên"
          rules={[
            {
              required: true,
              message: 'Làm ơn nhập Tên!',
            },
          ]}
        >
          <Input placeholder="Tên nhà cung cấp" />
        </FormItem>
        <FormItem name="phone" label="Điện thoại">
          <Input placeholder="Số điện thoại" />
        </FormItem>
        <FormItem name="address" label="Địa chỉ">
          <TextArea rows={4} placeholder="Địa chỉ" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>Hủy</Button>
        <Button type="primary" onClick={() => handleSave()}>
          Lưu
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="Chỉnh sửa nhà cung cấp"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          phone: formVals.phone,
          address: formVals.address,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
