"use client";

import { Button } from "../ui/button";

interface PricingProps {
  title: string;
  text: string;
  price?: number;
  devise?: string;
  Features: string[];
  button: string;
}

export interface ServicesProps {
  id: number;
  name: string;
  description?: string;
  price?: number;
  category?: number;
}

const Princing = ({ Array }: { Array: PricingProps[] }) => {
  return (
    <>
      {Array.map((service: PricingProps, index: number) => (
        <div
          key={index}
          className="flex flex-col gap-6 rounded-xl border-2 p-4"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{service.title}</h3>

            <p className="px-1 text-sm">{service.text}</p>
          </div>

          {service.price && (
            <div className="text-4xl font-bold">
              {service.price}
              <span className="text-xl">{service.devise}</span>
            </div>
          )}

          <ul className="flex flex-col gap-2 text-xs">
            {service.Features.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-destructive"></span>
                {feature}
              </li>
            ))}
          </ul>

          <Button
            variant={"primary"}
            className="rounded-sm transition duration-300"
          >
            {service.button}
          </Button>
        </div>
      ))}
    </>
  );
};

export default Princing;
