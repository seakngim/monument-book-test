import { Link } from "react-router-dom";

export const items = [
  {
    label: <Link to="/"> Home </Link>,
    key: 'home'
  },
  {
    label: <Link to="/book"> Books </Link>,
    key: 'book',
  },
  {
    label: <Link to="/category">Category</Link>,
    key: 'category',
  },
  {
    label: <Link to="/about-us">About Us</Link>,
    key: 'about-us',
  },
  {
    label: <Link to="/contact">Contact Us </Link>,
    key: 'contact'
  },
];

