export const stateUpdater = (setState,updater: (data: any) => any) => {
    setState((prev) => {
        return {
            ...prev,
            ...updater(prev)
        }
    })
}

export const changeToObject = (fields:any) => {
  return fields.reduce((acc:any, field:any) => {
    // Only include fields with non-empty values
    if (field.type === "text") {
      // Example: if you want to ignore empty text fields, you can add condition
      if (field.value) acc[field.code] = field.value;
    } else {
      acc[field.code] = field.value;
    }
    return acc;
  }, {});
}