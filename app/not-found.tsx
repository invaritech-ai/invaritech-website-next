import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden pt-24 md:pt-32 pb-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-4 text-center">
                <div className="relative mb-8 h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80">
                    {/* Light mode image */}
                    <div className="dark:hidden absolute inset-0">
                        <Image
                            src="/images/404-robot.png"
                            alt="Cute robot confused about the missing page"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    {/* Dark mode image */}
                    <div className="hidden dark:block absolute inset-0">
                        <Image
                            src="/images/404-robot-dark.png"
                            alt="Cute robot confused about the missing page"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
                <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Page Not Found
                </h1>
                <p className="mb-8 max-w-md text-base sm:text-lg text-muted-foreground px-4">
                    Oops! It looks like our little robot friend got lost. The
                    page you&apos;re looking for doesn&apos;t exist or has been
                    moved.
                </p>
                <Button asChild size="lg" className="gap-2">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
        </main>
    );
}
