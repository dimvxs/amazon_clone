"use client";

import { Button } from "@/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5012";

export default function EmailConfirmationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading"
    );

    useEffect(() => {
        const confirmEmail = async () => {
            if (!token) {
                setStatus("error");
                return;
            }

            const res = await fetch(`${API_BASE}/api/user/confirm-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                }),
            });

            if (!res.ok) {
                console.error("Failed to confirm email:", res.status);
                setStatus("error");
                return;
            }

            setStatus("success");
        };

        confirmEmail();
    }, [token]);

    const title =
        status === "loading"
            ? "Email Confirmation"
            : status === "success"
                ? "Email Confirmed"
                : "Confirmation Failed";

    const text =
        status === "loading"
            ? "We are confirming your email. Please wait."
            : status === "success"
                ? "Congratulations! Your email has been successfully confirmed. You can now login to the application."
                : "Confirmation link is invalid or expired.";

    return (
        <div className="w-full items-center flex flex-col gap-[50px] layout-px pt-[clamp(80px,15vw,200px)] pb-[80px]">
            <h2 className="text-main font-semibold text-[40px] leading-[44px] text-center text-white">
                {title}
            </h2>

            <div className="size-[clamp(100px,20vw,150px)] text-accent-muted">
                {status === "error" ? (
                    <div className="h-full w-full rounded-full border-[10px] border-red-500 flex items-center justify-center text-red-500 text-[64px]">
                        !
                    </div>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        className="h-full w-full"
                        fill="none"
                    >
                        <defs>
                            <mask id="check-cutout">
                                <rect width="100" height="100" fill="white" />
                                <path
                                    d="M30 52L45 67L72 38"
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </mask>
                        </defs>
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="currentColor"
                            mask="url(#check-cutout)"
                        />
                    </svg>
                )}
            </div>

            <p className="font-normal text-[18px] leading-[24px] text-center text-main/80 max-w-[450px]">
                {text}
            </p>

            <Button
                variant="primary"
                hoverVariant="accent_muted"
                py={10}
                onClick={() => router.push("/login")}
            >
                Go to Login
            </Button>
        </div>
    );
}