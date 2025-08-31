import { NextRequest, NextResponse } from "next/server";
import { catchError, createError, getJsonDataCached } from "@/utils";
import { getJsonDataCached as getJsonDataServer } from "@/utils/get-json-data/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("fileName");
    const subfolder = searchParams.get("subfolder");

    if (!fileName) {
      return NextResponse.json(
        { error: "fileName parameter is required" },
        { status: 400 }
      );
    }

    const [error, data] = await catchError(() =>
      getJsonDataServer(fileName, subfolder || undefined)
    );

    if (error) {
      const errorResponse = createError("BAD_REQUEST", {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: error.message,
        fatal: false,
        data: data,
        cause: error,
        stack: (error as Error).stack,
      });

      return NextResponse.json({ error: errorResponse }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);

    const errorResponse = createError("INTERNAL_SERVER_ERROR", {
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Internal server error",
      data: null,
      cause: error,
      stack: (error as Error).stack,
    });

    return NextResponse.json({ error: errorResponse }, { status: 500 });
  }
}
