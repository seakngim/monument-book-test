import { Button, Popconfirm, Space, Table, message } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SupplierSlice, { setallAllSupplier } from '../../redux/slices/SupplierSlice';
import SupplierService from '../../redux/service/SupplierService';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function SupplierListComponent() {
    const dispatch = useDispatch();
    const rdata =useSelector((state)=> state.supplier.allSupplier )
// handle get supplier
    const handlegetAllSupplier= () => {
        SupplierService.getAllSupplier().then((res) => {
          dispatch(setallAllSupplier(res.data));
        });
      };

    const dataSource = rdata.map((item) => ({
        key: item.id,
        name: item.name,
        phone: item.phone,
        email: item.email,
        address: item.address,
        date: item.date,
      }));
    
    const handleDelete = (record) => {
        try {
          SupplierService.deleteSupplier(record.key).then(() => {
            message.success("delete successful!");
            handlegetAllSupplier();
          });
        } catch (error) {
          console.error("Error deleting entry:", error);
        }
      };

    const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Phone",
          dataIndex: "phone",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Address",
          dataIndex: "address",
        },
        {
          title: "DATE",
          dataIndex: "date",
        },
        {
          title: "Action",
          dataIndex: "date",
          render: (_, record) => (
            <Space size="middle">
              {dataSource.length >= 1 ? (
                <a onClick={() => handleEdit(record)}>
                  <EditOutlined />
                </a>
              ) : null}
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record)}
              >
                <a>
                  <DeleteOutlined />
                </a>
              </Popconfirm>
            </Space>
          ),
        },
      ];
    
      useEffect(() => {
        handlegetAllSupplier();
      }, []);
    return (
        <>
      <div className="shadow-lg ">
        <div className="grid grid-cols-2 px-10">
          <p className="text-2xl">LIST ALL Supplier</p>
          <div className="flex justify-end">
            <Link to={"/dashboard/add-supplier"}><Button className="w-fit"  >Add New Supplier</Button></Link>
          </div>
        </div>
        <div className="">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </>
    );
}

export default SupplierListComponent;