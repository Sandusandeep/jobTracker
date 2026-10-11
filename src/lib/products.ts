export type TemplateProduct = {
  id: "tracker" | "interview" | "complete";
  title: string;
  eyebrow: string;
  description: string;
  includes: string[];
  symbol: string;
  checkoutUrl?: string;
  checkoutInvalid: boolean;
};

function resolveCheckoutUrl(value: string | undefined) {
  if (!value) return { checkoutUrl: undefined, checkoutInvalid: false };

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      return { checkoutUrl: undefined, checkoutInvalid: true };
    }
    return { checkoutUrl: url.toString(), checkoutInvalid: false };
  } catch (error) {
    if (error instanceof TypeError) {
      return { checkoutUrl: undefined, checkoutInvalid: true };
    }
    throw error;
  }
}

const products: Omit<TemplateProduct, "checkoutUrl" | "checkoutInvalid">[] = [
  {
    id: "tracker",
    title: "The Job Search System",
    eyebrow: "START HERE",
    description: "A tidy home for every role, follow-up, and next step—without a complicated app.",
    includes: [
      "Application tracker for Sheets or Excel",
      "Company research worksheet",
      "Weekly search planner",
    ],
    symbol: "01",
  },
  {
    id: "interview",
    title: "The Interview Story Bank",
    eyebrow: "FEEL MORE PREPARED",
    description: "Capture real examples from your work and shape them into clear, specific interview stories.",
    includes: [
      "STAR story prompts and worksheet",
      "Question practice tracker",
      "Before-the-interview checklist",
    ],
    symbol: "02",
  },
  {
    id: "complete",
    title: "The Complete Job Kit",
    eyebrow: "THE WHOLE SYSTEM",
    description: "The application workflow and interview preparation templates together in one practical kit.",
    includes: [
      "Everything in both smaller kits",
      "Offer comparison worksheet",
      "Editable, printer-friendly formats",
    ],
    symbol: "03",
  },
];

const checkoutUrls = {
  tracker: process.env.NEXT_PUBLIC_CHECKOUT_TRACKER_URL,
  interview: process.env.NEXT_PUBLIC_CHECKOUT_INTERVIEW_URL,
  complete: process.env.NEXT_PUBLIC_CHECKOUT_COMPLETE_URL,
};

export const templateProducts: TemplateProduct[] = products.map((product) => {
  const checkout = resolveCheckoutUrl(checkoutUrls[product.id]);
  return { ...product, ...checkout };
});
