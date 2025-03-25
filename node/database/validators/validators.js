function getStringRequiredValidator(zeroStringLengthOk) {
  return function (val) {
    const invalidValues = ["undefined", "false", "true", "null"];
    if (zeroStringLengthOk) {
      return (
        val && typeof val === "string" && !invalidValues.includes(val.trim())
      );
    }
    return (
      val &&
      typeof val === "string" &&
      val.trim().length > 0 &&
      !invalidValues.includes(val.trim())
    );
  };
}

export { getStringRequiredValidator };
