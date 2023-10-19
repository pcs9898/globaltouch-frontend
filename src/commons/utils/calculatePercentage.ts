interface ICalculatePercentage {
  numerator: number;
  denominator: number;
}

export const CalculatePercentage = ({
  numerator,
  denominator,
}: ICalculatePercentage): number => {
  const percentage = (numerator / denominator) * 100;
  return percentage;
};
