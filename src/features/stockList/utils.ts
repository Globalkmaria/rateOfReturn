export const objectToArray = (Obj: { [key: string | number]: any }) => {
  return Object.keys(Obj).map((ObjKey) => Obj[ObjKey]);
};
