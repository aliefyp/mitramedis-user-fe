interface UseBmiProps {
  weight: number;
  height: number;
}

interface UseBmiReturn {
  score: string;
  status: string;
  color: string;
}

const useBmi = ({ weight, height}: UseBmiProps): UseBmiReturn => {
  const weightKgNum = Number(weight);
  const heightMeterNum = Number(height) / 100;
  const bmiVal = weightKgNum / Math.pow(heightMeterNum, 2) || 0;

  let status = '';
  let color = '';

  if (bmiVal < 18.5) {
    status = 'underweight';
    color = 'yellow'
  } else if (bmiVal < 25.0) {
    status = 'normal';
    color = 'green';
  } else if (bmiVal < 30.0) {
    status = 'overweight';
    color = 'pink';
  } else {
    status = 'obesity';
    color = 'red';
  }

  return {
    score: bmiVal.toFixed(2),
    status,
    color,
  }
}

export default useBmi;
