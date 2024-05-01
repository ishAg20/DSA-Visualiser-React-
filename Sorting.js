import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/style1.css";

const Sorting = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [speed, setSpeed] = useState(2);
  const [c_delay, setC_delay] = useState(0);
  const [divs, setDivs] = useState([]);
  const [sortingInProgress, setSortingInProgress] = useState(false);
  let delay_time = 0;
  const [div_sizes, setDiv_sizes] = useState([]);
  const [newDivSizes, setNewDivSizes] = useState([]);
  const divRefs = useRef([]);

  useEffect(() => {
    generateArray();
    vis_speed();
  }, []);

  useEffect(() => {
    const algos = document.querySelectorAll(".algos button");
    algos.forEach((algo) => {
      algo.addEventListener("click", runalgo);
    });
    return () => {
      algos.forEach((algo) => {
        algo.removeEventListener("click", runalgo);
      });
    };
  }, [arraySize, array]);

  useEffect(() => {
    vis_speed();
  }, [speed]);

  const generateArray = () => {
    const newArray = [];
    const newDivSizes = [];
    for (let i = 0; i < arraySize; i++) {
      const randomHeight =
        Math.floor(Math.random() * 0.5 * (arraySize - 5)) + 10;
      newArray.push(Math.floor(Math.random() * 0.5 * (arraySize - 5)) + 10);
      newDivSizes.push(randomHeight);
    }
    setArray(newArray);
    setDiv_sizes(newDivSizes);
    setSortedArray([]);
  };

  const update_array_size = () => {
    const inp = document.getElementById("a_size");
    setArraySize(inp.value);
    generateArray();
  };

  const disable_buttons = () => {
    const algos = document.querySelectorAll(".algos button");
    algos.forEach((algo) => {
      algo.classList = [];
      algo.classList.add("locked");
      algo.disabled = true;
    });
    const inp = document.getElementById("a_size");
    inp.disabled = true;
    const generate = document.getElementById("gen");
    generate.disabled = true;
    const speedInput = document.getElementById("speed");
    speedInput.disabled = true;
  };

  const enable_buttons = () => {
    const algos = document.querySelectorAll(".algos button");
    algos.forEach((algo) => {
      algo.classList = [];
      algo.classList.add("unselected");
      algo.disabled = false;
    });
    const inp = document.getElementById("a_size");
    inp.disabled = false;
    const generate = document.getElementById("gen");
    generate.disabled = false;
    const speedInput = document.getElementById("speed");
    speedInput.disabled = false;
    setSortingInProgress(false);
  };

  const [elementsRendered, setElementsRendered] = useState(false);

  useEffect(() => {
    if (array.length === arraySize && !sortingInProgress) {
      setElementsRendered(true);
    }
  }, [array, arraySize, sortingInProgress]);

  const runalgo = (event) => {
    disable_buttons();
    event.target.classList.add("selected");
    switch (event.target.innerHTML) {
      case "Bubble":
        Bubble();
        break;
      case "Selection":
        Selection_sort();
        break;
      case "Insertion":
        Insertion();
        break;
      case "Merge":
        Merge();
        break;
      case "Quick":
        Quick();
        break;
      default:
        break;
    }
  };

  const vis_speed = () => {
    let array_speed = speed;
    let s;
    switch (parseInt(array_speed)) {
      case 1:
        s = 10;
        break;
      case 2:
        s = 100;
        break;
      case 3:
        s = 500;
        break;
      case 4:
        s = 1000;
        break;
      case 5:
        s = 1500;
        break;
      default:
        s = 1000;
        break;
    }
    delay_time = 10000 / (Math.floor(arraySize / 10) * s);
    setC_delay(delay_time);
  };

  const div_update = (cont, height, color) => {
    window.setTimeout(() => {
      cont.style.margin = `0% ${0.1 * (100 / arraySize)}%`;
      cont.style.width = `${100 / arraySize - 2 * 0.1 * (100 / arraySize)}%`;
      cont.style.height = `${height}%`;
      cont.style.backgroundColor = color;
    }, c_delay);
  };

  const Bubble = () => {
    setSortingInProgress(true);
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N^2)";
    document.getElementById("Space_Worst").innerText = "O(1)";
    const animations = [];
    let newArray = [...array];
    for (let i = 0; i < arraySize - 1; i++) {
      for (let j = 0; j < arraySize - i - 1; j++) {
        animations.push([j, j + 1]);
        if (newArray[j] > newArray[j + 1]) {
          animations.push([j, j + 1, true]);
          let temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;
        }
      }
    }
    let timer = 0;
    animations.forEach((animation, index) => {
      const [firstIndex, secondIndex, swap] = animation;
      setTimeout(() => {
        const tempHeight = divRefs.current[firstIndex].style.height;
        divRefs.current[firstIndex].style.height =
          divRefs.current[secondIndex].style.height;
        divRefs.current[secondIndex].style.height = tempHeight;
        if (swap) {
          [array[firstIndex], array[secondIndex]] = [
            array[secondIndex],
            array[firstIndex],
          ];
          setArray([...array]);
        }
        if (index === animations.length - 1) {
          setTimeout(() => {
            enable_buttons();
            setSortingInProgress(false);
            setSortedArray([...array]);
          }, c_delay);
        }
      }, timer * c_delay);
      timer++;
    });
  };

  const Selection_sort = () => {
    setSortingInProgress(true);
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N^2)";
    document.getElementById("Space_Worst").innerText = "O(1)";
    const animations = [];
    let newArray = [...array];
    for (let i = 0; i < arraySize - 1; i++) {
      for (let j = 0; j < arraySize - i - 1; j++) {
        animations.push([j, j + 1]);
        if (newArray[j] > newArray[j + 1]) {
          animations.push([j, j + 1, true]);
          let min_index = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = min_index;
        }
      }
    }
    let timer = 0;
    animations.forEach((animation, index) => {
      const [firstIndex, secondIndex, swap] = animation;
      setTimeout(() => {
        const tempHeight = divRefs.current[firstIndex].style.height;
        divRefs.current[firstIndex].style.height =
          divRefs.current[secondIndex].style.height;
        divRefs.current[secondIndex].style.height = tempHeight;
        if (swap) {
          [array[firstIndex], array[secondIndex]] = [
            array[secondIndex],
            array[firstIndex],
          ];
          setArray([...array]);
        }
        if (index === animations.length - 1) {
          setTimeout(() => {
            enable_buttons();
            setSortingInProgress(false);
            setSortedArray([...array]);
          }, c_delay);
        }
      }, timer * c_delay);
      timer++;
    });
  };

  const Insertion = () => {
    setSortingInProgress(true);
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N)";
    document.getElementById("Space_Worst").innerText = "O(1)";
    const animations = [];
    const newArray = [...array];
    for (let j = 1; j <= arraySize; j++) {
      let key = newArray[j];
      let i = j - 1;
      while (i >= 0 && newArray[i] > key) {
        animations.push([i, i + 1, newArray[i]]);
        newArray[i + 1] = newArray[i];
        i--;
      }
      newArray[i + 1] = key;
    }
    let timer = 0;
    animations.forEach((animation, index) => {
      const [currentIndex, nextIndex, value] = animation;
      setTimeout(() => {
        const tempHeight = divRefs.current[currentIndex].style.height;
        divRefs.current[currentIndex].style.height =
          divRefs.current[nextIndex].style.height;
        divRefs.current[nextIndex].style.height = tempHeight;
        array[currentIndex] = value;
        setArray([...array]);
        if (index === animations.length - 1) {
          setTimeout(() => {
            enable_buttons();
            setSortingInProgress(false);
            setSortedArray([...array]);
          }, c_delay);
        }
      }, timer * c_delay);
      timer++;
    });
  };

  const Merge = () => {
    setSortingInProgress(true);
    document.getElementById("Time_Worst").innerText = "O(N log N)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";
    document.getElementById("Space_Worst").innerText = "O(N)";
    const animations = [];
    const newArray = [...array];
    merge_partition(0, arraySize - 1, animations);
    let timer = 0;
    const animationInterval = setInterval(() => {
      if (timer < animations.length) {
        const [animationType, index1, value, index2] = animations[timer];
        if (animationType === "merge") {
          div_update(divRefs.current[index1], value, "#2d7f9d");
        } else if (animationType === "compare") {
          div_update(divRefs.current[index1], array[index1], "#ffa07a");
          if (index2 !== undefined) {
            div_update(divRefs.current[index2], array[index2], "#ffa07a");
          }
        }
      } else {
        clearInterval(animationInterval);
        setTimeout(() => {
          enable_buttons();
          setSortingInProgress(false);
          setSortedArray([...array]);
        }, c_delay);
      }
      timer++;
    }, c_delay);
  };

  function merge_partition(start, end, animations) {
    if (start < end) {
      var mid = Math.floor((start + end) / 2);
      merge_partition(start, mid, animations);
      merge_partition(mid + 1, end, animations);
      merge_sort(start, mid, end, animations);
    }
  }

  const merge_sort = (start, mid, end, animations) => {
    let p = start,
      q = mid + 1;
    const tempArray = [];
    let k = 0;
    for (let i = start; i <= end; i++) {
      if (p > mid) {
        animations.push(["compare", q, q]);
        animations.push(["merge", q, array[q], q]);
        tempArray[k++] = array[q++];
      } else if (q > end) {
        animations.push(["compare", p, p]);
        animations.push(["merge", p, array[p], p]);
        tempArray[k++] = array[p++];
      } else if (array[p] < array[q]) {
        animations.push(["compare", p, q]);
        animations.push(["merge", p, array[p], p]);
        tempArray[k++] = array[p++];
      } else {
        animations.push(["compare", p, q]);
        animations.push(["merge", q, array[q], q]);
        tempArray[k++] = array[q++];
      }
    }
    for (let t = 0; t < k; t++) {
      animations.push(["merge", start + t, tempArray[t], start + t]);
      array[start + t] = tempArray[t];
    }
    setArray([...array]);
  };

  const Quick = () => {
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";
    document.getElementById("Space_Worst").innerText = "O(log N)";
    const animations = [];
    const sortedArray = [...array];
    quick_sort(0, arraySize - 1, array, animations);
    let timer = 0;
    const animationInterval = setInterval(() => {
      if (timer < animations.length) {
        const [animationType, index1, index2, value] = animations[timer];
        if (animationType === "swap") {
          const tempHeight = divRefs.current[index1].style.height;
          divRefs.current[index1].style.height =
            divRefs.current[index2].style.height;
          divRefs.current[index2].style.height = tempHeight;
          [array[index1], array[index2]] = [array[index2], array[index1]];
          setArray([...array]);
        } else if (animationType === "compare") {
          div_update(divRefs.current[index1], array[index1], "#ffa07a");
          div_update(divRefs.current[index2], array[index2], "#ffa07a");
        }
      } else {
        clearInterval(animationInterval);
        enable_buttons();
      }
      timer++;
    }, c_delay);
  };

  const quick_sort = (start, end, array, animations) => {
    if (start < end) {
      const pivotIndex = quick_partition(start, end, array, animations);
      quick_sort(start, pivotIndex - 1, array, animations);
      quick_sort(pivotIndex + 1, end, array, animations);
    }
  };

  const quick_partition = (start, end, array, animations) => {
    const pivotIndex = Math.floor(Math.random() * (end - start + 1)) + start;
    const pivotHeight = array[pivotIndex];
    [array[start], array[pivotIndex]] = [array[pivotIndex], array[start]];
    animations.push(["swap", start, pivotIndex, array[pivotIndex]]);
    animations.push(["swap", pivotIndex, start, array[start]]);
    let i = start;
    for (let j = start + 1; j <= end; j++) {
      animations.push(["compare", j, start]);
      if (array[j] < pivotHeight) {
        i++;
        animations.push(["swap", i, j, array[j]]);
        animations.push(["swap", j, i, array[i]]);
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    animations.push(["swap", start, i, array[i]]);
    animations.push(["swap", i, start, array[start]]);
    [array[start], array[i]] = [array[i], array[start]];
    return i;
  };

  useEffect(() => {
    divRefs.current = Array(arraySize)
      .fill()
      .map((_, index) => divRefs.current[index] || React.createRef());
  }, [arraySize]);

  const renderArray = () => {
    return array.slice(0, arraySize).map((height, index) => (
      <div
        key={index}
        style={{
          height: `${height}%`,
          width: `${100 / arraySize}%`,
          backgroundColor: "#c0d8c0",
          margin: `0% ${0.1 * (100 / arraySize)}%`,
        }}
        ref={(el) => (divRefs.current[index] = el)}
      />
    ));
  };

  const renderSortedArray = () => {
    return sortedArray.slice(0, arraySize).map((height, index) => (
      <div
        key={index}
        style={{
          height: `${height}%`,
          width: `${100 / arraySize}%`,
          backgroundColor: "#ffa07a",
          margin: `0% ${0.1 * (100 / arraySize)}%`,
        }}
      />
    ));
  };

  return (
    <div>
      <header>
        <nav>
          <div className="array-inputs">
            <p className="inputs">Size of the array:</p>
            <input
              id="a_size"
              type="range"
              min="5"
              max="50"
              step="1"
              value={arraySize}
              className="accent"
              onChange={update_array_size}
            />
            <p className="inputs">Speed of algorithm:</p>
            <input
              id="speed"
              type="range"
              min="7"
              max="10"
              step="1"
              value={speed}
              className="accent"
              onChange={(e) => {
                setSpeed(parseInt(e.target.value));
              }}
            />
            <br />
            <button id="gen" onClick={generateArray}>
              Generate Array
            </button>
          </div>
          <div className="header_right">
            <p className="nav-heading">Sorting Visualiser</p>
            <div className="algos">
              <button className="btn3">Bubble</button>
              <button className="btn3">Selection</button>
              <button className="btn3">Insertion</button>
              <button className="btn3">Merge</button>
              <button className="btn3">Quick</button>
            </div>
          </div>
        </nav>
      </header>
      <section>
        <div className="info">
          <h3>TIME COMPLEXITY</h3>
          <div className="complexity">
            <div className="info_sub">
              <p className="time_case">Worst case:</p>
              <p id="Time_Worst"></p>
            </div>
            <div className="info_sub">
              <p className="time_case">Average case:</p>
              <p id="Time_Average"></p>
            </div>
            <div className="info_sub">
              <p className="time_case">Best case:</p>
              <p id="Time_Best"></p>
            </div>
          </div>
        </div>
        <div id="array_container" className="array-container">
          {renderArray()}
        </div>
        <div className="info">
          <h3>SPACE COMPLEXITY</h3>
          <div className="complexity" id="Space_Complexity_Types_Container">
            <div className="info_sub">
              <p className="time_case">Worst case:</p>
              <p id="Space_Worst"></p>
            </div>
          </div>
        </div>
        <div className="array-section">
          <div id="original_array" className="array-container">
            {renderArray()}
          </div>
        </div>
        <div className="array-section">
          <div id="sorted_array" className="array-container">
            {renderSortedArray()}
          </div>
        </div>
      </section>
      <table className="sorting-table">
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Worst Case Time Complexity</th>
            <th>Stability</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bubble Sort</td>
            <td>O(n^2)</td>
            <td>No</td>
            <td>
              Repeatedly steps through the list, compares adjacent elements, and
              swaps them if they are in the wrong order.
            </td>
          </tr>
          <tr>
            <td>Selection Sort</td>
            <td>O(n^2)</td>
            <td>No</td>
            <td>
              Divides the input list into two sublists: a sorted sublist and an
              unsorted sublist, and repeatedly selects the smallest element from
              the unsorted sublist to move to the sorted sublist.
            </td>
          </tr>
          <tr>
            <td>Insertion Sort</td>
            <td>O(n^2)</td>
            <td>Yes</td>
            <td>
              Builds the final sorted array one item at a time by repeatedly
              moving the current element to its correct position in the sorted
              part of the array.
            </td>
          </tr>
          <tr>
            <td>Merge Sort</td>
            <td>O(n log n)</td>
            <td>Yes</td>
            <td>
              Divides the input array into two halves, recursively sorts the two
              halves, and then merges the sorted halves.
            </td>
          </tr>
          <tr>
            <td>Quick Sort</td>
            <td>O(n^2)</td>
            <td>No</td>
            <td>
              Selects a 'pivot' element from the array and partitions the other
              elements into two sub-arrays according to whether they are less
              than or greater than the pivot, and then recursively sorts the
              sub-arrays.
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/" className="inputs">
        Back to Home
      </Link>
    </div>
  );
};

export default Sorting;
