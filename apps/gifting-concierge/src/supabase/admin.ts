import { createClient } from "@supabase/supabase-js";
import { env } from "~/env";
import { stripe } from "~/utils/stripe/config";

export default function supabaseAdmin() {
	return createClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.SUPABASE_SERVICE_ROLE_KEY,
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		},
	);
}

export const upsertCustomerToSupabase = async (
	uuid: string,
	customerId: string,
) => {
	const { error: upsertError } = await supabaseAdmin()
		.from("customers")
		.upsert([{ id: uuid, stripe_customer_id: customerId }]);

	if (upsertError) {
		throw new Error(
			`Supabase customer record creation failed: ${upsertError.message}`,
		);
	}

	return customerId;
};

export const createCustomerInStripe = async (uuid: string, email: string) => {
	const customerData = { metadata: { supabaseUUID: uuid }, email: email };
	const newCustomer = await stripe.customers.create(customerData);

	return newCustomer.id;
};

export const createOrRetrieveCustomer = async ({
	email,
	uuid,
}: {
	email: string;
	uuid: string;
}) => {
	// Check if the customer already exists in Supabase
	const { data: existingSupabaseCustomer, error: queryError } =
		await supabaseAdmin()
			.from("customers")
			.select("*")
			.eq("id", uuid)
			.maybeSingle();

	if (queryError) {
		throw new Error(`Supabase customer lookup failed: ${queryError.message}`);
	}

	// Retrieve the Stripe customer ID using the Supabase customer ID, with email fallback
	let stripeCustomerId: string | undefined;
	if (existingSupabaseCustomer?.stripe_customer_id) {
		const existingStripeCustomer = await stripe.customers.retrieve(
			existingSupabaseCustomer.stripe_customer_id,
		);
		stripeCustomerId = existingStripeCustomer.id;
	} else {
		// If Stripe ID is missing from Supabase, try to retrieve Stripe customer ID by email
		const stripeCustomers = await stripe.customers.list({ email: email });
		stripeCustomerId =
			stripeCustomers.data.length > 0 ? stripeCustomers.data[0]?.id : undefined;
	}

	// If still no stripeCustomerId, create a new customer in Stripe
	const stripeIdToInsert = stripeCustomerId
		? stripeCustomerId
		: await createCustomerInStripe(uuid, email);
	if (!stripeIdToInsert) throw new Error("Stripe customer creation failed.");

	if (existingSupabaseCustomer && stripeCustomerId) {
		// If Supabase has a record but doesn't match Stripe, update Supabase record
		if (existingSupabaseCustomer.stripe_customer_id !== stripeCustomerId) {
			const { error: updateError } = await supabaseAdmin()
				.from("customers")
				.update({ stripe_customer_id: stripeCustomerId })
				.eq("id", uuid);

			if (updateError) {
				throw new Error(
					`Supabase customer record update failed: ${updateError.message}`,
				);
			}
			console.warn(
				"Supabase customer record mismatched Stripe ID. Supabase record updated.",
			);
		}
		// If Supabase has a record and matches Stripe, return Stripe customer ID
		return stripeCustomerId;
	}
	console.warn(
		"Supabase customer record was missing. A new record was created.",
	);

	// If Supabase has no record, create a new record and return Stripe customer ID
	const upsertedStripeCustomer = await upsertCustomerToSupabase(
		uuid,
		stripeIdToInsert,
	);
	if (!upsertedStripeCustomer) {
		throw new Error("Supabase customer record creation failed.");
	}

	return upsertedStripeCustomer;
};
