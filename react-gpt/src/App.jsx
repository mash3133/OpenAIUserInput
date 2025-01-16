import './App.css'
import React, {useState} from 'react';

function App() {
  const [courseName, setCourseName] = useState("");
  const [typeOfAssignment, setTypeOfAssignment] = useState("");
  const [grading, setGrading] = useState("");
  /*Have an array to store categories dynamically*/
  const [gradingCategories, setGradingCategories] = useState([
    "Clarity",
    "Creativity",
    "Technical Accuracy",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const [responseList, setResponseList] = useState([]); // List to store all outputs
  const [currentOutput, setCurrentOutput] = useState(""); // For storing new outputs

  const [response, setResponse] = useState("");
  const HTTP = "http://localhost:3000/chat";

  const resetValues = () => {
    setCourseName("");
    setGrading("");
    setTypeOfAssignment("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const details = {courseName, typeOfAssignment, grading};
    const result = await fetch(HTTP, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })

    const data = await result.json();
    console.log("Generated Rubric:", data.result); 
    setResponse(data.response); 
    if (data && data.response) {
      setResponseList((prev) => [data.response, ...prev]); // Prepend new output to the list
      setCurrentOutput(data.response); // Update the current output
    }
  }
 
  return(<>
    <div className="app-container">
      <p className='title'>AI-supported grading rubric generator</p>
      <br></br>
      <div className='subheading'><p >Educators can use this tool to create rubrics tailored to their courses.</p></div>
      <form className='form-container'>
        <h3>Basic Information</h3>
        <div className='input-container'>
      {/* Used this for input: https://www.dhiwise.com/post/a-step-by-step-guide-to-retrieving-input-values-in-react */}
        <label>
          <p className='label'>Course Name:</p>
          <input
            type="text"
            value={courseName}
            onChange={event => {
              setCourseName(event.target.value);
            }}
            className='input-field'
          />
        </label>
        </div>
        {/* Used this for select: https://react.dev/reference/react-dom/components/select  */}
        <br></br>
        <div className='input-container'>
        <label>
        <p className='label'>Type of Assignment:</p>
          <select
            value={typeOfAssignment}
            onChange={(e)=>{
              setTypeOfAssignment(e.target.value);
            }}
            className='select'
          >
            <option value="essay">Essay</option>
            <option value="presentation">Presentation</option>
            <option value="test">Test</option>
          </select>
        </label>
        </div>
        <br></br>


        <p className='label'>Grading:</p>
        <div className="input-container">
          {/* render the array dynamically */}

          {gradingCategories.map((category, index) => (
            <div key={index} className="category">
              <input
                type="radio"
                value={category}
                name="grading"
                onChange={(e) => setGrading(e.target.value)}
                className="radio-button"
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>

        <div className="add-category">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="input-field"
          />
          <button
            type="button"
            onClick={() => {
              if (newCategory.trim() && !gradingCategories.includes(newCategory)) {
                setGradingCategories([...gradingCategories, newCategory]);
                setNewCategory("");
              }
            }}
            className="button-container"
          >
            ADD CATEGORY
          </button>
        </div>
        <br></br>
      <button onClick={resetValues} className='button-container color1'>RESET</button>
      <button onClick={handleSubmit} className='button-container color2'>SUBMIT</button>
      </form>


    </div>
    <div>
      {/* <div className='main-container' >
        <p className='response' >
        {response}
        </p>
      </div> */}
       <div className="">
        {responseList.map((output, index) => (
          <div key={index} className='main-container'>
            <p className='response'>{output}</p>
          </div>
        ))}
      </div>
      
    </div>
    </>
  )
}

export default App;
