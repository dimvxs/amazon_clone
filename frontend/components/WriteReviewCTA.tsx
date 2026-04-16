import CtaButton from "./CtaButton";

type Props = {
  onClick: () => void;
};

export default function WriteReviewCTA({ onClick }: Props) {
  return (
    <div className="layout-product-lg:w-[283px] w-full max-w-[283px] flex flex-col gap-[13px]">
      <p className="font-bold text-[19px] leading-[24px]">
        Review this product
      </p>
      <p className="text-[14px] leading-[20px]">
        Share your thoughts with other customers
      </p>

      <CtaButton onClick={onClick} className="text-body border-interactive">
        Write a customer review
      </CtaButton>
    </div>
  );
}
