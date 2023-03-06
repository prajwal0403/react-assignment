import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

function Home() {
  const [edituserModal, setEdituserModal] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  const onfinish = async (values) => {
    try {
      if (selectedItemForEdit) {
        await axios.post('/api/form/edit', {
          payload: { ...values },
          userId: selectedItemForEdit._id,
        });
        getUsers();
        message.success('User Updated successfully');
      } else {
        await axios.post('/api/form/add', values);
        getUsers();
        message.success('User added successfully');
      }
      setEdituserModal(false);
      setSelectedItemForEdit(null);
    } catch (err) {
      message.error('something went wrong');
    }
  };

  const deleteUser = async (record) => {
    try {
      await axios.post('/api/form/delete', {
        userId: record._id,
      });
      getUsers();
      message.success('User Deleted successfully');
    } catch (err) {
      message.error('something went wrong');
    }
  };

  const getUsers = async (req, res) => {
    try {
      const response = await axios.get('/api/form');
      setUsersData(response.data);
    } catch (err) {
      message.error('something went wrong');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'fname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lname',
    },
    {
      title: 'Email Id',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'no',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <div className="d-flex">
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setEdituserModal(true);
              }}
            />
            <DeleteOutlined
              className="mx-3"
              onClick={() => deleteUser(record)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className='userDetails'>
      <Button type="primary" onClick={() => setEdituserModal(true)}>
        Click to Add the User Details
      </Button>
      <div>
        <Modal
          title={
            selectedItemForEdit
              ? 'Update the Details'
              : 'Enter the User Details'
          }
          open={edituserModal}
          onCancel={() => {
            setSelectedItemForEdit(null);
            setEdituserModal(false);
          }}
          footer={false}
          className="text-center"
        >
          <Form
            className="pt-3 pl-3 pr-3"
            onFinish={onfinish}
            initialValues={selectedItemForEdit}
          >
            <Form.Item label="First Name" name="firstName">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input type="number" />
            </Form.Item>
            <div className="d-flex justify-content-center">
              <button className="primary">Save The Details</button>
            </div>
          </Form>
        </Modal>
      </div>
      <div>
        <div className="table">
          <Table columns={columns} dataSource={usersData} rowKey={nanoid()} />
        </div>
      </div>
    </div>
  );
}

export default Home;
