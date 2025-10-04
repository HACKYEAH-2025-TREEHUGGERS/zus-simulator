CREATE TABLE "retirement_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"age" integer NOT NULL,
	"gender" text NOT NULL,
	"gross_salary" numeric(10, 2) NOT NULL,
	"work_start_year" integer NOT NULL,
	"planned_retirement_year" integer NOT NULL,
	"account_balance" numeric(12, 2) NOT NULL,
	"subaccount_balance" numeric(12, 2) NOT NULL,
	"usage_date" timestamp DEFAULT now() NOT NULL,
	"usage_hour" integer NOT NULL,
	"expected_pension" numeric(10, 2),
	"used_age" integer NOT NULL,
	"used_gender" text NOT NULL,
	"used_salary" numeric(10, 2) NOT NULL,
	"included_sick_leave" boolean DEFAULT false NOT NULL,
	"used_account_balance" numeric(12, 2) NOT NULL,
	"used_subaccount_balance" numeric(12, 2) NOT NULL,
	"actual_pension" numeric(10, 2) NOT NULL,
	"realistic_pension" numeric(10, 2) NOT NULL,
	"postal_code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
