import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CopyToClipboard from "react-copy-to-clipboard";

function SurveyGenerator() {
  const user = useSelector(state => state.user);
  const navi = useNavigate();
  const [correct, setCorrect] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [gender, setGender] = useState(1);
  const [surveyLink, setSurveyLink] = useState("");
  const [resultLink, setResultLink] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");

  useEffect(() => {
    setGenerated(false);
    chkAdmin(user);
    // eslint-disable-next-line
  }, []);

  const chkAdmin = user => {
    setCorrect(false);
    setTimeout(() => {
      if (!user.admin) {
        alert("관리자 로그인이 필요합니다");
        navi("/adminlogin");
      } else {
        setCorrect(true);
      }
    }, 300);
  };

  const handleGenderRadio = e => {
    console.log(e.target.value);
    setGender(e.target.value);
  };

  const linkGenerate = () => {
    setGenerated(false);
    const selectedGender = gender === 0 ? "male" : "female";
    const serial = dayjs(new Date()).format("MMDDhhmmss");
    const surveyLink = `https://ikoreatm.com/basicsurvey?no=${serial}&gender=${selectedGender}`;
    const resultLink = `https://ikoreatm.com/printresult?no=${serial}`;
    setSurveyLink(surveyLink);
    setResultLink(resultLink);
    setGenerated(true);
  };

  const handleCopy = () => {
    setCopiedMessage("링크가 복사되었습니다!");
    setTimeout(() => {
      setCopiedMessage("");
    }, 2000);
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    p-3 bg-white rounded-lg min-w-1 min-h-1 drop-shadow-lg w-11/12 lg:w-2/6"
    >
      {correct ? (
        <div className="flex flex-col justify-start gap-y-4">
          <h2 className="text-lg">설문지 링크생성기</h2>
          <div className="grid grid-cols-2 gap-x-2">
            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 gap-x-2 px-4">
              <input
                id="bordered-radio-1"
                type="radio"
                value={0}
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={Number(gender) === 0}
                onChange={handleGenderRadio}
              />
              <label
                htmlFor="bordered-radio-1"
                className="w-full py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                남자
              </label>
            </div>
            <div className="flex items-center ps-4 px-4 border border-gray-200 rounded dark:border-gray-700  gap-x-2">
              <input
                id="bordered-radio-2"
                type="radio"
                value={1}
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={Number(gender) === 1}
                onChange={handleGenderRadio}
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                여자
              </label>
            </div>
          </div>
          <button
            className="p-2 bg-indigo-500 text-white"
            onClick={() => linkGenerate()}
          >
            생성하기
          </button>
          {generated ? (
            <div className="flex flex-col justify-start gap-y-4">
              <div className="">
                설문지 링크 :{" "}
                <CopyToClipboard text={surveyLink} onCopy={handleCopy}>
                  <span className="text-blue-600 cursor-pointer">
                    {surveyLink}
                  </span>
                </CopyToClipboard>
              </div>
              <div className="">
                결과지 링크 :{" "}
                <CopyToClipboard text={resultLink} onCopy={handleCopy}>
                  <span className="text-blue-600 cursor-pointer">
                    {resultLink}
                  </span>
                </CopyToClipboard>
              </div>
              {copiedMessage ? (
                <div className="text-green-500">{copiedMessage}</div>
              ) : (
                <div className="font-bold">
                  링크 url을 클릭하여 복사 후{" "}
                  <span className="text-rose-600">원하는 곳에 붙여넣기</span>{" "}
                  하세요
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              성별 확인 후 <strong>생성하기</strong> 버튼을 눌러주세요
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default SurveyGenerator;
