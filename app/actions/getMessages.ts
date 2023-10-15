import prismadb from "../libs/prismadb";

const getMessages = async (conversationId: string) => {
    try {
        const messages = await prismadb.message.findMany({
            where: {
                conversationId
            },
            include: {
                seen: true,
                sender: true,
            },
            orderBy: {
                createdAt: "asc"
            }
        })

        return messages
    } catch (error: any) {
        return []
    }
}

export default getMessages