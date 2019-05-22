function __resolveType(obj, args, context) {
  if (obj.type === "TALK" || obj.hasOwnProperty("remarks")) {
    return "Talk";
  }
  if (obj.type === "BASIC") {
    return "Activity";
  }
  return null;
}

module.exports = {
  __resolveType
};
