// MainComponent.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./css/styles_main.css";
import sortingImage from "./sorting.png";
import searchingImage from "./searching.png";

function MainComponent() {
  useEffect(() => {
    const leftHeading = document.getElementsByClassName("list_item");
    for (let i = 0; i < leftHeading.length; i++) {
      leftHeading[i].addEventListener("mouseover", handleMouseOver);
      leftHeading[i].addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      for (let i = 0; i < leftHeading.length; i++) {
        leftHeading[i].removeEventListener("mouseover", handleMouseOver);
        leftHeading[i].removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  const handleMouseOver = (event) => {
    event.target.style.color = "#0d4a4a";
  };

  const handleMouseOut = (event) => {
    event.target.style.color = "white";
  };

  return (
    <div>
      <header className="header">
        <nav className="nav">
          <div className="container_main">
            <h1 className="logo_main">DSA Visualizer</h1>
            <ul className="nav-links_main">
              <li className="list_item_main">
                <a href="#sorting">Sorting </a>
              </li>
              <li className="list_item_main">
                <a href="#searching">Searching </a>
              </li>
              <li className="list_item_main">
                <Link to="/feedback">Feedback</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="hero_main">
          <h1>Welcome to DSA Visualizer</h1>
          <p>Explore and visualize various sorting and searching algorithms.</p>
        </div>
      </header>
      <main>
        <section className="section" id="sorting">
          <h2>Sorting Algorithms</h2>
          <div className="content2">
            <div>
              <p className="para">
                When we have a large amount of data, it can be difficult to deal
                with it, especially when it is arranged randomly. When this
                happens, sorting that data becomes crucial in order to make
                searching easier. Sorting refers to rearrangement of a given
                array or list of elements according to a comparison operator on
                the elements to reorder all the elements either in ascending or
                in descending order. Explore various sorting algorithms such as
                Bubble Sort, Selection Sort, Merge Sort, and more.
              </p>

              <Link to="/sorting" className="btn2">
                Explore Sorting
              </Link>
            </div>
            <img src={sortingImage} alt="Sorting Image" />
          </div>
        </section>
        <section className="section" id="searching">
          <h2>Searching Algorithms</h2>
          <div className="content2">
            <div>
              <p className="para">
                Searching algorithms are essential tools in computer science
                used to locate specific items within a collection of data. These
                algorithms are designed to efficiently navigate through data
                structures to find the desired information, making them
                fundamental in various applications such as databases, web
                search engines, and more. Visualize Binary Search.
              </p>
              <Link to="/searching" className="btn2">
                Explore Binary Search
              </Link>
            </div>
            <img src={searchingImage} alt="Searching Image" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainComponent;
