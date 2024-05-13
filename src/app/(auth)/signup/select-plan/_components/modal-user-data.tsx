"use client";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { UserDataForm } from "./user-data-form";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "~/utils/supabase/client";
import { checkoutWithStripe } from "~/utils/stripe/server";
import { getErrorRedirect } from "~/utils/helpers";
import { getStripe } from "~/utils/stripe/client";

export function ModalUserData({
	priceId,
	buttonText,
}: { priceId: string; buttonText: string }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const router = useRouter();
	const currentPath = usePathname();

	const handleStripeCheckout = async () => {
		const supabase = createClient();

		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (!user || error) {
			return router.push("/signup");
		}

		const { data: price, error: priceError } = await supabase
			.from("prices")
			.select("*")
			.eq("id", priceId)
			.single();

		if (priceError || !price) {
			return router.push("/signup");
		}

		const { errorRedirect, sessionId } = await checkoutWithStripe(
			price,
			currentPath,
		);

		if (errorRedirect) {
			return router.push(errorRedirect);
		}

		if (!sessionId) {
			return router.push(
				getErrorRedirect(
					currentPath,
					"An unknown error occurred.",
					"Please try again later or contact a system administrator.",
				),
			);
		}

		const stripe = await getStripe();
		stripe?.redirectToCheckout({ sessionId });
	};

	return (
		<>
			<Button onPress={onOpen} className="mx-2" color="secondary">
				{buttonText}
			</Button>
			<Modal isOpen={isOpen} className="dark" onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="text-white flex flex-col gap-1">
								Tell us more about yourself
							</ModalHeader>
							<ModalBody className="text-white">
								<UserDataForm postUpdateData={() => handleStripeCheckout()} />
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}