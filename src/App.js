import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice";
import { db, auth } from "./firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Helmet } from "react-helmet-async";

import ToTop from "./Component/ToTop";
import Bg from "./Component/Bg";
import Complete from "./Component/Complete";
import SurveySample from "./Component/SurveySample";
import BasicSurvey from "./Component/BasicSurvey";
import PaperSurvey from "./Component/PaperSurvey";
import Survey from "./Component/Survey";
import SurveyList from "./Component/SurveyList";
import Result from "./Component/Result";
import Error from "./Component/Error";
import Meeting from "./Component/Meeting";
import Meet from "./Component/Meet";
import Test from "./Component/Test";
import AdminRegist from "./Component/AdminRegist";
import AdminLogin from "./Component/AdminLogin";
import Logout from "./Component/Logout";
import InputVisit from "./Component/visit/InputVisit";
import BeforeVisit from "./Component/visit/BeforeVisit";
import VisitInfo from "./Component/visit/VisitInfo";
import VisittoAdmin from "./Component/visit/VisittoAdmin";
import Loading from "./Component/Loading";
import Tv from "./Component/Tv";
import After from "./Component/visit/After";
import InputAfter from "./Component/visit/InputAfter";
import Subscribe from "./Component/Profile/Subscribe";
import SubList from "./Component/Profile/SubList";
import SubDetail from "./Component/Profile/SubDetail";
import SubscribeGenerator from "./Component/Profile/SubscribeGenerator";
import Admin from "./Component/AdminBeta/Admin";
import GiftAdmin from "./Component/GiftAdmin/GiftAdmin";
import GiftAdminMain from "./Component/GiftAdmin/Main";
import CompanySurvey from "./Component/Company/CompanySurvey";
import LinkGen from "./Component/Company/LinkGen";
import Main from "./Component/Homepage/Main";
import YourComponent from "./Component/Company/YourComponent";
import Home from "./Component/Homepage/Home";
import Redirect from "./Component/Homepage/Redirect";
import Intro from "./Component/Homepage/Intro";
import Consulting from "./Component/Homepage/Consulting";
import Marketing from "./Component/Homepage/Marketing";
import History from "./Component/Homepage/History";
import AddGallery from "./Component/GiftAdmin/AddGallery";
import Gallery from "./Component/Homepage/Gallery";
import GalleryDetail from "./Component/Homepage/GalleryDetail";
import Gallery1 from "./Component/Homepage/Gallery1";
import Gallery2 from "./Component/Homepage/Gallery2";
import ERR404 from "./Component/Homepage/Mobile/ERR404";
import Mobile from "./Component/Homepage/Mobile/Mobile";
import MobileMain from "./Component/Homepage/Mobile/Main";
import MobileGallery from "./Component/Homepage/Mobile/Gallery";
import MobileGallery1 from "./Component/Homepage/Mobile/Gallery1";
import MobileGallery2 from "./Component/Homepage/Mobile/Gallery2";
import MobileIntro from "./Component/Homepage/Mobile/Intro";
import MobileConsulting from "./Component/Homepage/Mobile/Consulting";
import MobileMarketing from "./Component/Homepage/Mobile/Marketing";
import MobileHistory from "./Component/Homepage/Mobile/History";
import MobileGalleryDetail from "./Component/Homepage/Mobile/GalleryDetail";
import SurveyDelete from "./Component/SurveyDelete";
import AfterList from "./Component/visit/AfterList";
import SurveyGenerator from "./Component/SurveyGenerator";
import PrintResult from "./Component/PrintResult";

