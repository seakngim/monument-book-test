import React, { useEffect, useState } from 'react';

import { LoadingOutlined, PlusOutlined, CloseOutlined, FolderAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Button,Col, Divider,Popconfirm, Form, Input, Row, Space, Upload, message, Table, Tag } from "antd";
import CategoryService from "../../redux/service/CategoryService";
import { setAllCategory } from "../../redux/slices/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
const CategoryCpmponentList = () => {
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const categories = useSelector((state) => state.category.allCategory);
    const dispatch = useDispatch();
    // Fetch all categories
    const handleGetCategory = () => {
        CategoryService.getAllCategory().then((res) => {
            dispatch(setAllCategory(res.data));
        });
    };
    // Function to handle delete button click
    const handleDelete = (record) => {
        try {
            CategoryService.delCategory(record.id).then((res) => {
                console.log(res);
                handleGetCategory();
            })
        } catch (error) {
            console.error("Error deleting entry:", error);
            // Handle error as needed (e.g., show a message to the user)
        }
    };
    const handleEdit = (record) => {
        setFormValues(record);
        settitleform("Edit Item");
        setImageUrl(record.image)
        setRequired(false)
    };
    // Table columns definition
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: (text) => <a>{text}</a>,
            width: '7%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: '20%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}><EditOutlined /> </a>
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
    // Data for the table
    const data = categories && categories.map((item, index) => ({
        id: item.id, // Assuming you want the id as the key
        no: index + 1,
        name: item.name,
        description: item.description,
        date: item.date, // You can set this value accordingly
        image: item.coverImage
    }));
    console.log(categories, "dkjvbvds");
    useEffect(() => {
        handleGetCategory();
    }, [])
    useEffect(() => {
        handleGetCategory();
    }, [currentPageSize])
    return (
        <div>
            <Table
                className="shadow-lg mt-10"
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 10,
                }}
                scroll={{
                    y: 240,
                }}
            />
        </div>
    );
}

export default CategoryCpmponentList;
