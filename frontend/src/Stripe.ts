import {loadStripe} from "@stripe/stripe-js";

const stripeClient = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

export {stripeClient}