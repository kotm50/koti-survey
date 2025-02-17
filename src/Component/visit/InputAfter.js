import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useSearchParams } from "react-router-dom";

import dayjs from "dayjs";

function InputAfter() {
  let now = dayjs();
  const navi = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [alias, setAlias] = useState("");
  const [type, setType] = useState("");
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [ansLength, setAnsLength] = useState([]);
  const [comName, setComName] = useState("");

  useEffect(() => {
    setAliasNum();
    setTyper();
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `코티만족도조사`;
    // eslint-disable-next-line
  }, []);

  const setAliasNum = () => {
    const aliasNum = searchParams.get("alias");
    const comName = searchParams.get("comName");
    setSearchParams(searchParams);
    setAlias(aliasNum ? aliasNum : "999999");
    setComName(comName ? comName : "테스트");
  };

  const setTyper = () => {
    const type = "after";
    setSearchParams(searchParams);
    if (type !== null || type !== undefined || type !== "") {
      setType(type);
      getQuestion(type);
    }
  };

  const getQuestion = async t => {
    const querySnapshot = await getDocs(collection(db, "meeting"));
    let titles = [];
    querySnapshot.forEach(doc => {
      titles.push(doc.data());
    });
    let list = [];
    let question1 = [];
    let question2 = [];
    let question3 = [];
    let body = {};
    const qRef1 = await getDocs(collection(db, "meeting", t, "question1"));
    qRef1.forEach(doc => {
      question1.push(doc.data());
    });
    body = {
      title: titles[0].title1,
      question: question1,
    };
    list.push(body);
    const qRef2 = await getDocs(collection(db, "meeting", t, "question2"));
    qRef2.forEach(doc => {
      question2.push(doc.data());
    });
    body = {
      title: titles[0].title2,
      question: question2,
    };
    list.push(body);
    const qRef3 = await getDocs(collection(db, "meeting", t, "question3"));
    qRef3.forEach(doc => {
      question3.push(doc.data());
    });
    body = {
      title: titles[0].title3,
      question: question3,
    };
    list.push(body);
    setQuestion(list);
  };

  const answerHandler = (e, c, t) => {
    let ansarr = answers;
    let index = ansarr.findIndex(e => e.question === c);
    if (index !== -1) {
      ansarr[index].answer = e;
    } else {
      ansarr.push({
        question: c,
        answer: e,
        type: t,
      });
    }
    if (e === "") {
      ansarr = ansarr.filter(e => e.question !== c);
    }
    setAnswers(ansarr);
    setAnsLength(answers.length);
  };

  const checkedHandler = (e, s, t, q) => {
    let ansarr = answers;
    let isChecked = e.currentTarget.checked;
    let chkValue = e.currentTarget.value;
    let chkarr = {};
    let chkIndex = ansarr.findIndex(ans => ans.id === s);
    if (chkIndex !== -1) {
      chkarr = ansarr[chkIndex];
    } else {
      chkarr = { id: s, selected: [], type: t, question: q };
    }
    if (isChecked) {
      chkarr.selected.push(chkValue);
      if (chkIndex === -1) {
        ansarr.push(chkarr);
      } else {
        ansarr[chkIndex] = chkarr;
      }
    } else {
      chkarr.selected = chkarr.selected.filter(chk => chk !== chkValue);
      ansarr[chkIndex] = chkarr;
      if (chkarr.selected.length === 0) {
        ansarr = ansarr.filter(ans => ans.id !== s);
      }
    }
    setAnswers(ansarr);
    setAnsLength(ansarr.length);
  };

  const surveySubmit = async () => {
    let today = now.format("YYMMDD");
    let body = {
      comName: comName,
      surveyId: Number(alias),
      answers: answers,
      meetType: type,
      date: today,
      created: serverTimestamp(),
    };
    let submit = window.confirm(`설문지를 제출합니다. 진행할까요?`);
    if (submit) {
      const meetRef = collection(db, "after");
      await setDoc(doc(meetRef, `${alias}`), body);
      alert(`제출이 완료되었습니다, 이용해주셔서 감사합니다`);
      navi("/complete?b=after");
    }
  };

  return (
    <>
      <div className="container mx-auto mb-5">
        {question.length > 0 &&
          question.map((q, idx) => (
            <div
              className="bg-white mx-auto p-3 rounded mb-5 shadow-lg"
              key={idx}
            >
              <h2 className="lg:text-xl font-medium">{q.title}</h2>
              {q.question.map((u, idx) => (
                <div
                  className={
                    u.id === "question5-1"
                      ? "bg-white p-2 rounded drop-shadow-md my-2"
                      : u.type !== "textarea"
                      ? "bg-white p-2 rounded drop-shadow-md my-2"
                      : "bg-white p-2 rounded drop-shadow-md mt-2 mb-10"
                  }
                  key={idx}
                >
                  {u.id === "question5-1" ? null : (
                    <div
                      className={
                        u.type !== "textarea"
                          ? "p-2 bg-gray-100 font-medium text-sm lg:text-lg"
                          : "p-2 bg-gray-100 font-normal text-sm lg:text-lg"
                      }
                    >
                      {u.type !== "textarea" && (
                        <span className="font-bold">
                          {u.no}
                          {". "}
                        </span>
                      )}
                      {u.question}
                    </div>
                  )}
                  <div>
                    {u.type === "textarea" && (
                      <textarea
                        className="block bg-teal-50 w-full border p-2 mt-2 h-20"
                        placeholder="여기에 입력해 주세요"
                        onBlur={e =>
                          answerHandler(
                            e.currentTarget.value,
                            u.question,
                            u.type,
                            u.id
                          )
                        }
                      />
                    )}
                    {u.type === "radio" && (
                      <div
                        className={`flex ${
                          u.long
                            ? "flex-col lg:flex-row gap-x-2 gap-y-2"
                            : "flex-row gap-x-2"
                        } flex-wrap mt-2`}
                      >
                        {u.answer.map((ans, idx) => (
                          <div className="border rounded" key={idx}>
                            <input
                              type="radio"
                              value={ans}
                              id={u.id + idx + q.id}
                              name={u.id}
                              className="peer hidden"
                              onClick={e =>
                                answerHandler(
                                  e.currentTarget.value,
                                  u.question,
                                  u.type,
                                  u.id,
                                  idx
                                )
                              }
                            />
                            <label
                              htmlFor={u.id + idx + q.id}
                              className="block transition duration-150 p-2 text-sm text-center ease-in-out rounded lg:text-base bg-teal-50 text-stone-900  peer-checked:text-white peer-checked:bg-blue-500"
                            >
                              {ans}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    {u.type === "checkbox" && (
                      <div className="flex flex-col lg:flex-row flex-wrap gap-3 mt-2">
                        {u.answer.map((ans, idx) => (
                          <div className="border rounded" key={idx}>
                            <input
                              type="checkbox"
                              value={ans}
                              id={u.id + idx}
                              name={u.id}
                              className="peer hidden"
                              onClick={e =>
                                checkedHandler(e, u.id, u.type, u.question, idx)
                              }
                            />
                            <label
                              htmlFor={u.id + idx}
                              className="block transition duration-150 md:p-2 text-sm py-2 text-center ease-in-out rounded lg:text-base bg-teal-50 text-stone-900  peer-checked:text-white peer-checked:bg-blue-500"
                            >
                              {ans}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
      {question.length > 0 && (
        <div className="container mx-auto mb-16">
          <div className="bg-white text-center p-2 xl:text-xl font-medium rounded-lg">
            귀중한 시간내어 설문에 응해주셔서 감사합니다.
            <br />더 나은 서비스로 발전하는 코리아티엠이 되겠습니다.
          </div>
        </div>
      )}
      {ansLength > 0 && (
        <div className="fixed bottom-0 left-0 right-0 w-full p-2 mt-3 text-center bg-white border-t border-gray-300">
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

export default InputAfter;
