import './App.css'
import React, {useState} from 'react';

function App() {
  const [courseName, setCourseName] = useState("");
  const [typeOfAssignment, setTypeOfAssignment] = useState("");
  const [grading, setGrading] = useState("");


  const [response, setResponse] = useState("");
  const HTTP = "http://localhost:3000/chat";
  const apiKey = "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";

  const resetValues = () => {
    setCourseName("");
    setGrading("");
    setTypeOfAssignment("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const details = {courseName, typeOfAssignment, grading,};
    const result = await fetch(HTTP, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
  }

    

  return(
    <div>
      <form>
      {/* Used this for input: https://www.dhiwise.com/post/a-step-by-step-guide-to-retrieving-input-values-in-react */}
        <label>
          Course Name:
          <input
            type="text"
            value={courseName}
            onChange={event => {
              setCourseName(event.target.value);
            }}
          />
        </label>
        {/* Used this for select: https://react.dev/reference/react-dom/components/select  */}
        <label>
          Type of Assignment:
          <select
            value={typeOfAssignment}
            onChange={(e)=>{
              setTypeOfAssignment(e.target.value);
            }}
          >
            <option value="essay">Essay</option>
            <option value="presentation">Presentation</option>
            <option value="test">Test</option>
          </select>
        </label>
        <label>
          {/* Used this for the radio buttons: https://www.pluralsight.com/resources/blog/guides/how-to-use-radio-buttons-in-reactjs */}
          Grading:
            <div onChange={(e)=>{
                setGrading(e.target.value);
              }}>
              <input 
                type="radio" 
                value="clarity"
                name="grading"
                
              />Clarity
              <input 
                type="radio" 
                value="creativity"
                name="grading"

              />Creativity
              <input 
                type="radio" 
                value="technical accuracy"
                name="grading"

              />Technical Accuracy
            </div>
        </label>
      </form>
      <button onClick={resetValues}>Reset</button>

      <button onClick={handleSubmit}>Submit</button>

      <div>
        {response}
      </div>


    </div>
  )


}

export default App;
