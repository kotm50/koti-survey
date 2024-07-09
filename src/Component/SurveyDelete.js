import React, { useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SurveyDelete() {
  const user = useSelector(state => state.user);
  let navi = useNavigate();

  useEffect(() => {
    chkAdmin(user);
    // eslint-disable-next-line
  }, []);

  const chkAdmin = user => {
    setTimeout(() => {
      if (!user.admin) {
        alert("관리자 로그인이 필요합니다");
        navi("/adminlogin");
      }
    }, 1000);
  };

  const deleteSurveysBeforeDate = async () => {
    const targetDate = new Date("2024-02-01");
    const surveysRef = collection(db, "survey");
    const q = query(surveysRef, where("created", "<", targetDate));

    const querySnapshot = await getDocs(q);
    let deletedCount = 0;

    for (const docSnapshot of querySnapshot.docs) {
      const docRef = doc(db, "survey", docSnapshot.id);
      await deleteDoc(docRef);
      deletedCount++;
      console.log(
        `Deleted document ${docSnapshot.id} (${deletedCount} of ${querySnapshot.size})`
      );
    }

    console.log(
      "All documents created before 2024-02-01 have been successfully deleted."
    );
  };

  const countOldAndTotalSurveys = async () => {
    const targetDate = new Date("2024-02-01");
    const surveysRef = collection(db, "survey");
    const allDocsQuery = query(surveysRef);
    const oldDocsQuery = query(surveysRef, where("created", "<", targetDate));

    const allDocsSnapshot = await getDocs(allDocsQuery);
    const oldDocsSnapshot = await getDocs(oldDocsQuery);

    console.log(
      `'created'가 2024년 2월 이전에 생성된 문서 수: ${oldDocsSnapshot.size} / 전체 문서 수: ${allDocsSnapshot.size}`
    );
  };

  return (
    <div className="flex flex-col justify-center gap-y-4">
      <button onClick={deleteSurveysBeforeDate}>Delete Old Surveys</button>
      <button onClick={countOldAndTotalSurveys}>Count Old Surveys</button>
    </div>
  );
}

export default SurveyDelete;
