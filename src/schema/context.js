import config from "../config";
import variables from "./variables";
import MenuItem from "./MenuItem/model";
import User from "./User/model";

const state = {};

const setState = async (key, value) => {
  state[key] = value;
  return value;
};

const _refreshVariables = async (req) => {
  // MenuItem
  const menuItemIds = (await MenuItem.find()).map(({ _id }) => _id.toString());
  const menuItemId = menuItemIds.slice(-1)[0] || "";
  variables.menuItemIds = menuItemIds;
  variables.menuItemId = menuItemId;

  // User
  const userIds = (await User.find()).map(({ _id }) => _id.toString());
  const userId = userIds.slice(-1)[0] || "";
  variables.userIds = userIds;
  variables.userId = userId;

  req.body.variables = { ...variables, ...req.body.variables }; // vars from req should win
};

const context = async ({ req }) => {
  if (!config.env.startsWith("prod")) await _refreshVariables(req);
  return { state, setState };
};

export default context;
