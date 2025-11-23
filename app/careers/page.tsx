import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
    const jobs = [
        {
            id: "senior-full-stack-engineer",
            title: "Senior Full Stack Engineer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time",
            description:
                "We are looking for an experienced Full Stack Engineer to join our team and help build the next generation of digital solutions.",
        },
    ];

    return (
        <main className="min-h-screen pt-24 pb-16">
            <section className="container mx-auto px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                        Join Our Team
                    </h1>
                    <p className="text-muted-foreground text-lg sm:text-xl mb-12 max-w-2xl mx-auto">
                        Build the future with us. We&apos;re looking for passionate individuals to help us craft precision-engineered digital solutions.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl mt-16">
                    <h2 className="text-2xl font-semibold mb-8">Open Positions</h2>
                    <div className="grid gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-lg"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase className="size-4" />
                                                {job.department}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="size-4" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="size-4" />
                                                {job.type}
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground">
                                            {job.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <Button asChild className="w-full sm:w-auto">
                                            <Link href={`/contact?subject=Application for ${job.title}`}>
                                                Apply Now <ArrowRight className="ml-2 size-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
