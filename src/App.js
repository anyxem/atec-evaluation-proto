import './App.css';
import React, { useState } from 'react';
import { Question } from './components/question';
import { Result } from './components/result';
import questions from './data/questions.json';

function App() {
  const [answers, setAnswers] = useState([]);
  const [pointer, setPointer] = useState(1);
  const [group, setGroup] = useState(1);

  const handleAnswers = (ans, pointer) => {
    console.log(ans);
    if(pointer){
      setAnswers([...answers, {...ans, group}]);
      console.log('ans.pointer ', pointer );
      console.log('questions.questions.length ', questions.questions.length );
      if(pointer > questions.questions.length) {
        setPointer(1);
        setGroup(group + 1);
      } else {
        setPointer(pointer);
      }
    } else {
      setAnswers([...answers, ans]);
    }
  }

  return (
    <div className="App">
      <Question answers={answers} setAnswers={handleAnswers} questions={questions} />
      <Question key={"d"+group+pointer} pointer={pointer} answers={answers} setAnswers={handleAnswers} questions={questions} />
      <Result answers={answers} questions={questions} />

      pointer: {pointer} <br/>
      group: {group}
    </div>
  );
}

export default App;
