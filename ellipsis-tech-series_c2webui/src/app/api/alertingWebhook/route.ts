import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const headerPayload = headers();

	try {
		const payload = await request.json();
		const body = JSON.stringify(payload);
		console.log(body)
		return NextResponse.json({status: 200});
	} catch (error) {
		console.warn(error)
		return NextResponse.json({ error }, { status: 500 });
	}
}
