import slugify from "slugify";

// simple slug generator
export const generateSlug = (text) => {
  return slugify(text, {
    lower: true,
    strict: true, // special characters हटाउँछ
    trim: true,
  });
};

// unique slug generator (DB check सहित)
export const generateUniqueSlug = async (db, table, field, value) => {
  let slug = generateSlug(value);

  const [rows] = await db.execute(
    `SELECT ${field} FROM ${table} WHERE ${field} = ?`,
    [slug],
  );

  if (rows.length > 0) {
    slug = `${slug}-${Date.now()}`;
  }

  return slug;
};
