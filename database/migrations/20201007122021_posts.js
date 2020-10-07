const { table } = require("console");
const { post } = require("superagent");

exports.up = function (knex) {
  return knex.schema.createTable("posts", (tbl) => {
    tbl.increments();
    tbl.string("title").notNullable();
    tbl.specificType("content", "text ARRAY");
    tbl.timestamp("created").defaultTo(knex.fn.now());

    //reference the users
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExsists("posts");
};