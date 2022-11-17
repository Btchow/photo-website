import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

export const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");

  const auth = "563492ad6f9170000100000146e4946bc80b495fae45d23012ab57aa";
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  //fatch data from api
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", Authorization: auth },
    });
    let parsedData = await dataFetch.json();
    setData(parsedData.photos);
  };

  const morepicture = async () => {
    let newURL;
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: { Accept: "application/json", Authorization: auth },
    });
    let parsedData = await dataFetch.json();
    setData(data.concat(parsedData.photos));
  };

  //fatch data when page load up
  useEffect(() => {
    search(intialURL);
  }, []);

  //load up everytime currentSearch change
  useEffect(() => {
    if (currentSearch === "") {
      search(intialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>

      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />

      <div className="pictures">
        {data &&
          data.map((d, i) => {
            return <Picture data={d} key="i" />;
          })}
      </div>

      <div className="morePicture">
        <button onClick={morepicture}>Load More</button>
      </div>

    </div>
  );
};

export default Homepage;
