import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {Textbox} from "../../widgets/Textbox";
import {selectComposing, selectMessages, setComposing, submitMessage, setSendingMessage, selectSendingMessage} from "./chatSlice";
import {MessageView} from "./MessageView";
import {sendMessage} from "./ChatClient";
import {Button, Group, Loader} from "@mantine/core";

export function ChatBox() {
    let dispatch = useAppDispatch();
    let messages = useAppSelector(selectMessages);
    let composing = useAppSelector(selectComposing);
    let sending = useAppSelector(selectSendingMessage)

    const submit = async () => {
        let message = {contents: composing, from: 'rgrasell'}
        dispatch(setSendingMessage(message));
        dispatch(setComposing(''));
        let sentMessage = await sendMessage(message);
        dispatch(submitMessage(sentMessage));
    }

    return <Group direction="column" spacing="xs">
        {messages.map((v) => {
            return <MessageView message={v} transient={false}/>
        })}
        {sending ? <Group><MessageView message={sending} transient={true}/><Loader size="sm" /></Group> : null}
        <Group>
            <Textbox
                value={composing}
                onChange={(e) => dispatch(setComposing(e.target.value))}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        submit();
                    }
                }}
            />
            <Button onClick={() => {
                submit();
            }}>
                Send
            </Button>
        </Group>
    </Group>;
}