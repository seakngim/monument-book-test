import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, Row, Space, Upload, message, Table, Tag } from "antd";
import { LoadingOutlined, PlusOutlined, CloseOutlined, FolderAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import AuthorServises from "../../redux/service/AuthorService";
import { setAllAuthor } from '../../redux/slices/AuthorSlice';

const AuthorListComponent = () => {
    const dispatch = useDispatch();
    const [currentPageSize, setCurrentPageSize] = useState(10);
     // res data
     const resauthor = useSelector((state) => state.author.allAuthors);
     
    // Fetch all authors
    const handleGetAuthor = () => {
        AuthorServises.getAllAuthor(1, currentPageSize).then((res) => {
            setCurrentPageSize(res.totalElements);
            dispatch(setAllAuthor(res.body.data));
            console.log("auth", res);
        });
    };
        // Function to handle edit button click
        const handleEdit = (record) => {
            // setFormValues(record);
            // settitleform("Edit Item");
            // setImageUrl(record.image)
            // setRequired(false)
        };
    
        // Function to handle delete button click
        const handleDelete = (record) => {
            try {
                // Implement logic to delete the entry with the given id
                // NewsServises.deleteNews(record.id);
                // handleGetAllNews();
            } catch (error) {
                console.error("Error deleting entry:", error);
                // Handle error as needed (e.g., show a message to the user)
            }
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
            width: '15%',
        },
        {
            title: 'Quote',
            dataIndex: 'quote',
            key: 'quote',
            width: '20%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
            // render: (_, record) => <CustomDescription description={record.description} />,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: '15%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}><EditOutlined /></a>
                    <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];
      // Data for the table
      const data = resauthor && resauthor.map((item, index) => ({
        id: item.id, // Assuming you want the id as the key
        no: index + 1,
        name: item.name,
        quote: item.quote,
        description: item.description,
        date: item.date, // You can set this value accordingly
        image: item.image
    }));
    useEffect(() => {
        handleGetAuthor();
    }, [currentPageSize])
    return (
        <div>
            <p className='p-5 text-2xl'>List all Author</p>
             <Table
                className="shadow-lg"
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

export default AuthorListComponent;
