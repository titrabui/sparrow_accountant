import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Select, Spin } from 'antd';
import { fetchProviders } from '@/resolvers/provider';

const FormItem = Form.Item;
const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const CreateForm = (props) => {
  const [selectProviders, setSelectProviders] = useState({ data: [], fetching: false });
  const [form] = Form.useForm();
  const { onSubmit: handleCreate, onCancel: handleCreateModalVisible, createModalVisible } = props;

  const fetchSelectProviders = async (name) => {
    setSelectProviders({ data: [], fetching: true });
    const providers = await fetchProviders({ name }, {}, {});
    setSelectProviders({ data: providers.data, fetching: false });
  };

  useEffect(() => {
    fetchSelectProviders(null);
  }, []);

  const handleSave = async () => {
    const fieldsValue = await form.validateFields();
    handleCreate(fieldsValue);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="goodId"
          label="Mã hàng hóa"
          rules={[
            {
              required: true,
              message: 'Làm ơn nhập Mã hàng hóa',
            },
          ]}
        >
          <Input placeholder="Mã hàng hóa" />
        </FormItem>
        <FormItem
          name="name"
          label="Tên"
          rules={[
            {
              required: true,
              message: 'Làm ơn nhập Tên',
            },
            {
              min: 5,
              message: 'Tên phải nhập ít nhất 5 ký tự',
            },
          ]}
        >
          <Input placeholder="Tên hàng hóa" />
        </FormItem>
        <FormItem
          name="specification"
          label="Quy cách"
          rules={[
            {
              required: true,
              message: 'Làm ơn nhập Quy cách',
            },
          ]}
        >
          <Input placeholder="Quy cách" />
        </FormItem>
        <FormItem
          name="unit"
          label="Đơn vị"
          rules={[
            {
              required: true,
              message: 'Làm ơn nhập Đơn vị',
            },
          ]}
        >
          <Input placeholder="Đơn vị" />
        </FormItem>
        <FormItem name="providerId" label="Nhà cung cấp">
          <Select
            showSearch
            placeholder="Chọn nhà cung cấp"
            onSearch={fetchSelectProviders}
            notFoundContent={selectProviders.fetching ? <Spin size="small" /> : null}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {selectProviders.data.map((d) => (
              <Option key={d.id} value={d.id}>
                {d.name}
              </Option>
            ))}
          </Select>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleCreateModalVisible()}>Hủy</Button>
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
      title="Thêm mới hàng hóa"
      visible={createModalVisible}
      footer={renderFooter()}
      onCancel={() => handleCreateModalVisible()}
    >
      <Form {...formLayout} form={form}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
