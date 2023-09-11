import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./CodeExamples.css"

const CodeExamples = () => {
  //Data Visualizercd 
  // Existing data for project examples
  const projectData = [
    { name: "Project 1", value: 15 },
    { name: "Project 2", value: 30 },
  ];

  // State for user-input data
  const [userData, setUserData] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Ref for SVG element
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear any previous bar chart
    svg.selectAll("*").remove();

    // Combine existing data and user-input data
    const data = [...projectData, ...userData];

    // Dimensions
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([innerHeight, 0]);

    // Create bars
    const bars = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.value))
      .attr("fill", "steelblue");

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);

    svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left},${innerHeight + margin.top})`
      )
      .call(xAxis);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis);
  }, [userData]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleAddData = () => {
    if (!userInput || !userInput.trim()) {
      alert("Please enter a valid data value.");
      return;
    }

    const newData = {
      name: `Project ${userData.length + 3}`,
      value: parseInt(userInput, 10),
    };
    setUserData([...userData, newData]);
    setUserInput("");
  };

  // Numbers to Words
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function numberToWord(number) {
    if (number < 20) {
      return ones[number];
    }

    if (number < 100) {
      return tens[Math.floor(number / 10)] + ones[number % 10];
    }

    if (number < 1000) {
      return (
        ones[Math.floor(number / 100)] +
        " hundred " +
        numberToWord(number % 100)
      );
    }

    if (number < 1000000) {
      return (
        numberToWord(Math.floor(number / 1000)) +
        " thousand " +
        numberToWord(number % 1000)
      );
    }

    return "Number is too large to convert";
  }

  // State for the "Numbers to Words" input
  const [numberInput, setNumberInput] = useState("");
  const [numberWord, setNumberWord] = useState("");

  function handleConvert() {
    const userInput = parseInt(numberInput, 10);

    if (userInput >= 1 && userInput <= 1000000) {
      const numberWord = numberToWord(userInput);
      setNumberWord(numberWord);
    } else {
      setNumberWord("Please enter a valid number between 1 and 1,000,000.");
    }
  }

  // Hashtag Generator
  const [inputText, setInputText] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [error, setError] = useState("");

  function generateHashtags(text, generatedHashtags, currentWords = []) {
    if (currentWords.length > 0) {
      const generatedHashtag =
        "#" +
        currentWords
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");
      if (generatedHashtag.length <= 140) {
        generatedHashtags.push(generatedHashtag);
      }
    }

    if (text.length === 0 || generatedHashtags.length >= 100) {
      return;
    }

    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      const remainingWords = words.slice(i + 1);
      generateHashtags(remainingWords.join(" "), generatedHashtags, [
        ...currentWords,
        words[i],
      ]);
    }
  }

  function generateAllHashtags() {
    if (!inputText || !inputText.trim()) {
      setError("Invalid input or too long for a hashtag!");
      setHashtags([]);
    } else {
      setError("");
      const generatedHashtags = [];
      generateHashtags(inputText, generatedHashtags);
      setHashtags(generatedHashtags);
    }
  }

  return (
    <section id="code-examples">
      <div className="container">
        <h2>Code Examples</h2>
        <p>Here are some code snippets or projects that I've worked on:</p>

        <div className="code-example">
          <h3>Project 1</h3>
          <p>Description of Project 1 goes here.</p>
        </div>

        {/* Data Visualization */}
        <div className="code-example data-visualization">
          <h3>User-input Data Visualization</h3>
          <label htmlFor="userInput">Enter a data value:</label>
          <input
            type="number"
            id="userInput"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter a data value"
          />
          <button onClick={handleAddData}>Add Data</button>
          <svg ref={svgRef} width={400} height={300}></svg>
        </div>

        {/* Numbers to Words */}
        <div className="code-example numbers-to-words">
          <h3>Numbers to Words</h3>
          <label htmlFor="numberInput">Enter a number (1-1,000,000):</label>
          <input
            type="number"
            id="numberInput"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            placeholder="Enter a number (1-1,000,000)"
          />
          <button onClick={handleConvert}>Convert</button>
          {numberWord && (
            <p>
              Number in words:{" "}
              <span style={{ color: "red" }}>{numberWord}</span>
            </p>
          )}
        </div>

        {/* Hashtag Generator */}
        <div className="code-example hashtag-generator">
          <h3>Hashtag Generator</h3>
          <label htmlFor="inputText">Enter your text:</label>
          <input
            type="text"
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={generateAllHashtags}>Generate Hashtags</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {hashtags.length > 0 && (
            <div>
              <p>All Possible Hashtags (Showing up to 100):</p>
              <ul>
                {hashtags.map((hashtag, index) => (
                  <li key={index}>{hashtag}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CodeExamples;
