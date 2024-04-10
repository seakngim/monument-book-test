import { Avatar, Button, Dropdown, Image, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import UserProfileService from "../../redux/service/UserProfileService";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../redux/slices/UserProfileSlice";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import CreditCardService from "../../redux/service/CreditCardService";

const src =
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

function UserProfile() {
  const dispatch = useDispatch();
  const [cardToDeleteId, setCardToDeleteId] = useState(null);
  const resuser = useSelector((state) => state.userprofile.userProfiles);
  console.log(resuser, "rewsuser");
  const onDownload = () => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };
  const handleGetProfile = () => {
    UserProfileService.getUserProfile().then((res) => {
      console.log(res);
      dispatch(setUserProfile(res.data));
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setCardToDeleteId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    CreditCardService.deletCreditCardById(cardToDeleteId).then(()=>{
      handleGetProfile();
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCardToDeleteId(null);
  };
  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <>
      {/* user profile image  */}
      <div className="w-[1000px] m-auto mt-10 shadow-slate-750 shadow-lg rounded-sm ">
        <div className="bg-gray-200  p-5">
          <div className="pb-2">
            <div className="flex justify-end">
              <Link to={"/"}>
                <Button>X</Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold ">My Profile</h1>
          </div>
          <div className="border-b pb-3 flex justify-between items-end border-gray-400 ">
            <Image
              width={200}
              height={200}
              className="rounded-sm"
              src={resuser.coverImg ? resuser.coverImg : src}
              preview={{
                toolbarRender: (
                  _,
                  {
                    transform: { scale },
                    actions: {
                      onFlipY,
                      onFlipX,
                      onRotateLeft,
                      onRotateRight,
                      onZoomOut,
                      onZoomIn,
                    },
                  }
                ) => (
                  <Space size={12} className="toolbar-wrapper">
                    <DownloadOutlined onClick={onDownload} />
                    <SwapOutlined rotate={90} onClick={onFlipY} />
                    <SwapOutlined onClick={onFlipX} />
                    <RotateLeftOutlined onClick={onRotateLeft} />
                    <RotateRightOutlined onClick={onRotateRight} />
                    <ZoomOutOutlined
                      disabled={scale === 1}
                      onClick={onZoomOut}
                    />
                    <ZoomInOutlined
                      disabled={scale === 50}
                      onClick={onZoomIn}
                    />
                  </Space>
                ),
              }}
            />
            <Link to={"/editProfile"}>
              <Button className="0">Edit User profile</Button>
            </Link>
          </div>
        </div>
        <div className=" p-10">
          <div className="grid grid-cols-4 p-3">
            <div className="col-span-1">
              <p>Username :</p>
            </div>
            <div className="col-span-3">
              <p>{resuser.username}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 p-3">
            <div className="col-span-1">
              <p>Email :</p>
            </div>
            <div className="col-span-3">
              <p>{resuser.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 p-3">
            <div className="col-span-1">
              <p>Phone Number :</p>
            </div>
            <div className="col-span-3">
              <p>{resuser.phoneNum}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 p-3">
            <div className="col-span-1">
              <p>Address :</p>
            </div>
            <div className="col-span-3">
              <p>{resuser.address ? resuser.address : "null"}</p>
            </div>
          </div>
        </div>
        <div className="p-3 m-4 grid grid-cols-2 border-t-2">
          <p className="text-2xl ">Payment Methods</p>
          <div className="flex justify-end">
            <Link to={"/card/add"}>
              <Button>Add Payment Methods</Button>
            </Link>
          </div>
        </div>
        <div className="p-10">
          {resuser.creditCard == "" ? null : (
            <div>
              {resuser.creditCard &&
                resuser.creditCard.map((icreditCard) => {
                  const items = [
                    {
                      key: "1",
                      label: (
                        <Link to={`/card/update/${icreditCard.id}`}>
                          Update CreditCard
                        </Link>
                      ),
                    },
                    {
                      key: "2",
                      label: <p onClick={()=>showModal(icreditCard.id)}>Delete CreditCard</p>,
                    },
                  ];

                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className="w-full border border-gradient duration-300 hover:shadow-lg rounded-lg mt-5">
                      <div className="grid grid-cols-10 border-b-2 ">
                        <div className="flex items-center p-3 col-span-1">
                          <svg
                            enable-background="new 0 0 750 471"
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
                        <div className="flex items-center justify-end p-4">
                          <Dropdown menu={{ items }} placement="bottomRight">
                            <HiDotsHorizontal />
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Delete Card"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <button
            key="cancel"
            className="border border-[#292D77] text-[#292D77] px-5 py-1 rounded-md hover:bg-[#292D77] hover:text-gray-50 duration-500 mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>,
          <button
            key="ok"
            className="border border-red-500 bg-red-500 text-red-50 px-5 py-1 rounded-md hover:bg-red-600 duration-500"
            onClick={handleOk}
          >
            Ok
          </button>,
        ]}
      >
        <p>Are you sure you want to Delete Card?</p>
      </Modal>
    </>
  );
}

export default UserProfile;
