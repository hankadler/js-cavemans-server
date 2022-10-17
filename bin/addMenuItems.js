#!/usr/bin/env node

import { fileURLToPath } from "url";
import config from "../src/config";
import database from "../src/db";
import foods from "../etc/foods";
import sauces from "../etc/sauces";
import sides from "../etc/sides";
import drinks from "../etc/drinks";
import desserts from "../etc/desserts";

import MenuItem from "../src/schema/MenuItem/model";

const addMenuItems = async (keepAlive = false) => {
  await database.connect(config.db.uri);
  console.log(`connected to ${config.db.name}`);

  await MenuItem.deleteMany();
  console.log("deleted menu items");

  await Promise.all(foods.map((food) => MenuItem.create({ type: "FOOD", ...food })));
  await Promise.all(sauces.map((sauce) => MenuItem.create({ type: "SAUCE", ...sauce })));
  await Promise.all(sides.map((side) => MenuItem.create({ type: "SIDE", ...side })));
  await Promise.all(drinks.map((drink) => MenuItem.create({ type: "DRINK", ...drink })));
  await Promise.all(desserts.map((dessert) => MenuItem.create({ type: "DESSERT", ...dessert })));
  console.log("added menu items");

  if (!keepAlive) database.disconnect(() => console.log(`disconnected from ${config.db.name}`));
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  addMenuItems(process.argv[2]).catch((error) => console.error(error.message));
}
