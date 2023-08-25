import moment from "moment"

const getAge = (birthDate: string): string => {
  if (!moment(birthDate).isValid()) return birthDate;

  const duration = moment.duration(moment().diff(birthDate));
  return `${duration.years()}th ${duration.months()}bln ${duration.days()}hr`;
}

export default getAge;