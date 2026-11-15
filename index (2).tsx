import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/jetour-profile.jpg.asset.json";
import carPhoto from "@/assets/jetour-x50.jpg.asset.json";
import { campaignPrices, getCampaignProductLink, getCampaignTicketCount } from "@/lib/campaign";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sorteio Jetour X50 Plus | Numeiro Barbosa" },
      {
        name: "description",
        content:
          "Participa na campanha especial de Numeiro Barbosa para concorrer a um Jetour X50 Plus.",
      },
      { property: "og:title", content: "Sorteio Jetour X50 Plus | Numeiro Barbosa" },
      {
        property: "og:description",
        content:
          "Participa na campanha especial de Numeiro Barbosa para concorrer a um Jetour X50 Plus.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [selectedPrice, setSelectedPrice] = useState<number>(campaignPrices[0]);
  const ticketCount = getCampaignTicketCount(selectedPrice);
  const productLink = getCampaignProductLink(selectedPrice);

  return (
    <main className="min-h-screen bg-background pb-12">
      <div className="campaign-shell">
        <header className="flex flex-col items-center pb-8 pt-10 text-center sm:pt-14">
          <span className="campaign-wordmark text-5xl text-foreground sm:text-6xl">JETOUR</span>
          <span className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
            — Drive Your Future —
          </span>
        </header>

        <section className="flex flex-col items-center border-b border-border pb-8 text-center">
          <img
            src={profilePhoto.url}
            alt="Numeiro Barbosa"
            className="size-48 rounded-full border-[5px] border-primary/20 object-cover sm:size-56"
          />
          <h1 className="mt-6 flex flex-wrap items-center justify-center gap-2 text-2xl font-extrabold text-foreground sm:text-3xl">
            NUMEIRO BARBOSA <BadgeCheck aria-label="Perfil verificado" className="size-7 fill-sky-500 text-background" />
          </h1>
          <span className="mt-3 rounded-md bg-primary px-4 py-1.5 text-sm font-bold uppercase text-primary-foreground">
            Sorteio
          </span>
        </section>

        <section className="py-8" aria-label="Sobre a campanha">
          <div className="flex items-center justify-center gap-2 text-center text-sm font-semibold uppercase text-foreground sm:text-base">
            <Clock3 className="size-5 text-primary" aria-hidden="true" />
            Uma oportunidade especial
          </div>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            O influenciador e empresário Numeiro está associado a uma campanha especial de premiação, onde podes ter a oportunidade de ganhar um incrível Jetour X50 Plus! 🚘🔥
          </p>
        </section>

        <section className="space-y-4 pb-7" aria-labelledby="participar-titulo">
          <h2 id="participar-titulo" className="text-xl font-bold text-foreground sm:text-2xl">
            Como participar?
          </h2>
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            É muito simples: cada ficha custa <strong className="font-semibold text-foreground">1.000 Kz</strong> e habilita-te a ganhar este automóvel.
          </p>
        </section>

        <div className="campaign-rule mb-5" aria-hidden="true" />
        <img
          src={carPhoto.url}
          alt="Automóvel Jetour X50 Plus preto"
          className="aspect-[16/9] w-full object-contain"
        />

        <section className="pt-5" aria-label="Escolha a sua participação">
          <div className="grid grid-cols-2 gap-3">
            {campaignPrices.map((price) => (
              <Button
                key={price}
                type="button"
                variant={selectedPrice === price ? "default" : "outline"}
                aria-pressed={selectedPrice === price}
                onClick={() => setSelectedPrice(price)}
                className="h-14 rounded-lg text-base font-bold sm:text-lg"
              >
                {price.toLocaleString("pt-PT")}
                <span className="lowercase"> Kz</span>
              </Button>
            ))}
          </div>
          <p className="mt-5 text-center text-base text-muted-foreground">
            {ticketCount} {ticketCount === 1 ? "ficha" : "fichas"} · {selectedPrice.toLocaleString("pt-PT")} Kz
          </p>
          {productLink ? (
            <Button asChild className="mt-4 h-14 w-full rounded-lg text-lg font-bold">
              <a href={productLink} target="_blank" rel="noopener noreferrer">
                Comprar ficha
              </a>
            </Button>
          ) : (
            <Button type="button" disabled className="mt-4 h-14 w-full rounded-lg text-lg font-bold">
              Link de compra em breve
            </Button>
          )}
        </section>

        <section className="mt-8 space-y-3 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
          <p className="font-semibold text-foreground">Não percas esta oportunidade! 🍀</p>
          <p>
            Consulta o regulamento e a data oficial do sorteio antes de participar. Esta campanha não é uma página oficial da Jetour.
          </p>
        </section>
      </div>
    </main>
  );
}
