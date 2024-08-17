interface LocationRequest {
  reqLatitude: string;
  reqLongitude: string;
  targetLatitude: string;
  targetLongitude: string;
}

export const compareLocation = (locReq: LocationRequest) => {
  const result = {
    roundedReqLatitude: '',
    roundedReqLongitude: '',
    roundedTargetLatitude: '',
    roundedTargetLongitude: '',
  };

  Object.keys(locReq).forEach((key) => {
    result[key] = roundCoordinate(locReq[key], 6);
  });

  return (
    result.roundedReqLatitude === result.roundedTargetLatitude &&
    result.roundedReqLongitude === result.roundedTargetLongitude
  );
};

const roundCoordinate = (coordinate: string, precision: number) =>
  parseFloat(coordinate).toFixed(precision);
