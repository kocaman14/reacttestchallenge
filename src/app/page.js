'use client'
import { useState,useEffect } from 'react';
import "./globals.css";
function App() {
  const [userData, setUserData] = useState([]);
  const [question, setQuestion] = useState(1);
  const [useButton, setUseButton] = useState(true);
  const [table, setTable] = useState(false);

  const [answerA, setAnswerA] = useState(0);
  const [answerB, setAnswerB] = useState(0);
  const [answerC, setAnswerC] = useState(0);
  const [answerD, setAnswerD] = useState(0);
  const handleClickA = () => {
    setAnswerA((prev) => prev + 1);
    setUseButton(true);
  };
  const handleClickB = () => {
    setAnswerB((prev) => prev + 1);
    setUseButton(true);
  };
  const handleClickC = () => {
    setAnswerC((prev) => prev + 1);
    setUseButton(true);
  };
  const handleClickD = () => {
    setAnswerD((prev) => prev + 1);
    setUseButton(true);
  };

  const url = "https://jsonplaceholder.typicode.com/posts";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.filter((dat) => dat.id === question));

        let timerId;
        timerId = setTimeout(() => {
          setUseButton(true);
          if (question < 10) setQuestion(question+ 1);
          if (question === 10) {
            setTable(true);
          }
        }, 30000);
        let qeustionTime;
        qeustionTime = setTimeout(() => {
          setUseButton(false);
        }, 10000);

        return () => {
          clearTimeout(timerId);
        };
      });
  }, [question]);

  return (
    <div>
      <h3 className="header">Question :{question}</h3>
      {userData.map((user) => (
        <ul key={user.id}>
          <li className="ul">{user.title}?</li>
          A:
          <button
            className="button"
            disabled={useButton}
            onClick={handleClickA}
          >
            No
          </button>
          B:
          <button
            className="button"
            disabled={useButton}
            onClick={handleClickB}
          >
            Sometimes
          </button>
          C:
          <button
            className="button"
            disabled={useButton}
            onClick={handleClickC}
          >
            Mostly Yes
          </button>
          D:
          <button
            className="button"
            disabled={useButton}
            onClick={handleClickD}
          >
            Yes
          </button>
        </ul>
      ))}
      <div>
        {table ? (
          <div>
            Test Bitti Sonuçlar:
            <table >
              <thead >
                <tr >
                  <th></th>
                  <th className="rightborder">Option A</th>
                  <th className="rightborder">Option B</th>
                  <th className="rightborder"> Option C</th>
                  <th className="rightborder">Option D</th>
                </tr>
              </thead>
              <tbody className="thead">
                <tr>
                  <td ></td>
                  <td className="borderline">{answerA}</td>
                  <td className="borderline">{answerB}</td>
                  <td className="borderline">{answerC}</td>
                  <td className="borderline">{answerD}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  ); 
}

export default App;
