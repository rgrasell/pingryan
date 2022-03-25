import {useEffect, useState} from "react";
import {Alert, Button, Group} from '@mantine/core';
import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";

export function CheckoutForm(props: {clientSecret: string}) {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        if (!!stripe) {
            setPaymentProcessing(true);
            const {error} = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: process.env.REACT_APP_RETURN_URL!,
                },
            });

            // This point will only be reached if there is an immediate error when
            // confirming the payment. Otherwise, your customer will be redirected to
            // your `return_url`. For some payment methods like iDEAL, your customer will
            // be redirected to an intermediate site first to authorize the payment, then
            // redirected to the `return_url`.
            if (error.type === "card_error" || error.type === "validation_error") {
                setErrorMessage(error.message!);
            } else {
                setErrorMessage("An unexpected error occured.");
            }

            setPaymentProcessing(false);
        }
    }

    return <form id="payment-form" onSubmit={handleSubmit}>
                <Group direction="column">
                    <PaymentElement id="payment-element"/>
                    {errorMessage && <Alert color="red">
                        {errorMessage}
                    </Alert>}
                    <Button id="submit" onClick={handleSubmit} loading={paymentProcessing}>Submit</Button>
                </Group>
            </form>;
}