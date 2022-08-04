import {useState, useCallback} from "react";

export const Question = ({questions, setAnswers, pointer}) => {
  const [date, setDate] = useState();
  const [ans, setAns] = useState({});

  const handleSubmit = () => {
    setAnswers({date, ans}, pointer ? pointer + 1 : null);
  };

  return (
    <div>
      simulate date:
      <input type="date" name="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
      {
        questions.questions.map((item)=>{
          if(pointer && item.id != pointer){
            return null;
          }

          return (
            <>
              {item.name}

              {
                Object.keys(item.choice).map((key)=>{
                  const v = item.choice[key];
                  return (
                    <div>
                      <input type="radio" name={'a'+item.id} value={key} onChange={(e)=>{setAns({...ans, ...{['a'+item.id]: key}})}} />
                      {v}
                    </div>
                  );
                })
              }
            </>
          );
        })
      }
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
