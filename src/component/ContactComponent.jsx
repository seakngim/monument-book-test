import { Button, Form, Input } from "antd";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { FaClock, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Imgcontact from "../assets/images/contactus.png"

const ContactComponent = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };
  return (
    <div className="text-gray-800">
      <div className="max-w-[80%] m-auto overflow-hidden -lg:mt-20 lg:h-96 bg-cover bg-no-repeat">
        <img
          className="transition duration-300 hover:scale-110 w-full object-cover rounded-md"
          src={Imgcontact}
          alt="monument_book_logo"
        />
      </div>
      <div className="background-gradient  py-20">
        {/* <div className="text-center md:text-base text-sm lg:px-36 md:px-10">
          Monument Books was established in Phnom Penh in 1993 and has grown to
          become the largest chain of bookstores in Cambodia. Today there are 12
          stores in six cities throughout Cambodia, Laos and Myanmar
        </div> */}
        <div className="max-w-[80%] m-auto grid lg:grid-cols-3 container mx-auto gap-5">
          <section className="lg:col-span-2 bg-white rounded-lg p-10">
            <h3 className="font-bold text-2xl mb-5">Send us a Message</h3>
            <p>Let's get this conversation started. Tell us a bit about yourself, and we'll get in touch as soon as we can.</p>
            <Form
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
              className="form-container"
            >
              <div className="grid sm:grid-cols-1  md:grid-cols-2 gap-x-5 mt-5">
                <Form.Item
                  name="fistName"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input placeholder="First name" size="large" className="responsive-input bg-inherit text-[#292D77]" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input placeholder="Last name" size="large" className="responsive-input bg-inherit text-[#292D77]" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email address",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input placeholder="Email address" size="large" className="responsive-input bg-inherit text-[#292D77]" />
                </Form.Item>
                <Form.Item
                  name="subject"
                  rules={[
                    { required: true, message: "Please enter the subject" },
                  ]}
                >
                  <Input placeholder="Subject" size="large" className="responsive-input bg-inherit text-[#292D77]" />
                </Form.Item>
              </div>
              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <Input.TextArea rows={6} size="large" className="responsive-input bg-inherit text-[#292D77]" placeholder="Your message" />
              </Form.Item>
              <Button htmlType="submit" size="large" className="responsive-input bg-[#292D77] text-gray-50" >
                Send Message
              </Button>
            </Form>
          </section>
          {/* social media*/}
          <section className="col-span-1 items-center grid md:grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-0 lg:pb-20">
            <Link to="tel:(+855) 012 34 567" className="flex bg-white p-5 rounded-lg items-center hover:shadow-lg duration-500">
              <div className="me-5 p-4 rounded-full text-[#292D77] bg-gray-100">
                <FaPhoneAlt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Phone Number</h3>
                <span>012 34 567</span>
              </div>
            </Link>
            <Link to="mailto:sambo@monument-books.com" className="flex bg-white p-5 rounded-lg items-center hover:shadow-lg duration-500">
              <div className="me-5 p-4 rounded-full text-[#292D77] bg-gray-100">
                <BsFillEnvelopeFill className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Phone Number</h3>
                <p>sambo@monument-books.com</p>
              </div>
            </Link>
            <Link to="https://www.facebook.com/monumentbooksandtoys" className="flex bg-white p-5 rounded-lg items-center hover:shadow-lg duration-500">
              <div className="me-5  p-4 rounded-full text-[#292D77] bg-gray-100" >
                <FaFacebookF className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Facebook Page</h3>
                <p className="line-clamp-1">facebook.com /monumentbooksandtoys</p>
              </div>
            </Link>
            <div className="flex bg-white p-5 rounded-lg items-center hover:shadow-lg duration-500">
              <div className="me-5  p-4 rounded-full text-[#292D77] bg-gray-100" >
                <FaClock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Open Hours</h3>
                <p className="line-clamp-1">9:00AM - 5:00PM</p>
              </div>
            </div>
          </section>
          {/*  */}

        </div>
      </div>
      <div className="max-w-[80%] m-auto py-20">

          {/* section location */}
          <section className="text-center">
          <h3 className="font-bold text-2xl mb-5">Find Us on Google Maps</h3>
          <p>Nº 111 Norodom Blvd, Chaktomuk, Phnom Penh 12207, Kingdom of Cambodia.</p>
            <div className="max-w-auto mt-10">
              <iframe className="w-full h-96 lg:h-[570px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15635.59016861525!2d104.92130265908833!3d11.559202279381877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095139ffd8720b%3A0x214ebe2326526948!2sMonument%20Books!5e0!3m2!1sen!2skh!4v1708155008884!5m2!1sen!2skh" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </section>

      </div>
    </div>
  );
};

export default ContactComponent;