import {Message} from "./chatSlice";

export async function sendMessage(message: Message): Promise<Message> {
    await new Promise((res) => setTimeout(res, 800));
    return message;
}