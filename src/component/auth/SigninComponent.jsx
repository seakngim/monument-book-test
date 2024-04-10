import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/MBLogo.png";
import background from "../../assets/images/signup.gif";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import AuthService from "../../redux/service/AuthService";
import WarningPopUpComponents from "./popup/WarningPopUpComponents";
import LoadingComponent from "./popup/LoadingComponent";

const SignIn = () => {
  const setLocalStorageItems = (data) => {
    localStorage.setItem("token", data.body.token);
    localStorage.setItem("userId", data.body.id);
    localStorage.setItem("user_role", data.body.role);
  };
  const [loading, setLoading] = useState(false);
  const [isShowErr, setIsShowErr] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    setLoading(true);
    AuthService.signin(values)
      .then((res) => {
        console.log(res, "API Response:");
        if (res.data.body.status != false) {
          console.log("API Response:", res.data);
          setLocalStorageItems(res.data);
          const token = localStorage.getItem("token");
          setTimeout(() => {
            setLoading(false);
            if (token) {
              navigate(-1)
            }
          }, 2000);
        } else {
          setTimeout(() => {
            setLoading(false);
            setIsShowErr(true);
          }, 2000);
        }
      })
      .catch((e) => {
        setLoading(false);
        setIsShowErr(true);
      });
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, []);

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  const handleSubmit = (e) => {
    // e.preventDefault();
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Handle the Google SignIn response here
  };

  return (
    <>
      {isShowErr && (
        <WarningPopUpComponents setIsShowErr={setIsShowErr} message={message} />
      )}
      {loading && <LoadingComponent />}
      <div className="mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 px-4 max-w-7xl sm:static sm:px-6 lg:px-8">
        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          className="sm:col-span-2 md:col-span-2 lg:col-span-2 "
        >
          <div className="grid pt-10 justify-items-center">
            <img
              className="w-auto object-cover h-28"
              src={Logo}
              alt="bgLogin"
            />
          </div>
          <h1 className="text-[#292D77] text-2xl font-bold mt-5 text-center">
            Sign in to your Account
          </h1>
          <p className="my-4">Welcome Back! Please enter your information</p>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              size="large"
              placeholder="Please Enter Email."
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="Please Enter password."
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            noStyle
            className=""
          >
            <Checkbox>Remember me</Checkbox>
            <Link href="/forgot-password" className="text-[#292D77]">
              Forgot Password
            </Link>
          </Form.Item>
          <Button
            size="large"
            htmlType="submit"
            className="my-4 bg-[#292D77] text-white w-full p-2 rounded-md hover:bg-[#363B9D] focus:outline-none focus:ring focus:border-[#363B9D]"
          >
            Sign In
          </Button>
          <span className="text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-[#363B9D] ml-2 hover:underline focus:outline-none"
            >
              Sign Up
            </Link>
          </span>
          <Divider>
            <p className="text-sm px-1 bg-white text-gray-500">Or</p>
          </Divider>
          <div className="w-full"></div>
        </Form>
        <div className="md:col-span-3 lg:col-span-3 hidden md:flex">
          <img className="py-2" src={background} alt="background" />
        </div>
      </div>
    </>
  );
};

export default SignIn;
