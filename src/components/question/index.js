import {useState, useCallback} from "react";
import styles from './style.module.css';

export const Question = ({questions, setAnswers, pointer}) => {
  const [date, setDate] = useState();
  const [ans, setAns] = useState({});

  const handleSubmit = () => {
    setAnswers({date, ans}, pointer ? pointer + 1 : null);
  };

  return (
    <div className={styles.box}>
      <h3>{pointer ? "частичное заполнение " + pointer + "/" + questions.questions.length : "полный опросник"}</h3>

      <div className={styles.date}>
        simulate date:
        <input type="date" name="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
      </div>
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
                      <label><input type="radio" name={'a'+item.id} value={key} onChange={(e)=>{setAns({...ans, ...{['a'+item.id]: key}})}} />
                      {v}</label>
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
