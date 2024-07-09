import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "../Loading";

function AfterList() {
  const user = useSelector(state => state.user);
  let navi = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [counter, setCounter] = useState(0);
  const [full, setFull] = useState(false);
  const [last, setLast] = useState(null);

  useEffect(() => {
    chkAdmin(user);
    getList(1);
    // eslint-disable-next-line
  }, []);

  //리스트 최초호출
  const getList = async e => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "after"), orderBy("created", "desc"), limit(10))
      );
      let list = [];
      querySnapshot.forEach(doc => {
        console.log(doc);
        console.log("?");
        list.push(doc.data());
      });
      console.log(list);
      let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLast(lastVisible);
      setSurveys(list);
      setIsLoading(true);
      setCounter(10);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  //리스트 추가호출
  const getMoreList = async e => {
    const moreSnapshot = await getDocs(
      query(
        collection(db, "after"),
        orderBy("created", "desc"),
        startAfter(last),
        limit(5)
      )
    );
    let list = surveys;
    moreSnapshot.forEach(doc => {
      list.push(doc.data());
    });

    let lastVisible;
    if (moreSnapshot.docs.length === 0) {
      lastVisible = -1;
      setFull(true);
      return alert("모든 리스트를 불러왔습니다");
    } else {
      lastVisible = moreSnapshot.docs[moreSnapshot.docs.length - 1];
      setFull(false);
    }
    setSurveys(list);
    setLast(lastVisible);
    setIsLoading(true);
    setCounter(counter + 5);
  };

  const chkAdmin = user => {
    setTimeout(() => {
      if (!user.admin) {
        alert("관리자 로그인이 필요합니다");
        navi("/adminlogin");
      } else {
        setCorrect(true);
      }
    }, 1000);
  };

  return (
    <>
      {!isLoading ? (
        <Loading />
      ) : (
        <>
          {!correct ? (
            <Loading />
          ) : (
            <>
              {surveys.length >= 1 ? (
                <>
                  <div className="container mx-auto flex justify-around bg-white p-2 mb-2 rounded-xl drop-shadow-xl">
                    <h2 className="text-3xl font-medium mb-2 p-2 text-center text-indigo-900 basis-2/4">
                      KoTI설문지 리스트
                    </h2>
                    <div
                      id="sortArea"
                      className="basis-2/4 text-center my-auto flex flex-col"
                    ></div>
                  </div>
                  <div className="bg-white container mx-auto py-3 my-2 flex flex-wrap justify-start items-start rounded-xl drop-shadow-xl">
                    {surveys.map((s, idx) => (
                      <div
                        className="max-w-1/4 h-auto p-3 m-3 bg-white transition-all duration-300 hover:scale-110 hover:bg-indigo-300 hover:rounded-lg border"
                        key={idx}
                      >
                        <Link
                          to={"/after?alias=" + s.surveyId}
                          className="flex flex-col gap-2"
                        >
                          <div className="text-base">
                            지점명 : {s.comName ? s.comName : "테스터"}
                          </div>
                          <div className="text-base">
                            고객사번호 : {s.surveyId ? s.surveyId : "0000"}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <>
                    {!full ? (
                      <button
                        className="block mx-auto bg-white border-2 rounded-full hover:cursor-pointer hover:bg-gray-200 p-3 text-sm"
                        onClick={e => {
                          getMoreList(counter);
                        }}
                      >
                        더보기
                      </button>
                    ) : null}
                  </>
                </>
              ) : (
                "로딩에 실패했습니다, 새로고침 후에도 실패할 경우 관리자에 문의하여주세요"
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default AfterList;
