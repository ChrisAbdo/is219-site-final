"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function addGuestbookEntry(formData: FormData) {
  const message = formData.get("message") as string;
  const id = crypto.randomUUID();

  await sql`
    INSERT INTO guestbook (id, message, created_at)
    VALUES (${id}, ${message}, NOW())
  `;

  revalidatePath("/guestbook");
}

export async function getGuestbookEntries() {
  const { rows } = await sql`
    SELECT id, message, created_at
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT 100
  `;

  return rows;
}
