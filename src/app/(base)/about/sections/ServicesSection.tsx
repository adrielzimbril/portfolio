import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function ServicesSection() {
  const services = [
    {
      icon: "/playing-cards.svg",
      title: "Pour les entreprises",
      description:
        "Je conçois des interfaces conviviales et précieuses pour les clients et faciles à mettre en œuvre pour les ingénieurs.",
    },
    {
      icon: "/symbol-1.svg",
      title: "Pour les startups",
      description:
        "J'aide à identifier le problème et à concevoir un MVP. Je vous conseille sur les outils de développement .",
    },
    {
      icon: "/shape.svg",
      title: "Pour les équipes produits",
      description:
        "Je conçois des expériences de croissance et aide votre équipe à envisager les défis différemment pour créer un meilleur produit.",
    },
  ];

  return (
    <section className="w-full bg-greys-00 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)] mb-16">
          Ce que je peux faire pour vous.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`bg-greys-01 rounded-[48px] border-[16px] border-[#f9f9f9] overflow-hidden p-4 ${
                index === 2 ? "lg:col-span-2 lg:max-w-[542px] lg:mx-auto" : ""
              }`}
            >
              <CardContent className="bg-white p-8 h-full flex flex-col justify-center gap-2.5">
                <div className="inline-flex items-center gap-[21.11px] p-[16.89px] w-fit bg-[#f9f9f9] rounded-[211.11px] overflow-hidden mb-2">
                  {index === 1 ? (
                    <div className="relative w-12 h-12">
                      <div className="relative w-[41px] h-[37px] top-[5px] left-[3px]">
                        <div className="relative h-[37px]">
                          <img
                            className="absolute w-[18px] h-[30px] top-px left-[3px]"
                            alt="Vector"
                            src="/vector-1965.svg"
                          />
                          <img
                            className="absolute w-[18px] h-[30px] top-px left-[21px]"
                            alt="Vector"
                            src="/vector-1966.svg"
                          />
                          <img
                            className="absolute w-9 h-[15px] top-[22px] left-[3px]"
                            alt="Vector"
                            src="/vector-1967.svg"
                          />
                          <img
                            className="absolute w-[41px] h-[37px] top-0 left-0"
                            alt="Symbol"
                            src={service.icon}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      className="w-12 h-12"
                      alt={service.title}
                      src={service.icon}
                    />
                  )}
                </div>

                <div className="flex flex-col gap-[6.98px]">
                  <h3 className="[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[29.6px] tracking-[0.12px] leading-[35.6px]">
                    {service.title}
                  </h3>
                  <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px]">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
