"use client";

import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperTitle,
  StepperTrigger,
} from "@zeron-ui/ui/stepper";

const steps = [
  {
    value: "placed",
    title: "Order Placed",
    description: "Your order has been successfully placed",
  },
  {
    value: "processing",
    title: "Processing",
    description: "We're preparing your items for shipment",
  },
  {
    value: "shipped",
    title: "Shipped",
    description: "Your order is on its way to you",
  },
  {
    value: "delivered",
    title: "Delivered",
    description: "Order delivered to your address",
  },
];

export default function StepperVerticalDemo() {
  return (
    <Stepper className="w-full" defaultValue="shipped" orientation="vertical">
      <StepperList className="items-start">
        {steps.map((step) => (
          <StepperItem key={step.value} value={step.value}>
            <StepperTrigger className="not-last:pb-6">
              <StepperIndicator />
              <div className="flex flex-col gap-1">
                <StepperTitle>{step.title}</StepperTitle>
                <StepperDescription>{step.description}</StepperDescription>
              </div>
            </StepperTrigger>
          </StepperItem>
        ))}
      </StepperList>
      {steps.map((step) => (
        <StepperContent
          className="flex flex-col gap-4 rounded-lg border bg-card p-6 text-card-foreground"
          key={step.value}
          value={step.value}
        >
          <div className="flex flex-col gap-px">
            <h4 className="font-semibold">{step.title}</h4>
            <p className="text-muted-foreground text-sm">{step.description}</p>
          </div>
          <p className="text-sm">
            This is the content for {step.title}. You can add forms,
            information, or any other content here.
          </p>
        </StepperContent>
      ))}
    </Stepper>
  );
}
