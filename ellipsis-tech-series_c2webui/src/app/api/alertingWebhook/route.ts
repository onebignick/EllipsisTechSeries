import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const headerPayload = headers();
	// const svix_id = headerPayload.get("svix-id");
	// const svix_timestamp = headerPayload.get("svix-timestamp");
	// const svix_signature = headerPayload.get("svix-signature");

	// if (!svix_id || !svix_timestamp || !svix_signature) {
	// 	return new Response("No svix headers found", {
	// 		status: 400
	// 	});
	// }

	try {
		const payload = await request.json();
		const body = JSON.stringify(payload);

	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
