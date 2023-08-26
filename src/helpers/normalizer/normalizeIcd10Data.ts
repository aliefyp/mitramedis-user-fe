import { Icd10Response } from "types/icd10";

const normalizeIcd10Data = (data?: Icd10Response['data']['icd10']) => {
  if (!data) return [];

  const flattenIcd10 = data
    ?.map((lv1) => {
      const { child: child1 } = lv1;
      return [
        // lv1data,
        ...child1
          .map((lv2) => {
            const { child: child2 } = lv2;
            return [
              // lv2data,
              ...child2
                .map((lv3) => {
                  const { child: child3, ...lv3data } = lv3;
                  return [
                    lv3data,
                    ...child3
                  ];
                })
                .flat(),
            ];
          })
          .flat(),
      ];
    })
    .flat();

  return flattenIcd10?.map((item) => ({
    key: item.code,
    label: item.label,
  }));
}

export default normalizeIcd10Data;
