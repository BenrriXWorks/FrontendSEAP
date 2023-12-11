import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("cache.db");

export default db;
