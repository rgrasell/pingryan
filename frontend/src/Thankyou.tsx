import {Title, Group, Button, Loader, Text, Skeleton} from '@mantine/core';
import {useEffect, useState} from "react";



export function Thankyou(props: {sessionId: string}) {
    const [delivered, setDelivered] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (delivered) return;
        const check = async () => {
            if (delivered) return;
            fetch(process.env.REACT_APP_API_BASE_URL + "readReceipt?sessionId=" + props.sessionId,
                {
                    method: "GET",
                    mode: 'cors',
                })
                .then((response) => {return response.json()})
                .then((data) => {
                    setDelivered(data.delivered);
                })
                .catch((reason => {
                    console.log(reason);
                }));
        };
        const interval = setInterval(() => check(), 2000);
        return () => clearTimeout(interval);
    }, [props.sessionId, delivered]);

    return <Group direction="column">
        <Title order={1}>🎉 Thank you! 🎉</Title>
        {delivered === undefined ? <Skeleton height={8} radius="xl" /> :
        <Group><Text>{delivered ? "Delivered!" : "Delivering..."}</Text>{!delivered && <Loader variant="dots" />}</Group>}
        <Button component="a" href="/" variant="subtle">Want to send another? 👀</Button>
    </Group>
}