var models = require('./models');

var q = `
DROP TABLE IF EXISTS "session";
CREATE TABLE "session" (
"sid" varchar NOT NULL COLLATE "default",
"sess" json NOT NULL,
"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`;

module.exports = function() {
  return models.sequelize.query(q)
      .catch((err) => {
          console.error(err);
      });
};


