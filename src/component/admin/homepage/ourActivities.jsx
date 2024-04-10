import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
  FolderViewOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import UploadService from "../../../redux/service/UploadService";
import NewsServises from "../../../redux/service/NewsServices";
import { useDispatch, useSelector } from "react-redux";
import { setAllNews } from "../../../redux/slices/NewsSlices";
import { message } from "antd/es";

function OurActivities() {
  const [loading, setLoading] = useState(false);
  const [required, setRequired] = useState(true);
  const [titleform, settitleform] = useState("Create Item ");

  const [imageUrl, setImageUrl] = useState();
  const dispatch = useDispatch();
  const resNews = useSelector((state) => state.news.allNews);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const pageSize = 10;


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImg: "",
  });

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
  const onFinish = (values) => {
    console.log("object", formData);
    try {
      const data = {
        title: values.title,
        description: values.description,
        coverImg: imageUrl,
      };
      console.log("object111", data);
      if (formData.id) {
        // Update existing entry
        const id = formData.id;
        NewsServises.updateNews(id, formData).then(() => {
          message.success("News update successful!")
          resetForm();
          handleGetAllNews();
        });
        console.log("edit");
      } else {
        // Add new entry
        console.log("add");
        NewsServises.addNews(formData).then(() => {
          message.success("News add successful!")
          resetForm();
          handleGetAllNews();
        });
      }
    } catch (error) {
      // Handle errors
      console.error("Error in onFinish:", error);
      message.success("News add Error")
    }
  };
  const handleEdit = (record) => {
    console.log("object", record);
    setImageUrl(record.cover.props.src);
    setFormData({
      id: record.id,
      title: record.title,
      description: record.description,
      coverImg: imageUrl ? imageUrl : record.cover.props.src,
    });

    settitleform("Edit Item");
    setRequired(false);
    console.log("object", formData);
  };


  const handleDelete = (record) => {
    try {
      // Implement logic to delete the entry with the given id
      NewsServises.deleteNews(record.id).then(() => {
        handleGetAllNews();
      });

    } catch (error) {
      console.error("Error deleting entry:", error);
      // Handle error as needed (e.g., show a message to the user)
    }
  };
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      coverImg: "",
    });
    settitleform("Create Item");
    setImageUrl("")
  };
  const handleGetAllNews = () => {
    try {
      NewsServises.getAllNews(1, currentPageSize)
        .then((res) => {
          // console.log("res.dataa", res);
          setCurrentPageSize(res.totalElements);
          dispatch(setAllNews(res.data));
        })
        .catch((error) => {
          console.error("Error fetching best-selling books:", error);
          // Handle the error as needed, e.g., show a user-friendly message or dispatch an error action
        });
    } catch (error) {
      // Handle errors
      console.error("Error in onFinish:", error);
    }
  };
  const handleChange = async (info) => {
    if (info.file.status === "done") {
      console.log("info");
      setFormData(info)
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const uploadButton = (
    <button className="w-40 h-40 border-dashed border-2 rounded-md" type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  let dataSource = resNews.map((item, index) => ({
    id: item.id,
    key: index + 1,
    cover: (
      <img
        src={item.coverImg}
        alt={`Cover ${index}`}
        style={{ maxWidth: "100%", maxHeight: "50px" }}
      />
    ),
    title: item.title,
    description: item.description,
    date: item.date,
  }));
  const columns = [
    {
      title: "No",
      dataIndex: "key",
      width: "5%",
      align: "center",
      fixed: "left",
    },
    {
      title: "Cover",
      dataIndex: "cover",
      width: "10%",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "25%",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      width: "30%",
      render: (_, record) => <CustomDescription description={record.description} />,
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          {/* <a onClick={() => setFormValues(record)}><FolderViewOutlined /> {record.name}</a> */}
          <a onClick={() => handleEdit(record)}>
            <EditOutlined /> {record.name}
          </a>
          <a onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    handleGetAllNews();
    handleDelete();
  }, []);
  useEffect(() => {
    handleGetAllNews();
  }, [currentPageSize]);
  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={formData}
        className="shadow-lg rounded-lg p-5 pt-2 pb-10"
      >
        <Divider orientation="left">{titleform} </Divider>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="col-span-1 mt-5 flex items-start justify-center">
            <Upload
              className="w-52"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const imageUrl = await UploadService.upload(file);
                  onSuccess();
                  setImageUrl(imageUrl.body.data);
                  setFormData({ ...formData, coverImg: imageUrl.body.data });
                } catch (error) {
                  onError(error);
                }
              }}
              onChange={(info) => handleChange(info)} // Handle onChange event separately
            >
              {imageUrl ? (
                // Display the uploaded image
                <img
                  src={imageUrl}
                  alt="bookCover"
                />
              ) : formData.coverImg ? (
                // Display the image from formData if available
                <img
                  src={formData.coverImg}
                  alt="Cover"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "100%",
                  }}
                />
              ) : (
                // Display the uploadButton if no image is available
                uploadButton
              )}
            </Upload>
          </div>
          <div className="col-span-2">
            <Form.Item
              className="text-[#292D77]"
              label="Title"
              name="title"
              rules={[{ required: required }]}
            >
              <Input
                size="large"
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  setRequired(e.target.value.trim() === "");
                }}
                value={formData.title}
              />
              <p
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              ></p>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: required }]}
            >
              <TextArea
                showCount
                maxLength={5000}
                placeholder="description"
                rows={8}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <p
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></p>
            </Form.Item>
            <Space className="mt-5">
              <Button
                size="large"
                icon={<CloseOutlined />}
                block
                danger
                onClick={resetForm}
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
      {/* table */}
      <div className="py-2 shadow-lg rounded-lg">
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 1500, y: 300 }}
          rowKey="id"
        />
      </div>
    </>
  );
}

export default OurActivities;
