import { isArray } from "util";

export function JsonObjectDiff(oldItem, newItem) {
    debugger
  let { diffJson, existsKeys, isEqual } = getAddJsonAndExistsKeys(
    oldItem,
    newItem
  );
  existsKeys.forEach(key => {
    let res = compareDiff(oldItem[key], newItem[key]);
    if (!res.isEqual) {
      diffJson[key] = res.diffJson;
    }
  });
  return { diffJson, isEqual };
}

const getAddJsonAndExistsKeys = (oldItem, newItem) => {
  let existsKeys: string[] = [],
    diffJson = {};
  let oldObjectKey = Object.keys(oldItem);
  let newObjectKey = Object.keys(newItem);
  let isEqual = true;
  newObjectKey.forEach(key => {
    if (oldObjectKey.indexOf(key) == -1) {
      isEqual = false;
      diffJson[key] = { operate: "add", newVal: newItem[key] };
    } else {
      existsKeys.push(key);
    }
  });
  oldObjectKey.forEach(key => {
    if (newObjectKey.indexOf(key) == -1) {
      isEqual = false;
      diffJson[key] = { operate: "remove", oldVal: oldItem[key] };
    }
  });
  return { diffJson, existsKeys, isEqual };
};

const compareDiff = (oldItem, newItem) => {
  let oldType = getItemType(oldItem);
  let newType = getItemType(newItem);
  let diffJson: any = {};
  let isEqual = true;
  if (oldType != newType) {
    isEqual = false;
  } else if (oldType === "Array") {
    isEqual = oldItem.join(",") === newItem.join(",");
  } else if (oldType === "object") {
    let res = JsonObjectDiff(oldItem, newItem);
    isEqual = res.isEqual;
    diffJson.diffJson = diffJson;
  } else {
    isEqual = oldType === newType;
  }
  if (!isEqual) {
    diffJson.operate = "change";
  }
  return { isEqual, diffJson };
};

const getItemType = item => {
  return isArray(item) ? "Array" : typeof item;
};
