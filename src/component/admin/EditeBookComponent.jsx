import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { error } from "jquery";
import React, { useEffect, useState } from "react";
import CategoryService from "../../redux/service/CategoryService";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import {
  CloseOutlined,
  FolderAddOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AuthorServises from "../../redux/service/AuthorService";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import BookService from "../../redux/service/BookService";
import { setAllCategory } from "../../redux/slices/CategorySlice";
import { setAllAuthor } from "../../redux/slices/AuthorSlice";
import { setBookById } from "../../redux/slices/BookSlice";
import UploadService from "../../redux/service/UploadService";

const EditeBookComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [error, setError] = useState(null); // Add state for error handling
  const [formData, setFormData] = useState({
    id: "",
    isbn: "",
    title: "",
    price: "",
    description: "",
    publisher: "",
    publishDate: "",
    coverImg: "",
    category: [],
    author: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bookRes, categoryRes, authorRes] = await Promise.all([
          BookService.getBookById(param.id),
          CategoryService.getAllCategory(),
          AuthorServises.getAllAuthor(),
        ]);
        console.log(categoryRes, "categoryRes");
        dispatch(setBookById(bookRes.data));
        dispatch(setAllCategory(categoryRes.data));
        dispatch(setAllAuthor(authorRes.body.data));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, param.id]);
  const resbookById = useSelector((state) => state.book.bookbyId);
  console.log(resbookById, " resbookById111");

  useEffect(() => {
    const book = resbookById[0];
    if (book) {
      setFormData({
        id: book.id,
        isbn: book.isbn,
        title: book.title,
        price: book.price,
        description: book.description,
        publisher: book.publisher,
        publishDate: book.publishDate,
        category: book.categories, // Update category field with array of category IDs
        author: book.author,
        coverImg: book.coverImg,
      });
    }
  }, [resbookById]);
  console.log(formData,"formData");

  const categories = useSelector((state) => state.category.allCategory);
  const resauthor = useSelector((state) => state.author.allAuthors);
  // const resbookById = useSelector((state) => state.book.bookbyId);

  console.log(categories, "categories");
  // console.log(resbookById[0]?.isbn,"resbookById");

  // Function to handle form submission
  const onFinish = () => {
    console.log(formData);
    const data = {
      title: formData.title,
      description: formData.description,
      coverImg: formData.coverImg,
      isbn: formData.isbn,
      publisher: formData.publisher,
      publishDate: formData.publishDate,
      price: formData.price,
      categoryId: formData.category.map((res) => res.id),
      authorId: formData.author.map((res) => res.id),
    };
    BookService.editeBook(formData.id, data).then(()=>{
        navigate("/dashboard/list")
    });
    console.log(data, "data");
  };
  const handleChange = async (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const uploadButton = (
    <button
      className="w-40 h-40  border-dashed border-2 rounded-md"
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // useEffect(() => {
  //     handleGetCategory();
  //     handleGetAuthor();
  //     handleGetBook();
  //     // Set initial form values after the API call has finished
  // console.log(formData,"formdata");
  // }, []);

  return (
    <>
      {error && <div>Error: {error.message}</div>}
<div className="">
   <Form
        layout="vertical"
        onFinish={onFinish}
        className="shadow-lg rounded-lg p-5 pt-2 pb-10"
      >
        <Divider className="text-red-800 text-3xl" orientation="left">
          Edit Book
        </Divider>
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
                  setFormData({ ...formData, coverImg: imageUrl.body.data });
                } catch (error) {
                  onError(error);
                }
              }}
              onChange={handleChange}
            >
              {formData.coverImg ? (
                <img
                  className="w-52 rounded-md"
                  src={formData.coverImg}
                  alt="bookCover"
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div>
            <Form.Item className="text-[#292D77]" label="ISBN" name="isbn">
              <Input
                size="large"
                value={formData.isbn}
                onChange={(e) =>
                  setFormData({ ...formData, isbn: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
            <Form.Item label="Title" name="title">
              <Input
                size="large"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <p
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              ></p>
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input
                size="large"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <p
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              ></p>
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea
                showCount
                maxLength={2999}
                placeholder="disable resize"
                rows={8}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Publisher" name="publisher">
              <Input
                size="large"
                value={formData.publisher}
                onChange={(e) =>
                  setFormData({ ...formData, publisher: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
            <Form.Item label="Publish Date" name="publishDate">
              <Input
                size="large"
                type="date"
                value={formData.publishDate}
                onChange={(e) =>
                  setFormData({ ...formData, publishDate: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
            <Form.Item label="Category" name="categoryId">
              <Select
                size="large"
                mode="multiple"
                placeholder="Please select category"
                style={{ flex: 1 }}
                value={
                  formData.category
                    ? formData.category.map((res) => res.id)
                    : [1]
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.map((categoryId) => ({
                      id: categoryId,
                    })),
                  })
                }
              >
                {categories &&
                  categories.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category?.name}
                    </Select.Option>
                  ))}
              </Select>
              <p></p>
            </Form.Item>

            <Form.Item label="Author" name="authorId">
              <Select
                size="large"
                mode="multiple"
                placeholder="Please select category"
                style={{ flex: 1 }}
                value={
                  formData.category ? formData.author.map((res) => res.id) : [1]
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author: e.map((author) => ({
                      id: author,
                    })),
                  })
                }
              >
                {resauthor &&
                  resauthor.map((author) => (
                    <Select.Option key={author.id} value={author.id}>
                      {author?.name}
                    </Select.Option>
                  ))}
              </Select>
              <p></p>
            </Form.Item>
            <Space className="mt-5">
              <Button
                size="large"
                icon={<CloseOutlined />}
                block
                danger
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button
                size="large"
                icon={<FolderAddOutlined />}
                block
                style={{ border: 0, backgroundColor: "#3A53A4", color: "#fff" }}
                htmlType="submit"
              >
                Save
              </Button>
            </Space>
          </div>
        </div>
      </Form>
</div>
     
    </>
  );
};

export default EditeBookComponent;
