import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "antd";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  setBestSelling,
  setBookOfTheWeek,
  setNewArrival,
} from "../../redux/slices/BookSlice";
import { setAllNews } from "../../redux/slices/NewsSlices";
import { setAllAuthor, setfeatureAuthor } from "../../redux/slices/AuthorSlice";
import BookService from "../../redux/service/BookService";
import NewsServises from "../../redux/service/NewsServices";
import AuthorServises from "../../redux/service/AuthorService";
import vectorBgWave from "../../assets/images/Vectorbg-wave.png";
import cover from "../../assets/images/Books Cover/Nineteen_Eighty_Four_Cover.jpg";
import reading from "../../assets/images/Reading glasses.gif";
import CardComponent from "./component/CardComponent";
import bestsalling from "../../assets/images/Best Selling.png";
import featureauthor from "../../assets/images/Feature Aurthor.png";
import newarrivals from "../../assets/images/New Arrivals.png";
import ouractivities from "../../assets/images/Our Activities.png";
import bookglasses from "../../assets/images/Book glasses.gif";
import authorimg from "../../assets/images/Author.gif";
import FeatureComponent from "./component/FeatureComponent";
import ButtonComponent from "./component/ButtonComponent";
import CardOurActivites from "./component/CardOurActivites";
import CartPopup from "../popup/CartPopup";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const bestSelling = useSelector((state) => state.book.bestSelling);
  const bookOfTheWeek = useSelector((state) => state.book.bookOfTheWeek);
  const newArrival = useSelector((state) => state.book.newArrival);
  const resNews = useSelector((state) => state.news.allNews);
  const resAuthor = useSelector((state) => state.author.featureAuthor);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cartId, setcartId] = useState();

  const booksOfTheWeekService = () => {
    BookService.getBookOfTheWeek(1, 5)
      .then((res) => {
        dispatch(setBookOfTheWeek(res.data));
      })
      .catch((error) => {
        console.error("Error fetching books of the week:", error);
      });
  };

  const getAllBestSellingBooks = () => {
    BookService.getBestSelling(1, 5)
      .then((res) => {
        dispatch(setBestSelling(res.data));
      })
      .catch((error) => {
        console.error("Error fetching best-selling books:", error);
      });
  };

  const newArrivalService = () => {
    BookService.getNeweArrival(1, 5)
      .then((res) => {
        dispatch(setNewArrival(res.data));
      })
      .catch((error) => {
        console.error("Error fetching new arrivals:", error);
      });
  };

  const authorService = () => {
    AuthorServises.getfeatureAuthor()
      .then((res) => {
        dispatch(setfeatureAuthor(res.body.data));
      })
      .catch((error) => {
        console.error("Error fetching feature authors:", error);
      });
  };

  const newsService = () => {
    NewsServises.getAllNews(1, 6)
      .then((res) => {
        dispatch(setAllNews(res.data));
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  };

  useEffect(() => {
    getAllBestSellingBooks();
    newArrivalService();
    booksOfTheWeekService();
    newsService();
    authorService();
  }, []);

  const booksOfTheWeek = bookOfTheWeek.map((item) => ({
    id: item.id,
    image: item.coverImg,
    title: item.title,
    description: item.description,
    author: item.author.map((autor) => autor.name),
    isbn: item.isbn,
    category: item.categories.map((category) => category.name),
    pubdate: item.publishDate,
    publisher: item.publisher,
  }));

  const newArrivals = newArrival.map((item) => ({
    id: item.id,
    coverImg: item.coverImg,
    price: item.price,
    title: item.title,
    description: item.description,
    author: item.author.map((autor) => autor.name),
  }));

  const featureAuthor =
    resAuthor &&
    resAuthor.map((author) => ({
      authorid: author.id,
      authorquote: author.quote !== null ? author.quote : "No quote available",
      authorname: author.name,
      authorimg: author.image,
      authordesc: author.description,
      authorbooks: author.books.map((books) => books.coverImg),
    }));

  const news = resNews.map((newsr) => ({
    id: 1,
    image: newsr.coverImg,
    title: newsr.title,
    description: newsr.description,
  }));

  const [scrolls, setScrolls] = useState([
    {
      id: 1,
      link: "best-selling",
      image: bestsalling,
      title: "Best Selling",
      section: "best-selling",
    },
    {
      id: 2,
      link: "new-arrivals",
      image: newarrivals,
      title: "New Arrivals",
      section: "new-arrivals",
    },
    {
      id: 3,
      link: "feature-aurthor",
      image: featureauthor,
      title: "Feature Aurthor",
      section: "feature-aurthor",
    },
    {
      id: 4,
      link: "our-activities",
      image: ouractivities,
      title: "Our Activities",
      section: "our-activities",
    },
  ]);
  const showModal = (id) => {
    setOpen(true);
    setcartId(id);
  };

  const handleOk = () => {
    setcartId("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 200);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      {/* Book of The Week */}
      <section
        className="w-full -mt-20 pt-20"
        style={{
          backgroundImage: `url(${vectorBgWave})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="w-[80%] mx-auto">
          <h1 className="text-[#2BD7AD] border-gray-50 font-bold text-2xl sm:text-4xl md:text-4xl lg:text-6xl my-5 lg:my-20">
            Books of The Week
            {/* <span className=" text-2xl sm:text-4xl text-gray-400"> are typically refers to selection of books recommended or highlighted by specific source each week.</span> */}
          </h1>
          <div className="lg:pr-40 ">
            <Carousel autoplay className="mb-16">
              {booksOfTheWeek.length > 0 ? (
                booksOfTheWeek.map((book) => (
                  <div key={book.id}>
                    <section className="text-white grid md:grid-cols-2 mb-20">
                      <div className="flex items-center justify-center">
                        <img
                          className="w-80"
                          src={book.image}
                          alt={book.name}
                        />
                      </div>
                      <div className="mx-5 mt-5 lg:mx-0">
                        <h3 className="line-clamp-1 font-bold uppercase text-2xl sm:text-4xl md:text-4xl">
                          {book.title}
                        </h3>
                        <p className="mt-2 flex gap-1 md:mb-0 text-[3.2vw] md:text-[2vw] xl:text-[1.75rem] text-gray-400">
                          Author:{" "}
                          <span className="line-clamp-1 ml-5">
                            {book.author}
                          </span>
                        </p>
                        <div className="flex my-5 gap-10">
                          <div className="text-base lg:text-lg line-clamp-4">
                            {book.description}
                          </div>
                        </div>
                        <div className="flex gap-4 mt-10">
                          <ButtonComponent
                            className="lg:w-40 w-28 block md:py-3 py-1 mb-2 rounded-lg duration-300 text-[#2BD7AD] hover:text-white lg:text-xl font-bold border-2 hover:bg-[#2AD0A8] hover:border-[#2AD0A8]"
                            namebutton="Add to Cart"
                            onClick={() => showModal(book.id)}
                          />
                          <ButtonComponent
                            className="lg:w-40 w-28 block md:py-3 py-1 rounded-lg duration-300 text-gray-50 hover:text-white lg:text-xl font-bold border-2 bg-[#2AD0A8] hover:bg-[#2AD0A890] border-[#2AD0A8] hover:border-[#2AD0A890]"
                            namebutton="Buy Now"
                            link={`/checkout/${book.id}`}
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <section className="text-white grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8">
                      <img
                        className="w-36 md:max-w-56 lg:max-w-96 m-auto max-w-none"
                        src={reading}
                        alt="Sapiens_Cover"
                      />
                      <p className="text-[3.75rem] mt-10 flex items-center text-gray-400">
                        No data
                      </p>
                    </section>
                  </div>
                </>
              )}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Feature */}
      <section>
        <h1 className="text-center text-[#2BD7AD] font-bold text-2xl sm:text-4xl md:text-4xl lg:text-[3.75rem] lg:py-20">
          Feature
        </h1>
        <FeatureComponent scrolls={scrolls} />
      </section>

      {/* Best Selling Books */}
      <section id="best-selling">
        <h1 className="w-[80%] mx-auto text-[#2BD7AD] font-bold text-2xl sm:text-4xl md:text-4xl lg:text-[3.75rem] py-5 lg:py-20">
          Best Selling Books
        </h1>
        <div className="background-gradient py-20 ">
          <div className="w-[80%] mx-auto px-[5px] flex flex-wrap justify-center gap-6 mb-5">
            {bestSelling.length > 0 ? (
              bestSelling.map((item) => (
                <CardComponent
                  key={item.id}
                  id={item.id}
                  image={item.coverImg}
                  price={item.price}
                  title={item.title}
                  description={item.description}
                />
              ))
            ) : (
              <p className="text-[3.75rem] h-96 text-gray-400">No data</p>
            )}
          </div>
          {bestSelling.length > 0 && (
            <div className="mt-10">
              <ButtonComponent
                link="/home/best-salling"
                namebutton="Explore More"
              />
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section id="new-arrivals">
        <h1 className="w-[80%] mx-auto flex text-[#2BD7AD] font-bold text-2xl sm:text-4xl md:text-4xl lg:text-[3.75rem] py-5 lg:py-20">
          New Arrivals
        </h1>
        <div className="">
          <div className="w-[80%] mx-auto  flex flex-wrap justify-center gap-6 mb-5">
            {newArrivals.length > 0 ? (
              newArrivals.map((items) => (
                <>
                  <CardComponent
                    key={items.id}
                    id={items.id}
                    image={items.coverImg}
                    price={items.price}
                    title={items.title}
                    description={items.description}
                  />
                </>
              ))
            ) : (
              <p className="text-[3.75rem] h-96 text-gray-400">No data</p>
            )}
          </div>
          {newArrivals.length > 0 && (
            <>
              <div className="mt-10">
                <ButtonComponent
                  link="/home/new-arrivals"
                  namebutton="Explore More"
                />
              </div>
              <div className="flex items-center place-content-center">
                <div className="border-double border-b-4 border-[#292D77] w-40 mr-5"></div>
                <img src={bookglasses} alt="book-glasses" />
                <div className="border-double border-b-4 border-[#292D77] w-40 ml-5"></div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Feature Author */}
      <section id="feature-aurthor">
        <h1 className="w-[80%] mx-auto flex text-[#2BD7AD] font-bold text-2xl sm:text-4xl md:text-4xl lg:text-[3.75rem] py-5 lg:py-20">
          Feature Author
        </h1>
        <div className="bg-feature-author justify-center bg-black py-20">
          <div className="max-w-full px-[5px] sm:px-[20px] md:px-[150px] lg:px-[200px] xl:px-[250px] mb-5 mx-auto">
            {featureAuthor &&
              featureAuthor.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <div className="grid grid-cols-2 gap-6">
                  <Link to={`/authors/view/${item.authorid}`}>
                    <img
                      className="w-96 h-auto m-auto rounded-lg  hover:opacity-90"
                      src={item.authorimg}
                      alt="Author"
                    />
                    <p className="w-96 h-auto m-auto rounded-lg hover:opacity-90 p-2 py-2">
                      {item.authorquote}
                    </p>
                  </Link>
                  <div className="flex flex-col justify-between w-full pt-6">
                    <div className="items-start text-2xl rounded-lg">
                      <div className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-[#253C95] font-bold line-clamp-2 uppercase">
                        {item.authorname}
                      </div>
                      <p className="text-gray-500 line-clamp-3 text-sm md:text-base lg:text-lg mt-5">
                        {item.authordesc}
                      </p>
                    </div>
                    <div className="overflow-x-scroll flex mt-4 w-full gap-4 pt-6">
                      {item.authorbooks.map((book, index) => (
                        <div
                          key={index}
                          className="flex flex-no-wrap py-4 w-[100px] h-[150px] xl:w-[9.375rem] xl:h-[14.0625rem]"
                        >
                          <img
                            className="max-w-full max-h-full m-auto rounded-lg"
                            src={book}
                            alt={`Book ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            {!featureAuthor && (
              <div className="grid grid-cols-2 gap-6">
                <img
                  className="w-full h-full m-auto rounded-lg"
                  src={authorimg}
                  alt="Author"
                />
                <p className="text-[3.75rem] mt-10 flex items-center text-gray-400">
                  No data
                </p>
              </div>
            )}
          </div>
          <div className="mt-10">
            <ButtonComponent
              link="/authors"
              namebutton="Explore More"
            />
          </div>
        </div>
      </section>
      {/* Our Activities */}
      <section id="our-activities">
        <h1 className="w-[80%] mx-auto flex text-[#2BD7AD] font-bold text-2xl sm:text-4xl md:text-4xl lg:text-[3.75rem] py-5 lg:py-20">
          Our Activities
        </h1>
        <div className="pb-10">
          <div className="w-[80%] flex flex-wrap justify-center gap-6 mb-5 mx-auto">
            {news.length > 0 ? (
              news.map((news) => (
                <CardOurActivites
                  key={news.id}
                  image={news.image}
                  title={news.title}
                  description={news.description}
                />
              ))
            ) : (
              <p className="text-[3.75rem] h-96 text-gray-400">No data</p>
            )}
          </div>
        </div>
      </section>
      <CartPopup
        visible={open}
        confirmLoading={confirmLoading}
        cartId={cartId}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
};

export default HomeComponent;
