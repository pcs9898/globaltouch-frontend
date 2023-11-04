import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import PaymentCompletePresenter from "../../templates/paymentComplete/paymentComplete.presenter";

interface IPaymentCompleteContainerProps {
  query: any;
}

export default function PaymentCompleteContainer({
  query,
}: IPaymentCompleteContainerProps) {
  const router = useRouter();
  const toast = useToast();

  console.log(query);

  useEffect(() => {
    const project_id = query.merchant_uid.slice(0, -4);

    if (query.error_msg) {
      toast({
        status: "error",
        title: query.error_msg,
      });
    } else {
      toast({
        status: "success",
        title: "success",
      });
      router.push(`/project/${project_id}`);
    }
  }, []);

  return <PaymentCompletePresenter />;
}
