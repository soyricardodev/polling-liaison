import { type Stripe as StripeType, loadStripe } from "@stripe/stripe-js";
import { env } from "~/env";
import Stripe from "stripe";
let stripePromise: Promise<StripeType | null>;

export const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
	}

	return stripePromise;
};

export const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
