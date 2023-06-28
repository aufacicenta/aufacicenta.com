import { ReactNode } from "react";

import { PromptWarsMarketContractValues } from "providers/near/contracts/prompt-wars/prompt-wars.types";

export type PromptInputCardProps = {
  onSubmit: (value: string) => void;
  onClickFAQsButton: () => void;
  marketContractValues: PromptWarsMarketContractValues;
  children?: ReactNode;
  className?: string;
};
