import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainComponent from "./MainComponent";
import FeedbackForm from "./FeedbackForm";
import Sorting from "./Sorting";
import Searching from "./Searching";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/sorting" element={<Sorting />} />{" "}
          <Route path="/searching" element={<Searching />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
