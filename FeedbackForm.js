import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/styles_feedback.css";

function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [features, setFeatures] = useState("");
  const [source, setSource] = useState("friend");
  const [sortingChecked, setSortingChecked] = useState(false);
  const [searchingChecked, setSearchingChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleFeaturesChange = (event) => {
    setFeatures(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  const handleSortingCheckboxChange = (event) => {
    setSortingChecked(event.target.checked);
  };

  const handleSearchingCheckboxChange = (event) => {
    setSearchingChecked(event.target.checked);
  };

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = () => {
    if (!name || !email || !rating || rating === 0) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    alert("Feedback submitted successfully!");
    setFormSubmitted(true);
  };

  return (
    <div className="feedback-form">
      <h1>Feedback Form</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rate your experience (1 to 5):</label>
          <br />
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={handleRatingChange}
              />
              {value}
            </label>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="features">
            Features you would like us to implement:
          </label>
          <br />
          <textarea
            id="features"
            name="features"
            rows="4"
            cols="50"
            value={features}
            onChange={handleFeaturesChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="source">How did you hear about us?</label>
          <br />
          <select
            id="source"
            name="source"
            value={source}
            onChange={handleSourceChange}
          >
            <option value="friend">From a friend</option>
            <option value="search">Search engine</option>
            <option value="social">Social media</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tried-features">Which features did you try?</label>
          <br />
          <label>
            <input
              type="checkbox"
              id="sorting"
              name="sorting"
              checked={sortingChecked}
              onChange={handleSortingCheckboxChange}
            />
            Sorting Algorithms
          </label>
          <label>
            <input
              type="checkbox"
              id="searching"
              name="searching"
              checked={searchingChecked}
              onChange={handleSearchingCheckboxChange}
            />
            Searching Algorithms
          </label>
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit Feedback
        </button>
      </form>

      <Link to="/" className="inputs">
        Back to Home
      </Link>
    </div>
  );
}

export default FeedbackForm;
