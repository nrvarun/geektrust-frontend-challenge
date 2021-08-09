import React, { ReactElement, useEffect } from "react";

interface Props {
  data: [];
}

const getUserData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  const data = await res.json();

  console.log(data);

  return data;
};

function SearchResults({ data }: Props): ReactElement {
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <section>
      <div></div>
    </section>
  );
}

export default SearchResults;
