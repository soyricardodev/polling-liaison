export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			customers: {
				Row: {
					id: string;
					stripe_customer_id: string | null;
				};
				Insert: {
					id: string;
					stripe_customer_id?: string | null;
				};
				Update: {
					id?: string;
					stripe_customer_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "customers_id_fkey";
						columns: ["id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			prices: {
				Row: {
					active: boolean | null;
					currency: string | null;
					description: string | null;
					id: string;
					interval: Database["public"]["Enums"]["pricing_plan_interval"] | null;
					interval_count: number | null;
					metadata: Json | null;
					product_id: string | null;
					trial_period_days: number | null;
					type: Database["public"]["Enums"]["pricing_type"] | null;
					unit_amount: number | null;
				};
				Insert: {
					active?: boolean | null;
					currency?: string | null;
					description?: string | null;
					id: string;
					interval?:
						| Database["public"]["Enums"]["pricing_plan_interval"]
						| null;
					interval_count?: number | null;
					metadata?: Json | null;
					product_id?: string | null;
					trial_period_days?: number | null;
					type?: Database["public"]["Enums"]["pricing_type"] | null;
					unit_amount?: number | null;
				};
				Update: {
					active?: boolean | null;
					currency?: string | null;
					description?: string | null;
					id?: string;
					interval?:
						| Database["public"]["Enums"]["pricing_plan_interval"]
						| null;
					interval_count?: number | null;
					metadata?: Json | null;
					product_id?: string | null;
					trial_period_days?: number | null;
					type?: Database["public"]["Enums"]["pricing_type"] | null;
					unit_amount?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "prices_product_id_fkey";
						columns: ["product_id"];
						isOneToOne: false;
						referencedRelation: "products";
						referencedColumns: ["id"];
					},
				];
			};
			products: {
				Row: {
					active: boolean | null;
					description: string | null;
					id: string;
					image: string | null;
					metadata: Json | null;
					name: string | null;
				};
				Insert: {
					active?: boolean | null;
					description?: string | null;
					id: string;
					image?: string | null;
					metadata?: Json | null;
					name?: string | null;
				};
				Update: {
					active?: boolean | null;
					description?: string | null;
					id?: string;
					image?: string | null;
					metadata?: Json | null;
					name?: string | null;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					billing_address: Json | null;
					full_name: string | null;
					id: string;
					payment_method: Json | null;
					updated_at: string | null;
					username: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					billing_address?: Json | null;
					full_name?: string | null;
					id: string;
					payment_method?: Json | null;
					updated_at?: string | null;
					username?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					billing_address?: Json | null;
					full_name?: string | null;
					id?: string;
					payment_method?: Json | null;
					updated_at?: string | null;
					username?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey";
						columns: ["id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			subscriptions: {
				Row: {
					cancel_at: string | null;
					cancel_at_period_end: boolean | null;
					canceled_at: string | null;
					created: string;
					current_period_end: string;
					current_period_start: string;
					ended_at: string | null;
					id: string;
					metadata: Json | null;
					price_id: string | null;
					quantity: number | null;
					status: Database["public"]["Enums"]["subscription_status"] | null;
					trial_end: string | null;
					trial_start: string | null;
					user_id: string;
				};
				Insert: {
					cancel_at?: string | null;
					cancel_at_period_end?: boolean | null;
					canceled_at?: string | null;
					created?: string;
					current_period_end?: string;
					current_period_start?: string;
					ended_at?: string | null;
					id: string;
					metadata?: Json | null;
					price_id?: string | null;
					quantity?: number | null;
					status?: Database["public"]["Enums"]["subscription_status"] | null;
					trial_end?: string | null;
					trial_start?: string | null;
					user_id: string;
				};
				Update: {
					cancel_at?: string | null;
					cancel_at_period_end?: boolean | null;
					canceled_at?: string | null;
					created?: string;
					current_period_end?: string;
					current_period_start?: string;
					ended_at?: string | null;
					id?: string;
					metadata?: Json | null;
					price_id?: string | null;
					quantity?: number | null;
					status?: Database["public"]["Enums"]["subscription_status"] | null;
					trial_end?: string | null;
					trial_start?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "subscriptions_price_id_fkey";
						columns: ["price_id"];
						isOneToOne: false;
						referencedRelation: "prices";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "subscriptions_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			pricing_plan_interval: "day" | "week" | "month" | "year";
			pricing_type: "one_time" | "recurring";
			subscription_status:
				| "trialing"
				| "active"
				| "canceled"
				| "incomplete"
				| "incomplete_expired"
				| "past_due"
				| "unpaid"
				| "paused";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	stripe: {
		Tables: {
			accounts: {
				Row: {
					attrs: Json | null;
					business_type: string | null;
					country: string | null;
					created: string | null;
					email: string | null;
					id: string | null;
					type: string | null;
				};
				Insert: {
					attrs?: Json | null;
					business_type?: string | null;
					country?: string | null;
					created?: string | null;
					email?: string | null;
					id?: string | null;
					type?: string | null;
				};
				Update: {
					attrs?: Json | null;
					business_type?: string | null;
					country?: string | null;
					created?: string | null;
					email?: string | null;
					id?: string | null;
					type?: string | null;
				};
				Relationships: [];
			};
			balance: {
				Row: {
					amount: number | null;
					attrs: Json | null;
					balance_type: string | null;
					currency: string | null;
				};
				Insert: {
					amount?: number | null;
					attrs?: Json | null;
					balance_type?: string | null;
					currency?: string | null;
				};
				Update: {
					amount?: number | null;
					attrs?: Json | null;
					balance_type?: string | null;
					currency?: string | null;
				};
				Relationships: [];
			};
			balance_transactions: {
				Row: {
					amount: number | null;
					attrs: Json | null;
					created: string | null;
					currency: string | null;
					description: string | null;
					fee: number | null;
					id: string | null;
					net: number | null;
					status: string | null;
					type: string | null;
				};
				Insert: {
					amount?: number | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					description?: string | null;
					fee?: number | null;
					id?: string | null;
					net?: number | null;
					status?: string | null;
					type?: string | null;
				};
				Update: {
					amount?: number | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					description?: string | null;
					fee?: number | null;
					id?: string | null;
					net?: number | null;
					status?: string | null;
					type?: string | null;
				};
				Relationships: [];
			};
			charges: {
				Row: {
					amount: number | null;
					attrs: Json | null;
					created: string | null;
					currency: string | null;
					customer: string | null;
					description: string | null;
					id: string | null;
					invoice: string | null;
					payment_intent: string | null;
					status: string | null;
				};
				Insert: {
					amount?: number | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					customer?: string | null;
					description?: string | null;
					id?: string | null;
					invoice?: string | null;
					payment_intent?: string | null;
					status?: string | null;
				};
				Update: {
					amount?: number | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					customer?: string | null;
					description?: string | null;
					id?: string | null;
					invoice?: string | null;
					payment_intent?: string | null;
					status?: string | null;
				};
				Relationships: [];
			};
			checkout_sessions: {
				Row: {
					attrs: Json | null;
					customer: string | null;
					id: string | null;
					payment_intent: string | null;
					subscription: string | null;
				};
				Insert: {
					attrs?: Json | null;
					customer?: string | null;
					id?: string | null;
					payment_intent?: string | null;
					subscription?: string | null;
				};
				Update: {
					attrs?: Json | null;
					customer?: string | null;
					id?: string | null;
					payment_intent?: string | null;
					subscription?: string | null;
				};
				Relationships: [];
			};
			customers: {
				Row: {
					attrs: Json | null;
					created: string | null;
					description: string | null;
					email: string | null;
					id: string | null;
					name: string | null;
				};
				Insert: {
					attrs?: Json | null;
					created?: string | null;
					description?: string | null;
					email?: string | null;
					id?: string | null;
					name?: string | null;
				};
				Update: {
					attrs?: Json | null;
					created?: string | null;
					description?: string | null;
					email?: string | null;
					id?: string | null;
					name?: string | null;
				};
				Relationships: [];
			};
			disputes: {
				Row: {
					amount: number | null;
					attrs: Json | null;
					charge: string | null;
					created: string | null;
					currency: string | null;
					id: string | null;
					payment_intent: string | null;
					reason: string | null;
					status: string | null;
				};
				Insert: {
					amount?: number | null;
					attrs?: Json | null;
					charge?: string | null;
					created?: string | null;
					currency?: string | null;
					id?: string | null;
					payment_intent?: string | null;
					reason?: string | null;
					status?: string | null;
				};
				Update: {
					amount?: number | null;
					attrs?: Json | null;
					charge?: string | null;
					created?: string | null;
					currency?: string | null;
					id?: string | null;
					payment_intent?: string | null;
					reason?: string | null;
					status?: string | null;
				};
				Relationships: [];
			};
			events: {
				Row: {
					api_version: string | null;
					attrs: Json | null;
					created: string | null;
					id: string | null;
					type: string | null;
				};
				Insert: {
					api_version?: string | null;
					attrs?: Json | null;
					created?: string | null;
					id?: string | null;
					type?: string | null;
				};
				Update: {
					api_version?: string | null;
					attrs?: Json | null;
					created?: string | null;
					id?: string | null;
					type?: string | null;
				};
				Relationships: [];
			};
			file_links: {
				Row: {
					attrs: Json | null;
					created: string | null;
					expired: boolean | null;
					expires_at: string | null;
					file: string | null;
					id: string | null;
					url: string | null;
				};
				Insert: {
					attrs?: Json | null;
					created?: string | null;
					expired?: boolean | null;
					expires_at?: string | null;
					file?: string | null;
					id?: string | null;
					url?: string | null;
				};
				Update: {
					attrs?: Json | null;
					created?: string | null;
					expired?: boolean | null;
					expires_at?: string | null;
					file?: string | null;
					id?: string | null;
					url?: string | null;
				};
				Relationships: [];
			};
			files: {
				Row: {
					attrs: Json | null;
					created: string | null;
					expires_at: string | null;
					filename: string | null;
					id: string | null;
					purpose: string | null;
					size: number | null;
					title: string | null;
					type: string | null;
					url: string | null;
				};
				Insert: {
					attrs?: Json | null;
					created?: string | null;
					expires_at?: string | null;
					filename?: string | null;
					id?: string | null;
					purpose?: string | null;
					size?: number | null;
					title?: string | null;
					type?: string | null;
					url?: string | null;
				};
				Update: {
					attrs?: Json | null;
					created?: string | null;
					expires_at?: string | null;
					filename?: string | null;
					id?: string | null;
					purpose?: string | null;
					size?: number | null;
					title?: string | null;
					type?: string | null;
					url?: string | null;
				};
				Relationships: [];
			};
			invoices: {
				Row: {
					attrs: Json | null;
					currency: string | null;
					customer: string | null;
					id: string | null;
					period_end: string | null;
					period_start: string | null;
					status: string | null;
					subscription: string | null;
					total: number | null;
				};
				Insert: {
					attrs?: Json | null;
					currency?: string | null;
					customer?: string | null;
					id?: string | null;
					period_end?: string | null;
					period_start?: string | null;
					status?: string | null;
					subscription?: string | null;
					total?: number | null;
				};
				Update: {
					attrs?: Json | null;
					currency?: string | null;
					customer?: string | null;
					id?: string | null;
					period_end?: string | null;
					period_start?: string | null;
					status?: string | null;
					subscription?: string | null;
					total?: number | null;
				};
				Relationships: [];
			};
			mandates: {
				Row: {
					attrs: Json | null;
					id: string | null;
					payment_method: string | null;
					status: string | null;
					type: string | null;
				};
				Insert: {
					attrs?: Json | null;
					id?: string | null;
					payment_method?: string | null;
					status?: string | null;
					type?: string | null;
				};
				Update: {
					attrs?: Json | null;
					id?: string | null;
					payment_method?: string | null;
					status?: string | null;
					type?: string | null;
				};
				Relationships: [];
			};
			payment_intents: {
				Row: {
					amount: number | null;
					attrs: Json | null;
					created: string | null;
					currency: string | null;
					customer: string | null;
					id: string | null;
					payment_method: string | null;
				};
				Insert: {
					amount?: number | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					customer?: string | null;
					id?: string | null;
					payment_method?: string | null;
				};
				Update: {
					amount?: number | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					customer?: string | null;
					id?: string | null;
					payment_method?: string | null;
				};
				Relationships: [];
			};
			payouts: {
				Row: {
					amount: number | null;
					arrival_date: string | null;
					attrs: Json | null;
					created: string | null;
					currency: string | null;
					description: string | null;
					id: string | null;
					statement_descriptor: string | null;
					status: string | null;
				};
				Insert: {
					amount?: number | null;
					arrival_date?: string | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					description?: string | null;
					id?: string | null;
					statement_descriptor?: string | null;
					status?: string | null;
				};
				Update: {
					amount?: number | null;
					arrival_date?: string | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					description?: string | null;
					id?: string | null;
					statement_descriptor?: string | null;
					status?: string | null;
				};
				Relationships: [];
			};
			prices: {
				Row: {
					active: boolean | null;
					attrs: Json | null;
					created: string | null;
					currency: string | null;
					id: string | null;
					product: string | null;
					type: string | null;
					unit_amount: number | null;
				};
				Insert: {
					active?: boolean | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					id?: string | null;
					product?: string | null;
					type?: string | null;
					unit_amount?: number | null;
				};
				Update: {
					active?: boolean | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					id?: string | null;
					product?: string | null;
					type?: string | null;
					unit_amount?: number | null;
				};
				Relationships: [];
			};
			products: {
				Row: {
					active: boolean | null;
					attrs: Json | null;
					created: string | null;
					default_price: string | null;
					description: string | null;
					id: string | null;
					name: string | null;
					updated: string | null;
				};
				Insert: {
					active?: boolean | null;
					attrs?: Json | null;
					created?: string | null;
					default_price?: string | null;
					description?: string | null;
					id?: string | null;
					name?: string | null;
					updated?: string | null;
				};
				Update: {
					active?: boolean | null;
					attrs?: Json | null;
					created?: string | null;
					default_price?: string | null;
					description?: string | null;
					id?: string | null;
					name?: string | null;
					updated?: string | null;
				};
				Relationships: [];
			};
			refunds: {
				Row: {
					amount: number | null;
					attrs: Json | null;
					charge: string | null;
					created: string | null;
					currency: string | null;
					id: string | null;
					payment_intent: string | null;
					reason: string | null;
					status: string | null;
				};
				Insert: {
					amount?: number | null;
					attrs?: Json | null;
					charge?: string | null;
					created?: string | null;
					currency?: string | null;
					id?: string | null;
					payment_intent?: string | null;
					reason?: string | null;
					status?: string | null;
				};
				Update: {
					amount?: number | null;
					attrs?: Json | null;
					charge?: string | null;
					created?: string | null;
					currency?: string | null;
					id?: string | null;
					payment_intent?: string | null;
					reason?: string | null;
					status?: string | null;
				};
				Relationships: [];
			};
			setup_attempts: {
				Row: {
					application: string | null;
					attrs: Json | null;
					created: string | null;
					customer: string | null;
					id: string | null;
					on_behalf_of: string | null;
					payment_method: string | null;
					setup_intent: string | null;
					status: string | null;
					usage: string | null;
				};
				Insert: {
					application?: string | null;
					attrs?: Json | null;
					created?: string | null;
					customer?: string | null;
					id?: string | null;
					on_behalf_of?: string | null;
					payment_method?: string | null;
					setup_intent?: string | null;
					status?: string | null;
					usage?: string | null;
				};
				Update: {
					application?: string | null;
					attrs?: Json | null;
					created?: string | null;
					customer?: string | null;
					id?: string | null;
					on_behalf_of?: string | null;
					payment_method?: string | null;
					setup_intent?: string | null;
					status?: string | null;
					usage?: string | null;
				};
				Relationships: [];
			};
			setup_intents: {
				Row: {
					attrs: Json | null;
					client_secret: string | null;
					created: string | null;
					customer: string | null;
					description: string | null;
					id: string | null;
					payment_method: string | null;
					status: string | null;
					usage: string | null;
				};
				Insert: {
					attrs?: Json | null;
					client_secret?: string | null;
					created?: string | null;
					customer?: string | null;
					description?: string | null;
					id?: string | null;
					payment_method?: string | null;
					status?: string | null;
					usage?: string | null;
				};
				Update: {
					attrs?: Json | null;
					client_secret?: string | null;
					created?: string | null;
					customer?: string | null;
					description?: string | null;
					id?: string | null;
					payment_method?: string | null;
					status?: string | null;
					usage?: string | null;
				};
				Relationships: [];
			};
			subscriptions: {
				Row: {
					attrs: Json | null;
					currency: string | null;
					current_period_end: string | null;
					current_period_start: string | null;
					customer: string | null;
					id: string | null;
				};
				Insert: {
					attrs?: Json | null;
					currency?: string | null;
					current_period_end?: string | null;
					current_period_start?: string | null;
					customer?: string | null;
					id?: string | null;
				};
				Update: {
					attrs?: Json | null;
					currency?: string | null;
					current_period_end?: string | null;
					current_period_start?: string | null;
					customer?: string | null;
					id?: string | null;
				};
				Relationships: [];
			};
			tokens: {
				Row: {
					attrs: Json | null;
					currency: string | null;
					current_period_end: string | null;
					current_period_start: string | null;
					customer: string | null;
					id: string | null;
				};
				Insert: {
					attrs?: Json | null;
					currency?: string | null;
					current_period_end?: string | null;
					current_period_start?: string | null;
					customer?: string | null;
					id?: string | null;
				};
				Update: {
					attrs?: Json | null;
					currency?: string | null;
					current_period_end?: string | null;
					current_period_start?: string | null;
					customer?: string | null;
					id?: string | null;
				};
				Relationships: [];
			};
			topups: {
				Row: {
					amount: number | null;
					attrs: Json | null;
					created: string | null;
					currency: string | null;
					description: string | null;
					id: string | null;
					status: string | null;
				};
				Insert: {
					amount?: number | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					description?: string | null;
					id?: string | null;
					status?: string | null;
				};
				Update: {
					amount?: number | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					description?: string | null;
					id?: string | null;
					status?: string | null;
				};
				Relationships: [];
			};
			transfers: {
				Row: {
					amount: number | null;
					attrs: Json | null;
					created: string | null;
					currency: string | null;
					description: string | null;
					destination: string | null;
					id: string | null;
				};
				Insert: {
					amount?: number | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					description?: string | null;
					destination?: string | null;
					id?: string | null;
				};
				Update: {
					amount?: number | null;
					attrs?: Json | null;
					created?: string | null;
					currency?: string | null;
					description?: string | null;
					destination?: string | null;
					id?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;
