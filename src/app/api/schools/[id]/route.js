import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const { name, address, city, state, contact, email_id, image } = body;

    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    // Check if school exists
    const [existing] = await connection.execute(
      "SELECT id FROM schools WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      connection.release();
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    // Update school
    await connection.execute(
      "UPDATE schools SET name = ?, address = ?, city = ?, state = ?, contact = ?, email_id = ?, image = ? WHERE id = ?",
      [name, address, city, state, contact, email_id, image, id]
    );

    connection.release();

    return NextResponse.json({
      message: "School updated successfully",
      id: parseInt(id),
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to update school" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const connection = await pool.getConnection();

    // Check if school exists
    const [existing] = await connection.execute(
      "SELECT id FROM schools WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      connection.release();
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    // Delete school
    await connection.execute("DELETE FROM schools WHERE id = ?", [id]);

    connection.release();

    return NextResponse.json({
      message: "School deleted successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete school" },
      { status: 500 }
    );
  }
}
