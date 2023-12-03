import { relations } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { sqliteTable } from "./utils";

export const woofysTable = sqliteTable(
  "woofys",
  {
    rarity: integer("rarity").primaryKey(),
    tokenId: integer("token_id").notNull(),
    imageUrl: text("image_url")
      .notNull()
      .default("https://static.cozyverse.xyz/woofys/images/00000.gif"),
    name: text("name", { length: 64 }).notNull(),
    bio: text("bio", { length: 1024 }),
    ownerAddress: text("owner_address"),
  },
  (t) => ({
    ownerAddressIndex: index("owner_address_index").on(t.ownerAddress),
  })
);

export const woofysRelations = relations(woofysTable, ({ many }) => ({
  traits: many(woofysTraitsTable),
}));

export const woofysTraitsTable = sqliteTable(
  "woofys_traits",
  {
    woofyId: integer("woofy_id").notNull(),
    traitId: integer("trait_id").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.traitId, t.woofyId] }) })
);

export const woofysTraitsRelations = relations(
  woofysTraitsTable,
  ({ one }) => ({
    woofy: one(woofysTable, {
      fields: [woofysTraitsTable.woofyId],
      references: [woofysTable.rarity],
    }),
    trait: one(traitsTable, {
      fields: [woofysTraitsTable.traitId],
      references: [traitsTable.id],
    }),
  })
);

export const traitsTable = sqliteTable(
  "traits",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    type: text("type").notNull(),
  },
  (t) => ({
    traitTypeIndex: index("trait_type_index").on(t.type),
    traitTypeTraitNameUniqueIndex: uniqueIndex(
      "trait_type_trait_name_unique_index"
    ).on(t.type, t.name),
  })
);

export const traitsRelations = relations(traitsTable, ({ many }) => ({
  woofys: many(woofysTraitsTable),
}));
