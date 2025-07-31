import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
	const { data: session } = useSession();

	const router = useRouter();
	console.log(router);

	const { redirect } = router.query;

	useEffect(() => {
		//if user is logged in
		if (session?.user) {
			console.log("redirect");

			console.log(redirect);

			router.push(redirect || "/");
		}
	}, [router, session, redirect]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	async function submitHandler({ email, password }) {
		//it is connect to the nextauth file
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result.error) console.log("Failed");
			console.log("signIn result:", result);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<Layout title="Login">
			{/* This sets the maximum width of the element to the medium breakpoint width of the screen. In Tailwind’s default config, screen-md corresponds roughly to 768px. So the element will never get wider than that, even if the screen is wider. */}
			<form
				onSubmit={handleSubmit(submitHandler)}
				className="mx-auto max-w-screen-md"
			>
				<h2 className="text-xl mb-3">Sign in</h2>
				<p className="text-gray-600 mb-10">
					Enter your email to login or create your account
				</p>
				<div className="mb-4">
					<input
						{...register("email", {
							required: true,
							pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
						})}
						type="email"
						id="email"
						placeholder="E-mail"
						autoFocus
						className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
					/>
					{errors.email && (
						<div className="text-red-400">Please enter your email address.</div>
					)}
				</div>
				<div className="mb-4">
					<input
						{...register("password", {
							required: true,
							minLength: {
								value: 8,
								message: "Password should be at least 8 characters.",
							},
							// pattern: {
							// 	value:
							// 		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
							// 	message:
							// 		"Your password must be at least 8 characters long and include at least: one uppercase letter, one lowercase letter, one number, one special character (e.g., @, $, !, %, *, ?, &)",
							// },
						})}
						type="password"
						id="password"
						placeholder="Password"
						autoFocus
						className="p-2 border-b-1  border-[#cccccc] w-100 focus:outline-none"
					/>
					{errors.password && (
						<div className="text-red-400">{errors.password.message}</div>
					)}
				</div>
				<div>
					<button className="bg-gray-700 text-white px-4 py-2 w-40 mt-5">
						Login
					</button>
				</div>
				<h2 className="text-m mt-15 mb-7">
					Not a member yet?{" "}
					<Link href={"/register"} className="border-b">
						Register
					</Link>
				</h2>
			</form>
		</Layout>
	);
}
