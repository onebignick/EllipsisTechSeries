import { NextResponse } from "next/server";

let alerts: any[] = []; // object detection alerts will be stored here temporarily

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		// const body = JSON.stringify(payload);
		console.log(payload)
		alerts.push(payload);
		return NextResponse.json({"message":"alert received successfully by C2 WebUI"}, {status: 200});
	} catch (error) {
		console.warn(error)
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function GET(request: Request) {
	try {
		return NextResponse.json({alerts}, {status: 200})
	} catch(error) {
		console.warn(error)
		return NextResponse.json({ error }, { status: 500 });
	}
}