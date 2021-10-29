import axios from "axios";
import React, { useState, useEffect } from "react";

const ApiData = () => {
  const [data, setData] = useState([]);
  let url = "https://jsonplaceholder.typicode.com/posts";
  const [renderArr, setRenderArr] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  let initialDataSize = 10;
  useEffect(() => {
    const getData = async () => {
      let res = await axios(url);
      console.log(res.data);
      if (res && res.data) {
        setData(res.data);
      }
    };
    getData();
  }, [url]);

  useEffect(() => {
    setRenderArr(data.splice(0, initialDataSize));
  }, [data, initialDataSize]);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  function fetchMoreListItems() {
    setTimeout(() => {
      if (data && data.length >= 0) {
        if (data.length > initialDataSize) {
          setRenderArr([...renderArr, ...data.splice(0, initialDataSize)]);
          setIsFetching(false);
        } else {
          setRenderArr([...renderArr, ...data.splice(0, data.length)]);
          window.removeEventListener("scroll", handleScroll);
          setIsFetching(false);
        }
      }
    }, 500);
  }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop===
      document.documentElement.offsetHeight
    ) {
      console.log("touched bottom: ");
      if(data && data.length>0){
        setIsFetching(true);
        
    }
    else{
        setIsFetching(false);
        window.removeEventListener("scroll", handleScroll);
    }
    }
  }

  return (
    <div className="row">
      <div className="col-12">
        <h4 className="text-center text-danger">API data goes here...</h4>
        {renderArr.length > 0 &&
          renderArr.map((el) => (
            <div className="card bg-light mt-2" key={el.id}>
              <h6 className="text-success text-center">{el.id}</h6>
              <div className="card-body">
                <p className='text-danger'>{el.title}</p>
                <p className='text-info'>{el.body}</p>
              </div>
            </div>
          ))}
      </div>
      {isFetching && <i class="fa fa-spinner fa-spin text-center text-primary mt-2 mb-2 fa-2x"></i> }
    </div>
  );
};

export default ApiData;
