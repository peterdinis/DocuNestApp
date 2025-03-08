import { FC } from "react";
import { Search, Share2, Shield } from "lucide-react";

const Features: FC = () => {
    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                            Features
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                            Everything You Need to Manage Documents
                        </h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl">
                            Our platform provides all the tools you need to organize, find, and collaborate on your documents.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                    <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                            <Search className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Smart Search</h3>
                        <p className="text-center text-muted-foreground">
                            Find any document instantly with our powerful search engine that indexes all your content.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                            <Share2 className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Easy Sharing</h3>
                        <p className="text-center text-muted-foreground">
                            Share documents securely with team members or external partners with granular permissions.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Enterprise Security</h3>
                        <p className="text-center text-muted-foreground">
                            Keep your documents safe with enterprise-grade encryption and access controls.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features