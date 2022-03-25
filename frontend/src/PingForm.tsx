import {useState} from "react";
import {Button, Group, Modal, Text, Alert, Textarea, Blockquote, Divider, Title} from '@mantine/core';
import {StripeElementsOptions} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {CheckoutForm} from "./CheckoutForm";
import {stripeClient} from "./Stripe";

export function PingForm() {
    const [clientSecret, setClientSecret] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [pingMessage, setPingMessage] = useState('');


    const requestPaymentFlow = () => {
        if (clientSecret) {
            setModalOpen(true);
            return;
        }

        setLoading(true);
        fetch(process.env.REACT_APP_API_BASE_URL + "checkout",
            {
                method: "POST",
                mode: 'cors',
                body: JSON.stringify({'message': pingMessage}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {return response.json()})
            .then((data) => {
                window.location = data.url;
            })
            .catch((reason => {
                setErrorMessage(reason.message());
                setLoading(false);
            }));
    };

    const options: StripeElementsOptions = {
        clientSecret: clientSecret,
        appearance: {
            theme: 'stripe',
        },
    };

    return <Group style={{width: "70%"}} direction="column">
        <Textarea
            placeholder="Your message here"
            value={pingMessage}
            onChange={(e) => setPingMessage(e.currentTarget.value)}
            required
            autosize
            minRows={4}
            maxRows={4}
            style={{width: "100%"}}
        />
        <Button onClick={() => requestPaymentFlow()} disabled={!pingMessage} loading={loading && !!pingMessage}>Ping!</Button>
        <Modal
            opened={!!clientSecret && modalOpen}
            onClose={() => setModalOpen(false)}
            title="One more thing..."
        >
            <Group direction="column">
                <Blockquote cite="– You">
                    {pingMessage}
                </Blockquote>
                <Title>$1</Title>
                <Divider my="sm" variant="dashed" label="Payment information" />
                <Elements options={options} stripe={stripeClient}>
                    <CheckoutForm clientSecret={clientSecret!}/>
                </Elements>
            </Group>
        </Modal>
        {errorMessage && <Alert title="!!!" color="red">
            {errorMessage}
        </Alert>}
    </Group>;
}