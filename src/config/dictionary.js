//考核方式
export function getAssessmentTypes() {
  return [
    { id: 1, name: "扣分" },
    { id: 2, name: "豁免" },
    { id: 3, name: "加分" }
  ];
}

//考核方式(无豁免)
export function getAssessmentType2() {
  return [
    { id: 1, name: "扣分" },
    { id: 3, name: "加分" }
  ];
}

//考核方式(仅扣分)
export function getAssessmentType() {
  return [{ id: 1, name: "扣分" }];
}
