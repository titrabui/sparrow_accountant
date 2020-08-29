import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { fetchGoods, createGood, updateGood, deleteGood } from '@/resolvers/good';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('Đang xử lý');

  try {
    await createGood({ ...fields });
    hide();
    message.success('Thêm thành công');
    return true;
  } catch (error) {
    hide();
    message.error('Thêm thất bại');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('Đang xử lý');

  try {
    await updateGood({
      id: fields.id,
      goodId: fields.goodId,
      name: fields.name,
      specification: fields.specification,
      unit: fields.unit,
      providerId: fields.providerId,
    });
    hide();
    message.success('Chỉnh sửa thành công');
    return true;
  } catch (error) {
    hide();
    message.error('Chỉnh sửa thất bại');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('Đang xử lý');
  if (!selectedRows) return true;

  try {
    await deleteGood({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Xóa thành công');
    return true;
  } catch (error) {
    hide();
    message.error('Xóa thất bại');
    return false;
  }
};

const GoodList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const columns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: 'goodId',
      sorter: true,
      rules: [
        {
          required: true,
          message: 'Làm ơn nhập Mã hàng hóa',
        },
      ],
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: true,
      rules: [
        {
          required: true,
          message: 'Làm ơn nhập Tên',
        },
        {
          min: 5,
          message: 'Tên phải nhập ít nhất 5 ký tự',
        },
      ],
    },
    {
      title: 'Quy cách',
      dataIndex: 'specification',
      rules: [
        {
          min: 10,
          message: 'Quy cách phải nhập ít nhất 1 ký tự',
        },
      ],
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      rules: [
        {
          min: 5,
          message: 'Đơn vị phải nhập ít nhất 1 ký tự',
        },
      ],
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'provider',
      rules: [
        {
          min: 5,
          message: 'Đơn vị phải nhập ít nhất 1 ký tự',
        },
      ],
      renderText: (val) => val && val.name,
    },
    {
      title: 'Tác vụ',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setUpdateFormValues(record);
            }}
          >
            Chỉnh sửa
          </a>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> Thêm hàng hóa
          </Button>,
        ]}
        request={(params, sorter, filter) => fetchGoods(params, sorter, filter)}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar>
          <Button
            danger
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest();
            }}
          >
            Xóa các mục đã chọn
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        createModalVisible={createModalVisible}
      />
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setUpdateFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={updateFormValues}
        />
      ) : null}
    </PageContainer>
  );
};

export default GoodList;
