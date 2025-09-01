import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const city = searchParams.get("city");

    let query =
      "SELECT id, name, address, city, state, contact, image, email_id FROM schools";
    let params = [];
    let conditions = [];

    // Add search filter
    if (search) {
      conditions.push("(name LIKE ? OR address LIKE ? OR city LIKE ?)");
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Add city filter
    if (city) {
      conditions.push("city = ?");
      params.push(city);
    }

    // Add WHERE clause if there are conditions
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY id DESC";

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query, params);
    connection.release();

    return NextResponse.json({ schools: rows });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const image = formData.get("image");

    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, image, email_id]
    );
    connection.release();

    return NextResponse.json({
      message: "School added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to add school" },
      { status: 500 }
    );
  }
}
