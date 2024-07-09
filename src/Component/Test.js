import React, { useEffect } from "react";
const Test = () => {
  useEffect(() => {
    alert("되겠냐ㅋㅋ");
    //eslint-disable-next-line
  }, []);

  return <div>ddd</div>;
};

export default Test;
