import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";

import InputCard from "./InputCard";
import Error from "../Error";

import dayjs from "dayjs";
import Agree from "./Agree";

function BasicSurvey() {
  const { cno, type } = useParams();
  let navi = useNavigate();
  //const [cNum, setCNum] = useState("");
  const [survey, setSurvey] = useState([]);
  const [reqSurvey, setReqSurvey] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [agree, setAgree] = useState(false);
  const [reqAnswers, setReqAnswers] = useState([]);
  const [photo0, setPhoto0] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photoTask0, setPhotoTask0] = useState("");
  const [photoTask1, setPhotoTask1] = useState("");
  const [photoTask2, setPhotoTask2] = useState("");
  const [photoTask3, setPhotoTask3] = useState("");
  const [profile, setProfile] = useState([]);
  const [ansLength, setAnsLength] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getResult = async () => {
    console.log(type);
    let querySnapshot;
    if (type === "1") {
      querySnapshot = await getDocs(collection(db, "cs1"));
    }
    let list = [];
    let req = [];
    querySnapshot.forEach(doc => {
      if (doc.data().req) {
        req.push(doc.data());
      }
      list.push(doc.data());
    });
    setReqSurvey(req);
    setSurvey(list);
    const load = setTimeout(() => {
      setLoading(true);
      clearInterval(load);
    }, 1000);
  };

  useEffect(() => {
    if (cno === null || type === null) {
      alert("오류가 발생했습니다. 관리자에게 문의해주세요");
      setError(true);
    }
    getResult();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    let body = profile;
    if (photo0 !== "") {
      body.photo0 = photo0;
    } else {
      body.photo0 = "";
    }
    if (photo1 !== "") {
      body.photo1 = photo1;
    } else {
      body.photo1 = "";
    }
    if (photo2 !== "") {
      body.photo2 = photo2;
    } else {
      body.photo2 = "";
    }
    if (photo3 !== "") {
      body.photo3 = photo3;
    } else {
      body.photo3 = "";
    }
    setProfile(body);
    // eslint-disable-next-line
  }, [photo0, photo1, photo2, photo3]);

  //답변핸들러 백업
  /*
  const answerHandler = (e, c, b) => {
    let ansarr = answers;
    let reqarr = reqAnswers;
    let index = ansarr.findIndex(e => e.question === c);
    console.log(index);
    if (index !== -1) {
      ansarr[index].answer = e;
      if (b) {
        reqarr[index].answer = e;
      }
    } else {
      ansarr.push({
        question: c,
        answer: e,
      });
      if (b) {
        reqarr.push({
          question: c,
          answer: e,
        });
      }
    }
    setReqAnswers(reqarr);
    setAnswers(ansarr);
    setAnsLength(answers.length);
  };
  */

  const answerHandler = (e, c, b) => {
    let ansarr = answers.slice(); // 복사본을 만들어야 합니다.
    let reqarr = reqAnswers.slice(); // 복사본을 만들어야 합니다.
    let index = ansarr.findIndex(item => item.question === c);

    if (e === "") {
      if (index !== -1) {
        ansarr.splice(index, 1); // 해당 인덱스의 항목 삭제
        if (b) {
          let reqIndex = reqarr.findIndex(item => item.question === c);
          reqarr.splice(reqIndex, 1); // reqarr에서도 해당 인덱스의 항목 삭제
        }
      }
    } else {
      if (index !== -1) {
        ansarr[index].answer = e;
        if (b) {
          reqarr[index].answer = e;
        }
      } else {
        ansarr.push({
          question: c,
          answer: e,
        });
        if (b) {
          reqarr.push({
            question: c,
            answer: e,
          });
        }
      }
    }
    setReqAnswers(reqarr);
    setAnswers(ansarr);
    setAnsLength(ansarr.length);
  };

  //체크핸들러 백업
  /*
  const checkHandler = (isChecked, value, questionId) => {
    setAnswers(prevAnswers => {
      let updatedAnswers;
      const index = prevAnswers.findIndex(ans => ans.question === questionId);

      if (index !== -1) {
        // 이미 해당 질문에 대한 답변이 있는 경우
        updatedAnswers = [...prevAnswers];
        if (isChecked) {
          // 체크박스가 선택된 경우, 답변 추가
          updatedAnswers[index].answer.push(value);
        } else {
          // 체크박스가 해제된 경우, 답변 삭제
          updatedAnswers[index].answer = updatedAnswers[index].answer.filter(
            ans => ans !== value
          );
          if (updatedAnswers[index].answer.length === 0) {
            // 답변이 없어진 경우, 해당 질문의 답변 삭제
            updatedAnswers.splice(index, 1);
          }
        }
      } else {
        // 해당 질문에 대한 답변이 없는 경우
        if (isChecked) {
          // 체크박스가 선택된 경우, 새로운 답변 추가
          updatedAnswers = [
            ...prevAnswers,
            {
              question: questionId,
              answer: [value],
            },
          ];
        } else {
          // 체크박스가 해제된 경우, 아무 작업 필요 없음
          updatedAnswers = [...prevAnswers];
        }
      }

      console.log("Updated Answers:", updatedAnswers); // 중간 값 확인

      setAnsLength(updatedAnswers.length);
      return updatedAnswers;
    });
  };
  */

  const checkHandler = (isChecked, value, questionId, isRequired) => {
    setAnswers(prevAnswers => {
      let updatedAnswers;
      let updatedReqAnswers;
      const index = prevAnswers.findIndex(ans => ans.question === questionId);

      if (index !== -1) {
        // 이미 해당 질문에 대한 답변이 있는 경우
        updatedAnswers = [...prevAnswers];
        if (isChecked) {
          // 체크박스가 선택된 경우, 답변 추가
          updatedAnswers[index].answer.push(value);
        } else {
          // 체크박스가 해제된 경우, 답변 삭제
          updatedAnswers[index].answer = updatedAnswers[index].answer.filter(
            ans => ans !== value
          );
          if (updatedAnswers[index].answer.length === 0) {
            // 답변이 없어진 경우, 해당 질문의 답변 삭제
            updatedAnswers.splice(index, 1);
          }
        }
      } else {
        // 해당 질문에 대한 답변이 없는 경우
        if (isChecked) {
          // 체크박스가 선택된 경우, 새로운 답변 추가
          updatedAnswers = [
            ...prevAnswers,
            {
              question: questionId,
              answer: [value],
            },
          ];
        } else {
          // 체크박스가 해제된 경우, 아무 작업 필요 없음
          updatedAnswers = [...prevAnswers];
        }
      }

      if (isRequired) {
        if (isChecked) {
          // sur.req가 true이고 체크박스가 선택된 경우, reqAnswers에도 추가
          updatedReqAnswers = updatedAnswers;
        } else {
          // sur.req가 true이고 체크박스가 해제된 경우, reqAnswers에서 삭제
          updatedReqAnswers = updatedAnswers.filter(
            ans => ans.question !== questionId
          );
        }
        setReqAnswers(updatedReqAnswers);
      }

      console.log("Updated Answers:", updatedAnswers); // 중간 값 확인

      setAnsLength(updatedAnswers.length);
      return updatedAnswers;
    });
  };

  const surveySubmit = async () => {
    if (!agree) {
      return alert("개인정보 수집 및 이용에 동의해 주세요");
    }
    if (reqSurvey.length > reqAnswers.length) {
      return alert("아직 답변하지 않은 필수 문항이 있습니다. 확인해주세요");
    }
    for (let i = 0; i < reqAnswers.length - 1; i++) {
      if (reqAnswers[i].answer === "") {
        return alert("아직 답변하지 않은 필수 문항이 있습니다. 확인해주세요");
      }
    }
    let now = dayjs().format("YYYY-MM-DD");
    let body = {
      surveyId: `${cno}_${now}`,
      pw: `company_${type}`,
      profile: profile,
      answers: answers,
      date: now,
      cno: cno,
      created: serverTimestamp(),
    };
    const surveyRef = collection(db, "companysurvey");
    await setDoc(doc(surveyRef, `${cno}_${now}`), body);
    alert(`제출이 완료되었습니다, 작성해주셔서 감사합니다`);
    navi("/complete?b=basic");
  };
  /*
  const signIn = async n => {
    let body = {
      surveyId: no,
      name: profile.name,
      id: phone,
      password: phone,
      admin: false,
      created: serverTimestamp(),
    };
    const applyRef = collection(db, "apply");
    await setDoc(doc(applyRef, `${phone}`), body);
  };
  */

  return (
    <>
      {error && <Error />}
      {!loading ? (
        <div className="w-11/12 lg:container mx-auto mb-28 flex flex-col justify-center">
          <div className="bg-white p-3">
            로딩중 입니다. 잠시만 기다려 주세요...
          </div>
        </div>
      ) : (
        <div className="w-11/12 lg:container mx-auto mb-28">
          <div className="bg-white p-2 rounded drop-shadow-lg my-2">
            <h1 className="text-3xl font-bold text-center my-2">
              코리아티엠 고객사 <br className="xl:hidden" />
              정보입력 페이지
            </h1>
            <div className="text-left">
              <span className="text-red-500">*</span>는 필수입력 항목입니다
            </div>
          </div>
          <>
            {survey &&
              survey.map((sur, idx) => (
                <div key={idx}>
                  {sur.title && (
                    <h2 className="text-white text-2xl font-bold mt-5">
                      {sur.title}
                    </h2>
                  )}

                  <div className="bg-white p-2 rounded drop-shadow-lg my-2">
                    <div className="text-lg">
                      {idx + 1}. {sur.question}{" "}
                      {sur.req && <span className="text-red-500">* </span>}
                      {sur.type === "checkbox" && (
                        <span className="text-red-500">(중복선택가능)</span>
                      )}
                      {sur.sub && (
                        <span className="text-sm hidden xl:inline">
                          ({sur.sub})
                        </span>
                      )}
                    </div>
                    {sur.answer.length > 1 ? (
                      <div className="flex flex-col lg:flex-row flex-wrap gap-3 mt-2">
                        {sur.type === "radio" ? (
                          <>
                            {sur.answer.map((ans, idx) => (
                              <div className="border rounded" key={idx}>
                                <input
                                  type="radio"
                                  value={ans}
                                  id={sur.id + idx}
                                  name={sur.id}
                                  className="peer hidden"
                                  onClick={e =>
                                    answerHandler(
                                      e.currentTarget.value,
                                      sur.id,
                                      sur.req
                                    )
                                  }
                                />
                                <label
                                  htmlFor={sur.id + idx}
                                  className="block transition duration-150 md:p-2 text-sm py-2 text-center ease-in-out rounded lg:text-base xl:text-lg bg-teal-50 text-stone-900  peer-checked:text-white peer-checked:bg-blue-500"
                                >
                                  {ans}
                                </label>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            {sur.answer.map((ans, idx) => (
                              <div className="border rounded" key={idx}>
                                <input
                                  type="checkbox"
                                  value={ans}
                                  id={String(sur.id + idx)}
                                  name={sur.id}
                                  className="peer hidden"
                                  onClick={e =>
                                    checkHandler(
                                      e.currentTarget.checked,
                                      ans,
                                      sur.id,
                                      sur.req
                                    )
                                  }
                                />
                                <label
                                  htmlFor={sur.id + idx}
                                  className="block transition duration-150 md:p-2 text-sm py-2 text-center ease-in-out rounded lg:text-base xl:text-lg bg-teal-50 text-stone-900  peer-checked:text-white peer-checked:bg-blue-500"
                                >
                                  {ans}
                                </label>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="block bg-teal-50 w-full border p-2 mt-2"
                        placeholder="주관식 문항입니다"
                        onBlur={e =>
                          answerHandler(e.currentTarget.value, sur.id, sur.req)
                        }
                      />
                    )}

                    {sur.sub && (
                      <div className="text-sm xl:hidden mt-2">({sur.sub})</div>
                    )}
                  </div>
                </div>
              ))}

            <div className="bg-white p-2 rounded drop-shadow-lg mb-2 mt-5">
              <div className="text-lg border-b pb-3 mb-3">
                면접담당자의 사진을 올려주세요
              </div>
              <InputCard
                no={0}
                cno={cno}
                photo={photo0}
                setPhoto={setPhoto0}
                photoTask={photoTask0}
                setPhotoTask={setPhotoTask0}
              />
            </div>
            <div className="bg-white p-2 rounded drop-shadow-lg my-2 grid grid-cols-1 gap-y-3">
              <div className="text-lg border-b pb-3">
                회사의 사진을 올려주세요 <br className="xl:hidden" />
                <span className="text-sm">(최대 3장까지)</span>
              </div>
              <InputCard
                no={1}
                cno={cno}
                photo={photo1}
                setPhoto={setPhoto1}
                photoTask={photoTask1}
                setPhotoTask={setPhotoTask1}
              />
              <InputCard
                no={2}
                cno={cno}
                photo={photo2}
                setPhoto={setPhoto2}
                photoTask={photoTask2}
                setPhotoTask={setPhotoTask2}
              />
              <InputCard
                no={3}
                cno={cno}
                photo={photo3}
                setPhoto={setPhoto3}
                photoTask={photoTask3}
                setPhotoTask={setPhotoTask3}
              />
            </div>
            <div className="mt-5 p-2 bg-white rounded drop-shadow-lg">
              <Agree agree={agree} setAgree={setAgree} survey={survey} />
            </div>
          </>
        </div>
      )}
      {ansLength > 0 && (
        <div className="fixed bottom-0 left-0 right-0 w-full p-2 mt-3 text-center bg-white border-t border-gray-300">
          <div className="mb-1">
            현재까지 답변한 문항 전체 :
            <span className="font-bold text-lg text-indigo-600">
              {answers.length} / {survey.length}
            </span>{" "}
            필수 :
            <span className="font-bold text-lg text-red-500">
              {reqAnswers.length} / {reqSurvey.length}
            </span>
          </div>
          <button
            className="block w-11/12 lg:container mx-auto rounded p-2 text-white bg-indigo-500 hover:bg-indigo-700"
            onClick={e => surveySubmit()}
          >
            저장하기
          </button>
        </div>
      )}
    </>
  );
}

export default BasicSurvey;
