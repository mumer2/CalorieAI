export function calculateBMI(weight, height) {
  const h = height / 100;
  return (weight / (h * h)).toFixed(2);
}

export function calculateBMR(weight, height, age) {
  return (10 * weight + 6.25 * height - 5 * age + 5).toFixed(0); // Male
}

export function calculateTDEE(bmr, activity) {
  let factor = 1.2;
  if (activity === 'medium') factor = 1.55;
  else if (activity === 'high') factor = 1.9;
  return (bmr * factor).toFixed(0);
}
