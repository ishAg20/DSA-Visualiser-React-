import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/style2.css";
import image1 from "./search1.webp";
import image2 from "./search2.jpeg";
import image3 from "./search3.png";

function Searching() {
  const [zIndex, setZIndex] = useState({
    image1: 1,
    image2: 1,
    image3: 1,
  });

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const container = document.getElementById("array");
    const arr = [];
    for (let i = 0; i < 20; i++) {
      const val = Number(Math.ceil(Math.random() * 100));
      arr.push(val);
    }
    arr.sort((a, b) => a - b);
    for (let i = 0; i < 20; i++) {
      const value = arr[i];
      const arrayEle = document.createElement("div");
      arrayEle.classList.add("block");
      arrayEle.style.height = `${value * 3}px`;
      arrayEle.style.transform = `translate(${i * 30}px)`;
      const arrayEleLabel = document.createElement("label");
      arrayEleLabel.classList.add("block_id");
      arrayEleLabel.innerText = value;
      arrayEle.appendChild(arrayEleLabel);
      container.appendChild(arrayEle);
    }
  };

  const binarySearch = async (delay = 300) => {
    const blocks = document.querySelectorAll(".block");
    const output = document.getElementById("text");
    const num = Number(document.getElementById("fname").value);

    for (let i = 0; i < blocks.length; i += 1) {
      blocks[i].style.backgroundColor = "#957dad";
    }
    output.innerText = "";

    let start = 0;
    let end = 19;
    let flag = 0;
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      blocks[mid].style.backgroundColor = "#fd8a8a";
      const value = Number(blocks[mid].childNodes[0].innerHTML);

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
      if (value === num) {
        output.innerText = "Element Found";
        blocks[mid].style.backgroundColor = "#c0d8c0";
        flag = 1;
        break;
      }
      if (value > num) {
        end = mid - 1;
        blocks[mid].style.backgroundColor = "#957dad";
      } else {
        start = mid + 1;
        blocks[mid].style.backgroundColor = "#957dad";
      }
    }
    if (flag === 0) {
      output.innerText = "Element Not Found";
    }
  };

  const moveToTop = (id) => {
    const maxZIndex = Math.max(...Object.values(zIndex));
    setZIndex((prevState) => ({
      ...prevState,
      [id]: maxZIndex + 1,
    }));
  };

  return (
    <div>
      <header>
        <nav>
          <div className="header_right2">
            <p className="nav-heading2">BINARY SEARCH VISUALIZER</p>
          </div>
        </nav>
      </header>
      <section>
        <div className="info">
          <h3>TIME COMPLEXITY</h3>
          <div className="complexity" id="time_complex">
            <div className="info_sub">
              <p className="time_case">Worst case:</p>
              <p id="Time_Worst">O(log N)</p>
            </div>
            <div className="info_sub">
              <p className="time_case">Average case:</p>
              <p id="Time_Average">O(log N)</p>
            </div>
            <div className="info_sub">
              <p className="time_case">Best case:</p>
              <p id="Time_Best">O(1)</p>
            </div>
          </div>
        </div>
        <div id="array_container2">
          <div id="array"></div>
          <br />
          <br />

          <div style={{ textAlign: "center" }}>
            <label htmlFor="fname"> Number to be Searched: </label>
            <input
              type="text"
              id="fname"
              name="fname"
              className="search_input"
            />
            <br />
            <br />
            <button
              id="btn"
              className="btn_search"
              onClick={() => binarySearch()}
            >
              Search
            </button>
            <br />
            <br />
            <div id="text"></div>
          </div>
        </div>
        <div className="info">
          <h3>SPACE COMPLEXITY</h3>
          <div className="complexity" id="Space_Complexity_Types_Container">
            <div className="info_sub">
              <p className="time_case">Worst case:</p>
              <p id="Space_Worst">O(1)</p>
            </div>
          </div>
        </div>
      </section>

      <div className="images">
        <img
          src={image1}
          id="image1"
          className="image"
          width="400"
          height="317"
          alt="search1"
          style={{ zIndex: zIndex.image1 }}
          onClick={() => moveToTop("image1")}
        />
        <img
          src={image2}
          id="image2"
          className="image"
          width="480"
          height="411"
          alt="search2"
          style={{ zIndex: zIndex.image2 }}
          onClick={() => moveToTop("image2")}
        />
        <img
          src={image3}
          id="image3"
          className="image"
          width="550"
          height="403"
          alt="search3"
          style={{ zIndex: zIndex.image3 }}
          onClick={() => moveToTop("image3")}
        />
      </div>

      <Link to="/" className="inputs">
        Back to Home
      </Link>
    </div>
  );
}

export default Searching;
