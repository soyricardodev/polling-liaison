"use client";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { ArrowRightIcon, BotIcon, ZapIcon } from "lucide-react";
import { useState } from "react";
import { CreatePollScratch } from "./create-poll-scratch";
export function PollCreatorTrigger() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [modal, setModal] = useState<"scratch" | "ai">("scratch");

	function handleOpenModal(modal: "scratch" | "ai") {
		setModal(modal);
		onOpen();
	}

	return (
		<>
			<div className="grid gap-2">
				<div
					className="cursor-pointer hover:bg-default-700 transition-colors group bg-default-900 px-6 py-8 rounded-md flex justify-between items-center text-white"
					onClick={() => handleOpenModal("scratch")}
					onKeyDown={() => handleOpenModal("scratch")}
					tabIndex={0}
					role="button"
				>
					<div className="flex items-center gap-x-4">
						<div className="p-2 border-2 rounded-full border-yellow-400 group-hover:bg-yellow-400 transition-colors">
							<ZapIcon className="size-8 text-yellow-400  group-hover:text-black transition-colors" />
						</div>
						<div>
							<h3 className="text-2xl font-bold">Create from scratch</h3>
							<p>Create a new poll from scratch</p>
						</div>
					</div>

					<div className="border-2 border-transparent group-hover:border-white rounded-full p-2 transition-colors">
						<ArrowRightIcon className="size-8" />
					</div>
				</div>

				<div
					className="cursor-pointer hover:bg-default-700 transition-colors group bg-default-900 px-6 py-8 rounded-md flex justify-between items-center text-white"
					onClick={() => handleOpenModal("scratch")}
					onKeyDown={() => handleOpenModal("scratch")}
				>
					<div className="flex items-center gap-x-4">
						<div className="p-2 border-2 rounded-full border-purple-400 group-hover:bg-purple-400 transition-colors">
							<BotIcon className="size-8 text-purple-400  group-hover:text-black transition-colors" />
						</div>
						<div>
							<h3 className="text-2xl font-bold">Create with AI</h3>
							<p>Create a new poll with AI</p>
						</div>
					</div>

					<div className="border-2 border-transparent group-hover:border-white rounded-full p-2 transition-colors">
						<ArrowRightIcon className="size-8" />
					</div>
				</div>
			</div>
			<Modal
				isOpen={isOpen}
				className="dark text-white"
				onOpenChange={onOpenChange}
				backdrop="blur"
			>
				<ModalContent>
					{(onClose) => (
						<>
							{modal === "scratch" ? (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Create your poll
									</ModalHeader>
									<ModalBody>
										<CreatePollScratch />
									</ModalBody>
								</>
							) : null}

							{modal === "ai" ? (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Create your poll
									</ModalHeader>
									<ModalBody>
										<CreatePollScratch />
									</ModalBody>
								</>
							) : null}
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}