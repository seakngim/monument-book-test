import React, { useEffect, useState } from 'react';
import { Tabs, Form, Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from '../redux/slices/UserProfileSlice';
import UserProfileService from '../redux/service/UserProfileService';
import { Link } from 'react-router-dom';
import { HiDotsHorizontal } from "react-icons/hi";
import { Radio, Button,Checkbox } from "antd";
import PaymentService from '../redux/service/PaymentService';

const { TabPane } = Tabs;

function PaymentComponent({ modalData }) {
    console.log(modalData, "PaymentComponent");
    const dispatch = useDispatch();
    const resuser = useSelector((state) => state.userprofile.userProfiles);
    const [selectedCard, setSelectedCard] = useState(null);
    const [activeTab, setActiveTab] = useState("1");

    const handleGetProfile = () => {
        UserProfileService.getUserProfile().then((res) => {
            console.log(res);
            dispatch(setUserProfile(res.data));
        });
    };


    const onFinish = (values) => {
        console.log('Success:', values);
        console.log();
        if (activeTab === "1") { // Check if the active tab is "Pay On Delivery"
            const paydata = {
                name: "delivery",
                number: values.cardNumber, // Assuming you have a form field named "cardNumber"
                cvv: values.cvv // Assuming you have a form field named "cvv"
            };
            PaymentService.addPamyent(paydata)
                .then((res) => {
                    console.log(res);
                    const orderdata = {
                        orderItem: modalData.orderItem,
                        qty: modalData.qty,
                        price: modalData.price,
                        type: values.type,
                        address: values.address,
                        phone: values.phone
                    };
                    console.log(orderdata, "orderdata");
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (key) => {
  
    };
    const onCardSelect = (card) => {
        setSelectedCard(card);
    };
    console.log(selectedCard, "selectedCard");
    useEffect(() => {
        handleGetProfile();
    }, [])
    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="Pay On Delivery" key="1">
                    delivery
                </TabPane>
                <TabPane tab="Pay By Visa" key="2">
                    <div>
                        <div className="">

                            <Radio.Group onChange={(e) => onCardSelect(e.target.value)} value={selectedCard}>
                                {resuser.creditCard == null ? null : (
                                    resuser.creditCard.map((icreditCard, index) => (
                                        <div className="w-full border border-gradient duration-300 hover:shadow-lg rounded-lg mt-5 pl-5">

                                            <Radio key={index} value={icreditCard}>
                                                <div className="grid grid-cols-10 border-b-2">
                                                    <div className="flex items-center p-3 col-span-1">
                                                        <svg
                                                            height="25"
                                                            viewBox="0 0 750 471"
                                                            width="50"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g fill="#0e4595">
                                                                <path d="m278.198 334.228 33.36-195.763h53.358l-33.384 195.763z" />
                                                                <path d="m524.307 142.687c-10.57-3.966-27.135-8.222-47.822-8.222-52.725 0-89.863 26.551-90.18 64.604-.297 28.129 26.514 43.821 46.754 53.185 20.77 9.597 27.752 15.716 27.652 24.283-.133 13.123-16.586 19.116-31.924 19.116-21.355 0-32.701-2.967-50.225-10.274l-6.877-3.112-7.488 43.823c12.463 5.466 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.884.199-22.27-14.016-39.216-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.559-16.838 17.447-.271 30.088 3.534 39.936 7.5l4.781 2.259z" />
                                                                <path d="m661.615 138.464h-41.23c-12.773 0-22.332 3.486-27.941 16.234l-79.244 179.402h56.031s9.16-24.121 11.232-29.418c6.123 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512zm-65.417 126.408c4.414-11.279 21.26-54.724 21.26-54.724-.314.521 4.381-11.334 7.074-18.684l3.607 16.878s10.217 46.729 12.352 56.527h-44.293z" />
                                                                <path d="m45.878906 138.46484-.68164 4.07227c21.092962 5.106 39.932007 12.49619 56.425784 21.68945l47.3457 169.6875 56.45508-.0625 84.0039-195.38672h-56.52539l-52.23828 133.4961-5.56445-27.13086c-.26068-.83823-.54407-1.67793-.83399-2.51953l-18.16015-87.31836c-3.229-12.396-12.59655-16.09535-24.18555-16.52735z" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className="flex items-center col-span-8">
                                                        <div className="w-full">
                                                            <p className="text-base font-medium text-[#292D77] dark:text-[#292D77] line-clamp-1">
                                                                {icreditCard.fullName}
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {String(icreditCard.cardNumber)
                                                                    .replace(/(\d{4})/g, "$1-****-****-****")
                                                                    .slice(0, 19)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Radio>
                                        </div>
                                    ))
                                )}
                            </Radio.Group>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ type: false }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}

            >
                <Form.Item label="Address" name="address">
                    <Input />
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="type"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>required full item only</Checkbox>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                    <Button type="primary" htmlType="submit" className='bg-blue-600'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default PaymentComponent;
