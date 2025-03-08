import { Button } from "@/components/ui/button";
import type { FC } from "react";

const CTA: FC = () => {
	return (
		<section className="py-20 text-white">
			<div className="container mx-auto text-center">
				<h2 className="text-3xl font-bold mb-6">
					Simplify Your Document Management
				</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto">
					Join teams already using DocuNest to efficiently organize and
					collaborate on documents.
				</p>
				<Button size="lg" variant="secondary">
					Start Your Free Trial
				</Button>
			</div>
		</section>
	);
};

export default CTA;
