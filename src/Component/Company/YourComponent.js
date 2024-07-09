import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // db는 Firebase에서 가져온 Firestore 인스턴스여야 합니다.

const YourComponent = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "cs1"));
      const documentsData = querySnapshot.docs.map(doc => doc.data());
      console.log(documentsData);
      setDocuments(documentsData);
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      {documents.map((doc, index) => (
        <div key={index}>
          {/* 여기에서 문서 데이터를 표시하거나 사용하세요 */}
          <p>{JSON.stringify(doc)}</p>
        </div>
      ))}
    </div>
  );
};

export default YourComponent;
