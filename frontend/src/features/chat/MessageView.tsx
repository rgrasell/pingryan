import {Message} from "./chatSlice";
import {Text, Group} from "@mantine/core";


export function MessageView(props: {message: Message, transient: boolean}) {
    return <Group spacing="xs">
        <Text color='dimmed'>
            {props.message.from + ":"}
        </Text>
        <Text>
            {props.message.contents}
        </Text>
    </Group>
}