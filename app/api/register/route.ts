import bcrypt from "bcrypt";
import prismadb from "@/app/libs/prismadb";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json();
    const {
        email,
        name,
        password,
    } = body;

    if (!email || !name || !password) {
        return new NextResponse('Something went wrong. Please try again', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismadb.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })
}