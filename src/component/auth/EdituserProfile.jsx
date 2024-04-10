import { Avatar, Button, Divider, Image, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import UserProfileService from "../../redux/service/UserProfileService";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../redux/slices/UserProfileSlice";

import { Form, Upload, message } from "antd";
import CategoryService from "../../redux/service/CategoryService";
// import { useLocation, useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import {
  CloseOutlined,
  FolderAddOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AuthorServises from "../../redux/service/AuthorService";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setAllCategory } from "../../redux/slices/CategorySlice";
import { setAllAuthor } from "../../redux/slices/AuthorSlice";
import { setBookById } from "../../redux/slices/BookSlice";
import UploadService from "../../redux/service/UploadService";

function EdituserProfile() {
  const resuser = useSelector((state) => state.userprofile.userProfiles);
  console.log(resuser, "rewsuser");
  const handleGetProfile = () => {
    UserProfileService.getUserProfile().then((res) => {
      console.log(res);
      dispatch(setUserProfile(res.data));
    });
  };
  useEffect(() => {
    handleGetProfile();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [error, setError] = useState(null); // Add state for error handling
  const [formData, setFormData] = useState({
    username:"",
    phoneNumber: "",
    coverImg: "",
    email: "",
    address: "",
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
    const user = resuser;
    if (user) {
      setFormData({
        username: user.username,
        phoneNumber: user.phoneNum,
        coverImg: user.coverImg,
        email: user.email,
        address: user.address,
      });
    }
  }, [resuser]);
 
  // const resbookById = useSelector((state) => state.book.bookbyId);

  // Function to handle form submission
  const onFinish = () => {
    console.log(formData, "formData");
    UserProfileService.UpdateUserProfile(formData).then(() => {
      navigate("/profile");
    });
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

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="shadow-lg rounded-lg p-5 pt-0 pb-10 m-auto mt-10"
      >
        <div className="flex justify-end">
            <Link to={"/profile"}><Button>X</Button></Link>
        </div>
        <h1 className="text-3xl font-bold pb-5">Update Profile</h1>
        <div className="bg-gray-100 w-[1000px] ">
          <div className="flex items-end p-10 pb-5 justify-between">
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
            <Button className="bg-blue-500 text-white" htmlType="submit">
              Save Edit profile
            </Button>
          </div>
          <div className=" p-10">
            <Form.Item
              className="text-[#292D77]"
              label="USERNAME"
              name="username"
            >
              <Input
                size="large"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
            <Form.Item label="PHONE NUMBER" name="phoneNumber">
              <Input
                size="large"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
              <p
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              ></p>
            </Form.Item>
            <Form.Item label="EMAIL" name="email">
              <Input
                size="large"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <p
              ></p>
            </Form.Item>
            <Form.Item label="ADDRESS" name="address">
              <TextArea
                showCount
                maxLength={200}
                placeholder="disable resize"
                rows={8}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
}

export default EdituserProfile;
