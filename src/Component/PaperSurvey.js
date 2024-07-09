import React from "react";

function PaperSurvey() {
  return (
    <div className="flex flex-col justify-start gap-y-5 mt-2">
      <div
        id="capture1"
        className="a4page bg-white mx-auto p-[5mm] flex flex-col justify-start gap-y-4 overflow-hidden"
      >
        <div className="text-right">면접일시 : 20___ . ___ . ___</div>
        <h1 className="text-5xl text-center font-bold">
          코리아티엠 면접질의서
        </h1>
        <div className="text-center">
          당사에 지원해 주셔서 진심으로 감사드립니다
          <br />본 질의서는{" "}
          <span className="underline">
            원활한 면접진행을 위해서 필요하오니
          </span>{" "}
          성실히 작성해 주시기 바랍니다.
        </div>
        <div>
          <h2 className="surveyheading font-bold text-xl">기본 인적사항</h2>
          <table className="w-full table-auto text-xs border-collapse">
            <tr>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                이름
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500 text-white bg-white">
                홍길동
              </td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                생년월일
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500 text-white bg-white">
                2000.00.00
              </td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                지원부서
              </th>
              <td className="text-sm p-2 align-middle text-gray-400 border border-gray-500 text-center">
                운영지원 / 잡매니저 / 직영관리
                <br /> 디자이너 / CS / 기타
              </td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                지원
                <br />
                사이트
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500  bg-white text-white">
                잡코리아
              </td>
            </tr>
            <tr>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                연락처
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500 "></td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                현재
                <br />
                주소지
              </th>
              <td
                className="text-lg align-middle border border-gray-500"
                colSpan={3}
              ></td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                혈액형
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500"></td>
            </tr>
            <tr>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                최종학력
              </th>
              <td className="text-sm p-2 align-middle border border-gray-500 text-right bg-white text-white">
                고등학교 <span className="text-black">졸업</span>
              </td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                결혼여부
              </th>
              <td className="text-sm p-2 align-middle border border-gray-500 text-gray-400 text-center">
                기혼 / 미혼
              </td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                출근
                <br />
                가능일
              </th>
              <td className="p-2 text-lg align-middle text-gray-400 border border-gray-500 w-[32%] text-center"></td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                통근
                <br />
                소요시간
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500"></td>
            </tr>
          </table>
        </div>
        <div>
          <h2 className="surveyheading font-bold text-xl">
            주요 경력사항{" "}
            <span className="font-normal text-sm">
              (*제출한 이력서에 정확히 기재되어 있다면 작성하지 않아도 됩니다)
            </span>
          </h2>
          <table className="w-full table-auto text-xs border-collapse">
            <thead>
              <tr>
                <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle w-[15%]">
                  회사명
                </th>
                <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle w-[20%]">
                  재직기간
                </th>
                <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle w-[20%]">
                  담당업무
                </th>
                <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle ">
                  직책
                </th>
                <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle w-[15%]">
                  급여수준
                </th>
                <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle w-[15%]">
                  퇴사사유
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-center">
                  ~
                </td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
              </tr>
              <tr>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-center">
                  ~
                </td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
              </tr>
              <tr>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-center">
                  ~
                </td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
                <td className="p-2 align-middle border border-gray-500  bg-white text-white"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="surveyheading font-bold text-xl">질의 내용</h2>
        <ol className="flex flex-col justify-start gap-y-4">
          <li className="indent-5">
            <h3 className="font-medium">
              1. 당사 입사후 1년뒤에 본인은 어떤 모습일까요?
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium indent-5 mb-2">
              2. 회사를 선택할 때 가장 고려하는 점은 (복수 선택가능)
            </h3>
            <ul className="min-h-[10mm] grid grid-cols-3 gap-x-4 pl-6">
              <li className="before:content-['○']"> 회사규모</li>
              <li className="before:content-['○']"> 입사시 급여수준</li>
              <li className="before:content-['○']"> 담당업무</li>
              <li className="before:content-['○']"> 발전가능성</li>
              <li className="before:content-['○']"> 동료와의 친밀함</li>
              <li className="before:content-['○']"> 개인시간 존중(칼퇴 등)</li>
            </ul>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              3. 본인의 장점(경쟁력)과 단점(보완점)에 대해여 서술해 주세요.
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              4. 타인의 입을 통한 본인의 평가는 어떻다고 생각하시나요?
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              5. 인생에서 가장 중요하게 생각하는 것은 무엇인가요?
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              6. 과거로 돌아가서 본인이 한 행동을 고칠수 있다면, 언제로 돌아가
              어떤 행동을 고치고 싶나요?
            </h3>
            <div className="h-[10mm]"></div>
          </li>
        </ol>
      </div>
      <div
        id="capture2"
        className="a4page bg-white mx-auto p-[5mm] flex flex-col justify-between gap-y-4 overflow-hidden"
      >
        <ol className="flex flex-col justify-start gap-y-4">
          <li className="indent-5">
            <h3 className="font-medium">
              7. 가장 싫어하는 직장동료 또는 상사는 어떤 스타일인가요?
              (직장경험이 없을시에는 학교, 군대 동료 중에서)
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              8. 출근을 앞두고 심한 감기몸살로 괴로울 경우 어떻게 대처하실
              건가요?
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium indent-5 mb-2">
              9. 다음은 생활습관에 대한 내용입니다 (주관식 입니다)
            </h3>
            <ul className="min-h-[10mm] grid grid-cols-2 justify-start gap-x-4 gap-y-2 pl-6">
              <li>①흡연하시나요?</li>
              <li>②주량이 어떻게 되세요?</li>
              <li>③여가시간 취미</li>
              <li>④습관이나 버릇이 있나요?</li>
              <li className="col-span-2 h-[5mm]"></li>
            </ul>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              10. 회사 프로모션에서 내가 받고 싶은 선물은 무엇인가요
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              11. 일주일간 해외여행 프로모션, 제일 가고 싶은 곳은 어디인가요?
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              12. 전화통화와 문자(톡) 중 어떤 걸 더 선호하시나요?
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium mb-2">
              13. 반려동물 키우는 거 어떻게 생각하세요?
            </h3>
            <ul className="min-h-[10mm] grid grid-cols-2 justify-start gap-x-4 gap-y-2 pl-6">
              <li className="before:content-['○']"> 반려동물 키우고 있어요</li>
              <li className="before:content-['○']"> 반려동물 키우고 싶어요</li>
              <li className="before:content-['○']">
                {" "}
                반려동물 키우기는 어려울 거 같아요
              </li>
            </ul>
          </li>
          <li className="indent-5">
            <h3 className="font-medium mb-2">
              14. 평소에 운동은 하고 계신가요?
            </h3>
            <ul className="min-h-[10mm] grid grid-cols-2 justify-start gap-x-4 gap-y-2 pl-6">
              <li className="before:content-['○']"> 규칙적으로 하고 있어요</li>
              <li className="before:content-['○']">
                {" "}
                여건이 안되서 못하고 있어요
              </li>
              <li className="before:content-['○']">
                {" "}
                굳이 체력을 낭비하고 싶지 않아요.
              </li>
            </ul>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              15. 입사 후 많은 급여를 받는다면 가장 하고 싶은 건 무엇인가요?
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              16. 최근 1주일 동안 몇번 면접 참석을 하셨나요?
            </h3>
            <div className="h-[10mm]"></div>
          </li>
          <li className="indent-5">
            <h3 className="font-medium">
              마지막 질문입니다. 1등이 되고 싶으신가요? 아니면 편하게 중간만
              가도 될까요?
            </h3>
            <div className="h-[10mm]"></div>
          </li>
        </ol>
        <div className="text-center">작성해주셔서 감사합니다</div>
      </div>
      <div
        id="capture3"
        className="a4page bg-white mx-auto p-[5mm] flex flex-col justify-start gap-y-2 overflow-hidden"
      >
        <div className="grid grid-cols-3">
          <h2 className="surveyheading text-lg font-bold col-span-2">
            면접관 메모
          </h2>
          <div className="text-lg">지원자명 : </div>
        </div>
        <table className="w-full table-auto text-xs border-collapse">
          <thead>
            <tr>
              <td
                colSpan={10}
                className="h-[160mm] border border-gray-500"
              ></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                면접관
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500 text-white bg-white">
                홍길동
              </td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                A(채용적합)
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500 text-white bg-white">
                쳌
              </td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                B(채용가능)
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500 text-white bg-white">
                쳌
              </td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                C(다소부족)
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500 text-white bg-white">
                쳌
              </td>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                D(채용부적합)
              </th>
              <td className="p-2 text-lg align-middle border border-gray-500 text-white bg-white">
                쳌
              </td>
            </tr>
            <tr>
              <th className="bg-blue-500 text-white border border-gray-500 text-center py-2 align-middle">
                총평
              </th>
              <td
                colSpan={9}
                className="p-2 text-lg align-middle border border-gray-500 text-white bg-white h-[100mm]"
              >
                홍길동
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaperSurvey;