function App() {
  const navi = useNavigate();
  const [loginChk, setLoginChk] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user !== null) {
        getAdmin(user);
      } else {
        dispatch(clearUser());
      }
    });
    setLoginChk(true);
    // eslint-disable-next-line
  }, [dispatch]);

  const thisLocation = useLocation();

  useEffect(() => {
    const chkMobile = location => {
      const userAgent = navigator.userAgent;
      const isMobileDevice =
        /Mobi/i.test(userAgent) || /Android/i.test(userAgent);
      if (isMobileDevice && location === "home") {
        navi("/mobile");
      } else if (!isMobileDevice && location === "mobile") {
        navi("/home");
      }
    };

    const result1 = thisLocation.pathname.includes("/home");
    const result2 = thisLocation.pathname.includes("/mobile");
    if (result1) {
      chkMobile("home");
    } else if (result2) {
      chkMobile("mobile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisLocation, navi]); // Make sure navi is also in the dependency array if it's a function from props or context.

  const getAdmin = async user => {
    if (user.displayName !== "admin") {
      if (user.uid !== "") {
        let applyRef = collection(db, "apply");
        let result = await getDoc(doc(applyRef, `${user.uid}`));
        if (!result.data()) {
          dispatch(
            loginUser({
              uid: user.uid,
              accessToken: user.accessToken,
              admin: false,
              name: "",
              point: 0,
              phone: "",
            })
          );
        } else {
          dispatch(
            loginUser({
              uid: user.uid,
              accessToken: user.accessToken,
              admin: false,
              name: result.data().name,
              point: result.data().point,
              phone: result.data().phone,
            })
          );
        }
      }
    } else {
      if (user.uid !== "") {
        let applyRef = collection(db, "admin");
        let result = await getDoc(doc(applyRef, `${user.uid}`));
        dispatch(
          loginUser({
            uid: user.uid,
            accessToken: user.accessToken,
            admin: true,
            name: result.data().name,
            point: 0,
            phone: 0,
          })
        );
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>채용 No.1! 코리아티엠</title>
      </Helmet>
      {!loginChk ? (
        <Loading />
      ) : (
        <>
          <Bg />
          <Routes>
            <Route path="/" element={<Redirect />} />
            <Route path="/home" element={<Home />}>
              <Route path="" element={<Main />} />
              <Route path="intro" element={<Intro />} />
              <Route path="consulting" element={<Consulting />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="history" element={<History />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="gallery1" element={<Gallery1 />} />
              <Route path="gallery2" element={<Gallery2 />} />
              <Route path="gallerydetail" element={<GalleryDetail />} />
            </Route>
            <Route path="/mobile" element={<Mobile />}>
              <Route path="" element={<MobileMain />} />
              <Route path="err" element={<ERR404 />} />
              <Route path="intro" element={<MobileIntro />} />
              <Route path="consulting" element={<MobileConsulting />} />
              <Route path="marketing" element={<MobileMarketing />} />
              <Route path="history" element={<MobileHistory />} />
              <Route path="gallery" element={<MobileGallery />} />
              <Route path="gallery1" element={<MobileGallery1 />} />
              <Route path="gallery2" element={<MobileGallery2 />} />
              <Route path="gallerydetail" element={<MobileGalleryDetail />} />
            </Route>
            <Route path="/tv" element={<Tv />} />
            <Route path="/test" element={<Test />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/complete" element={<Complete />} />
            <Route path="/surveysample" element={<SurveySample />} />
            <Route path="/basicsurvey" element={<BasicSurvey />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/surveylist" element={<SurveyList />} />
            <Route path="/surveydelete" element={<SurveyDelete />} />
            <Route path="/surveylink" element={<SurveyGenerator />} />
            <Route path="/result" element={<Result />} />
            <Route path="/printresult" element={<PrintResult />} />
            <Route path="/papersurvey" element={<PaperSurvey />} />
            <Route path="/error" element={<Error />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/meet" element={<Meet />} />
            <Route path="/after" element={<After />} />
            <Route path="/afterlist" element={<AfterList />} />
            <Route path="/inputafter" element={<InputAfter />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/getdb" element={<YourComponent />} />
            <Route path="/companylinkgen" element={<LinkGen />} />
            <Route
              path="/companysurvey/:cno?/:type?"
              element={<CompanySurvey />}
            />
            <Route path="/inputvisit" element={<InputVisit />} />
            <Route path="/beforevisit" element={<BeforeVisit />} />
            <Route path="/visit/:aliasNum?" element={<VisitInfo />} />
            <Route path="/visitadmin/:aliasNum?" element={<VisittoAdmin />} />
            <Route path="/admin" element={<GiftAdmin />}>
              <Route path="" element={<GiftAdminMain />} />
              <Route path="sublist" element={<SubList />} />
              <Route path="surveylist" element={<SurveyList />} />
              <Route path="addgallery" element={<AddGallery />} />
            </Route>
            <Route path="/adminregist" element={<AdminRegist />} />
            <Route path="/subscribe/:alias?" element={<Subscribe />} />
            <Route path="/subdetail/:alias?" element={<SubDetail />} />
            <Route
              path="/subscribegenerator"
              element={<SubscribeGenerator />}
            />
            <Route path="/sublist" element={<SubList />} />
            <Route path="/macbook" element={<Admin />} />
          </Routes>
          <ToTop />
        </>
      )}
    </>
  );
}

export default App;
