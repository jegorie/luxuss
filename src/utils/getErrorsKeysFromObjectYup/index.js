function getErrorKeysFromObjectYup(errors) {
  return Object.entries(errors).map(([key, value]) => {
    return `${value.type}-${key}`;
  });
}

export default getErrorKeysFromObjectYup;
