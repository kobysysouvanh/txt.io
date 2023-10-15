import prismadb from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const body = await request.json();
    const { conversationId } = params;
    const { name } = body;

    const updatedGroup = await prismadb.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedGroup);
  } catch (error: any) {
    console.log("[SETTINGS_GROUP_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
