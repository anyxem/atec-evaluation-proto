export const QuestionPartial = ({questions}) => {
  return (
    <div>
      simulate date:
      <input type="date"/>
      {
        questions.questions.map((item)=>{
          return (
            <>
              {item.name}

              {
                Object.keys(item.choice).map((key)=>{
                  const v = item.choice[key];
                  return (
                    <div>
                      <input type="radio" name={'a'+item.id} />
                      {v}
                    </div>
                  );
                })
              }
            </>
          );
        })
      }
    </div>
  );
}
