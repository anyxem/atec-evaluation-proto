import Chart from 'react-apexcharts'

export const Result = ({ result, answers, questions }) => {
  const process = {};
  const qcount = questions.questions.length;

  console.log("answers:", JSON.stringify(answers[0], null, 2));

  const groups = {};

  for (let i=0;i<=answers.length-1;i++) {
    const item = answers[i];
    console.log('---',item);
    if (!item.group) {
        // complete answer
        process[item.date] = item.ans;
      } else {
        if(groups[item.group] && groups[item.group].ans) {
          groups[item.group].ans = {...groups[item.group].ans, ...item.ans};
          groups[item.group].date = item.date;
        } else {
          groups[item.group] = {ans:item.ans, date: item.date};
        }
      }
  }

  const groupsDate = {};

  Object.keys(groups).forEach((group)=>{
    groupsDate[groups[group].date] = groups[group].ans;
  })

  const final = {...process, ...groupsDate};

  const orderedFinal = Object.keys(final).sort().reduce(
    (obj, key) => {
      obj[key] = final[key];
      return obj;
    },
    {}
  );


  let predict = {};
  let is_last_predicted = false;
  if(Object.keys(orderedFinal).length > 1) {
    const predict_last = orderedFinal[Object.keys(orderedFinal)[Object.keys(orderedFinal).length - 1]];
    console.log(predict_last);

    if(Object.keys(predict_last).length < qcount) {
      console.log('predict required');
      const predict_prev = orderedFinal[Object.keys(orderedFinal)[Object.keys(orderedFinal).length - 2]];
      const predict_ans = {...predict_prev, ...predict_last};
      console.log(predict_ans);
      predict = predict_ans;

      orderedFinal[Object.keys(orderedFinal)[Object.keys(orderedFinal).length - 1]] = predict;
      is_last_predicted = true;
    }
  }

  const finalCalculation = Object.keys(orderedFinal).reduce(
    (obj, key) => {
      obj[key] = Object.values(orderedFinal[key]).reduce((a,b)=>{return ~~a + ~~b},0);
      return obj;
    },
    {}
  );

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    forecastDataPoints: {
      count: is_last_predicted ? 1 : 0,
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: Object.keys(finalCalculation),
    }
  };

  const series = [{
    name: "score",
    data: Object.values(finalCalculation)
  }];


  return <>result
  <pre style={{textAlign: 'left'}}>
    {JSON.stringify(answers)}
    <br/>
    {JSON.stringify(process)}
    <br/>
    {JSON.stringify(groups)}
    <br/>
    {JSON.stringify(groupsDate)}
    <br/>
    {JSON.stringify(final)}
    <br/>
    {JSON.stringify(orderedFinal)}
    <br/>
    {JSON.stringify(finalCalculation, null, 2)}
    <br/>
    {is_last_predicted? 'predicted' : 'real'}
  </pre>

    <Chart options={options} series={series} type="line" height={350} />
  </>
}
