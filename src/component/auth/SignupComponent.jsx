import React, { useState } from "react";
import bgLogin from "../../assets/images/signin.gif";
import Logo from "../../assets/images/MBLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input } from "antd";
import AuthService from "../../redux/service/AuthService";
import WarningPopUpComponents from "./popup/WarningPopUpComponents";
import LoadingComponent from "./popup/LoadingComponent";
import ErrorSignUp from "./popup/ErrorSignUp";

const SignUp = () => {
  const setLocalStorageItems = (data) => {
    localStorage.setItem("token", data.body.token);
    localStorage.setItem("userId", data.body.id);
    localStorage.setItem("user_role", data.body.role);
  };
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false)
  const [isShowErr, setIsShowErr] = useState(false)
  const [message, setMessage] = useState()
  const onFinish = (values) => {
    setLoading(true)
    if (values && typeof values === 'object') {
      // Assuming values is an object with properties like phone, email, password, etc.
      const data = {
        username: values.email,
        phoneNumber: values.phone,
        email: values.email,
        password: values.password,
        role: "USER",
      };
      AuthService.signup(data).then((res) => {
        console.log('API Response:', res.data);
        if (res.data.body.status != false) {
          console.log('API Response:', res.data);
          setLocalStorageItems(res.data);
          const token = localStorage.getItem("token")
          // const user_role = localStorage.getItem("user_role")
          setTimeout(() => {
            setLoading(false)
            if (token) {
              navigate(-1)
            }
          }, 2000)

        }
        else {
          setTimeout(() => {
            setLoading(false)
            setIsShowErr(true)
            setMessage(res.data.body.message)
          }, 2000)

        }
      },).catch((e) => {
      })
    } else {
      console.error("Invalid values. Expected an object but received:", values);
      // Handle this case according to your requirements.
    }
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords do not match.'));
    },
  });
  const responseGoogle = () => {
    console.log("Response successful");
    // Handle the Google login response here
  };

  return (
    <>
      {isShowErr && <ErrorSignUp setIsShowErr={setIsShowErr} />}
      {loading && <LoadingComponent />}
      <div className="mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 px-4 max-w-7xl sm:static sm:px-6 lg:px-8">
        <Form onFinish={onFinish} form={form} layout='vertical' className="sm:col-span-2 md:col-span-2 lg:col-span-2 ">
          <div className="grid pt-10 justify-items-center">
            <img
              className="w-auto object-cover h-28"
              src={Logo}
              alt="bgLogin"
            />
          </div>
          <h1 className="py-5 text-[#292D77] text-2xl font-bold mt-5 text-center">
            Create your Account
          </h1>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone!" },
            ]}
          >
            <Input size="large" placeholder="Please Enter Phone Number." autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input size="large" placeholder="Please Enter Email." autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              validateConfirmPassword,
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Button size="large"
            htmlType='submit'
            className="mb-4 bg-[#292D77] text-white w-full p-2 rounded-md hover:bg-[#363B9D] focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign Up
          </Button>
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-[#292D77] ml-2 hover:underline">Sign In</Link>
          </span>
        </Form>
        <div className="md:col-span-3 lg:col-span-3 hidden md:flex">
          <img className="py-2 pt-5 w-full" src={bgLogin} alt="bgLogin" />
        </div>
      </div>
    </>

  );
};

export default SignUp;
