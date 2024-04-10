import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Form, Input, Row, Space, Upload, message, Select } from "antd";
import { LoadingOutlined, PlusOutlined, CloseOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import CategoryService from "../../redux/service/CategoryService";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategory } from "../../redux/slices/CategorySlice";
import { setAllAuthor } from "../../redux/slices/AuthorSlice";
import AuthorServises from "../../redux/service/AuthorService";
import BookService from "../../redux/service/BookService";
import UploadService from "../../redux/service/UploadService";
import LoadingComponent from "../auth/popup/LoadingComponent";

const CreateNewComponent = ({onOpenBook}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [imageUrl, setImageUrl] = useState();
    const [error, setError] = useState(null); // Add state for error handling
    const [formData, setFormData] = useState();
    // Redux state selectors
    const categories = useSelector((state) => state.category.allCategory);
    const resauthor = useSelector((state) => state.author.allAuthors);
    console.log(resauthor);

    // Fetch categories from API
    const handleGetCategory = () => {
        CategoryService.getAllCategory()
            .then((res) => {
                dispatch(setAllCategory(res.data));
            })
            .catch((error) => {
                setError(error); // Handle error if API call fails
            });
    };

    // Fetch authors from API
    const handleGetAuthor = () => {
        AuthorServises.getAllAuthor(1,500)
            .then((res) => {
                dispatch(setAllAuthor(res.body.data));
            })
            .catch((error) => {
                setError(error); // Handle error if API call fails
            });
    };

    const resetForm = () => {
        setFormData({
            isbn: "",
            title: "",
            price: "",
            publisher: "",
            description: "",
            categoryId: "",
            authorId: "",
            publishDate: "",
            coverImg: "",
        });
        setImageUrl("");
    };

    const onFinish = (values) => {
        try {
            const data = {
                isbn: values.isbn,
                title: values.title,
                price: parseFloat(values.price),
                publisher: values.publisher,
                description: values.description,
                categoryId: values.categoryId,
                authorId: values.authorId,
                publishDate: values.publishDate,
                coverImg: imageUrl,
            };
            BookService.addbook(data)
                .then((response) => {
                    message.success("Book added!");
                    resetForm();
                    onOpenBook();
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    message.error("Failed to add book!");
                    setTimeout(() => {
                        setLoading(false);
                        // setIsShowErr(true);
                      }, 2000);
                });
        } catch (error) {
            console.error("Error in onFinish:", error);
        }
    };

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

    useEffect(() => {
        handleGetCategory();
        handleGetAuthor();
    }, []);

    return (
        <>
          {loading && <LoadingComponent />}
            {error && <div>Error: {error.message}</div>}

            <Form layout="vertical" onFinish={onFinish} className="">
            <Divider orientation="left"> Create New Book</Divider>
           
                <div className="grid lg:grid-cols-4 gap-8 shadow-sm h-[80vh]">
                    <div className="flex items-start justify-center">
                        <Upload
                            className="w-52"
                            customRequest={async ({ file, onSuccess, onError }) => {
                                try {
                                    const imageUrl = await UploadService.upload(file);
                                    onSuccess();
                                    console.log("Image URL:", imageUrl);
                                    setImageUrl(imageUrl.body.data)
                                } catch (error) {
                                    onError(error);
                                }
                            }}
                            onChange={handleChange}
                        >         {imageUrl ? (
                            
                            <img
                                className="w-52 rounded-md"
                                src={imageUrl}
                                alt="bookCover"
                            />
                        ) : (
                            uploadButton
                        )}
                        </Upload>
                    </div>
                    <div>
                        <Form.Item
                            className="text-[#292D77]"
                            label="ISBN"
                            name="isbn"
                            rules={[{ required: true }]}
                        >
                            <Input
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true }]}
                        >
                            <TextArea
                                showCount
                                maxLength={2999}
                                placeholder="disable resize"
                                rows={8}
                            />
                        </Form.Item>
                    </div>
                    <div>

                        <Form.Item
                            label="Publisher"
                            name="publisher"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" />

                        </Form.Item>
                        <Form.Item
                            label="Publish Date"
                            name="publishDate"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" type="date" />

                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="categoryId"
                            rules={[{ required: true }]}
                        >
                            <Select
                                size="large"
                                mode="multiple"
                                placeholder="Please select category"
                                style={{ flex: 1 }}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {categories && categories.map((category) => (
                                    <Select.Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>

                        </Form.Item>
                        <Form.Item
                            label="Author"
                            name="authorId"
                            rules={[{ required: true }]}
                        >
                            <Select
                                size="large"
                                mode="multiple"
                                placeholder="Please select author"
                                style={{ flex: 1 }}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {resauthor && resauthor.map((author) => (
                                    <Select.Option key={author.id} value={author.id}>
                                        {author.name}
                                    </Select.Option>
                                ))}
                            </Select>
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
};

export default CreateNewComponent;

