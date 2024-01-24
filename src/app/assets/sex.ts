export enum SexEnum {
  NotIdentified = 0,
  Male = 1,
  Female = 2,
}

interface SexInterface {
  key: number,
  value: string
}

export const SexList: SexInterface[] = [
  {
    key: SexEnum.NotIdentified,
    value: "NotIdentified"
  },
  {
    key: SexEnum.Male,
    value: 'Male'
  },
  {
    key: SexEnum.Female,
    value: "Female"
  }
];


export default SexList;
