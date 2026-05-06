"use client";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperTitle,
  StepperTrigger,
} from "@zeron-ui/ui/stepper";

const steps = [
  {
    value: "account",
    title: "Account Setup",
    description: "Create your account and verify email",
  },
  {
    value: "profile",
    title: "Profile Information",
    description: "Add your personal details and preferences",
  },
  {
    value: "payment",
    title: "Payment Details",
    description: "Set up billing and payment methods",
  },
  {
    value: "complete",
    title: "Complete Setup",
    description: "Review and finish your account setup",
  },
];

export default function StepperExample() {
  return (
    <Stepper className="w-full" defaultValue="account">
      <StepperList>
        {steps.map((step) => (
          <StepperItem key={step.value} value={step.value}>
            <StepperTrigger className="items-start">
              <StepperIndicator />
              <div className="flex flex-col gap-1 items-center">
                <StepperTitle>{step.title}</StepperTitle>
              </div>
            </StepperTrigger>
          </StepperItem>
        ))}
      </StepperList>
      {steps.map((step) => (
        <StepperContent
          className="flex flex-col items-center gap-4 rounded-md border bg-card p-4 text-card-foreground"
          key={step.value}
          value={step.value}
        >
          <div className="flex flex-col items-center gap-px text-center">
            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
          <p className="text-sm">Content for {step.title} goes here.</p>
        </StepperContent>
      ))}
    </Stepper>
  );
}
