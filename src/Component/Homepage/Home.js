import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import RenewalModal from "./RenewalModal";
import RenewalModal2 from "./RenewalModal2";

function Home() {
  const thisLocation = useLocation();
  useEffect(() => {
    // location이 바뀔 때마다 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, [thisLocation]);
  return (
    <>
      <Header />
      <RenewalModal />
      <RenewalModal2 />
      <Outlet />
      <Footer />
    </>
  );
}

export default Home;
