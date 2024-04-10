import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Form, Input, Row, Space, Upload, message, Table, Tag } from "antd";
import { LoadingOutlined, PlusOutlined, CloseOutlined, FolderAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import CategoryService from "../../redux/service/CategoryService";
import { useDispatch, useSelector } from "react-redux";

import { setAllAuthor } from "../../redux/slices/AuthorSlice";
import AuthorServises from "../../redux/service/AuthorService";
import UploadService from "../../redux/service/UploadService";

const CategoriesComponent = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm(); // Create a form instance

    const [titleform, settitleform] = useState("Create New Category");
    const [required, setRequired] = useState(true);
    const [imageUrl, setImageUrl] = useState();

    // res data
    const resauthor = useSelector((state) => state.author.allAuthors);

    // Form data state
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        coverImage: ''
    });
    console.log(formData)
    // Function to set form values for editing
    const setFormValues = (record) => {
        setFormData({
            id: record.id,
            name: record.name,
            description: record.description,
            coverImage: record.image // Make sure to include the image field here if needed
        });
        console.log("record", record);
    };

    // Fetch categories and authors on component mount


   

    // Function to handle form submission
    const onFinish = (values) => {
        const data = {
            name: values.name,
            description: values.description,
            coverImage: imageUrl, // Set coverImage to the latest imageUrl
        };
        console.log(data);

        // // Check if it's an edit or add operation
      
        //     // Edit operation
        //     CategoryService.edit(formData.id, formData).then((res) => {
        //         console.log(res, "res");
        //         message.success("Category updated successfully");
        //         form.resetFields(); // Reset form fields
        //         setImageUrl(""); // Clear image URL
        //         setFormData({
        //             id: '',
        //             name: '',
        //             description: '',
        //             coverImage: ''
        //         }); // Reset form data state
        //         handleGetCategory();
        //         settitleform("Create Item"); // Change title form back to default
        //     }).catch((error) => {
        //         message.error("Failed to update category");
        //     });
        // } else {
            // Add operation
            CategoryService.addCategory(data).then((res) => {
                console.log(res, "res");
                message.success("Category added successfully");
                form.resetFields(); // Reset form fields
                setImageUrl(""); // Clear image URL
                setFormData({
                    id: '',
                    name: '',
                    description: '',
                    coverImage: ''
                }); // Reset form data state
                handleGetCategory();
                settitleform("Create Item"); // Change title form back to default
            }).catch((error) => {
                message.error("Failed to add category");
            });
        }
    // };

    // Function to handle edit button click
 

   
    // State and function for image upload
    const [loading, setLoading] = useState(false);

    const handleChange = async (info) => {
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const uploadButton = (
        <button className="w-40 h-40  border-dashed border-2 rounded-md" type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    function CustomDescription({ description }) {
        const style = {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            textOverflow: 'ellipsis',
            maxHeight: '3em',
            whiteSpace: 'pre-line'
        };

        return (
            <div style={style}>
                {description}
            </div>
        );
    }


   


    return (
        <>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                // initialValues={formData}
                className="shadow-lg rounded-lg p-5 pt-2 pb-10"
            >
                <Divider orientation="left">{titleform}</Divider>
                <div className="grid lg:grid-cols-4 h-[75vh] gap-8">
                    <div className="flex items-start justify-center">
                        <Upload
                            className="w-52"
                            customRequest={async ({ file, onSuccess, onError }) => {
                                try {
                                    const imageUrl = await UploadService.upload(file);
                                    onSuccess();
                                    console.log("Image URL:", imageUrl);
                                    setImageUrl(imageUrl.body.data);
                                    setFormData({ ...formData, coverImage: imageUrl.body.data });
                                } catch (error) {
                                    onError(error);
                                }
                            }}
                            onChange={handleChange}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="bookCover"
                                className="w-52 rounded-md"
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </div>

                    <div>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true }]}
                        >
                            <TextArea
                                showCount
                                maxLength={2000}
                            
                            />
                        </Form.Item>

                        <Space className="mt-5">
                            <Button size="large" icon={<CloseOutlined />} block danger onClick={() => navigate("/dashboard", { state: { previousPath: pathname } })}>Cancel</Button>
                            <Button size="large" icon={<FolderAddOutlined />} block style={{ border: 0, backgroundColor: "#3A53A4", color: "#fff" }} htmlType="submit">Save</Button>
                        </Space>
                    </div>
                </div>
            </Form>
            
        </>
    );
}

export default CategoriesComponent;
