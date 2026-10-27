import { HomeView } from "@/components/HomeView";
import { SITE } from "@/lib/site";

export default function Page() {
  const ld = {
    "@context": "https://schema.org", "@type": "LodgingBusiness", name: SITE.name, telephone: SITE.phoneIntl,
    address: { "@type": "PostalAddress", addressLocality: "Aït Hmad / Dayet Aoua", addressRegion: "Fès-Meknès", addressCountry: "MA" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <HomeView />
    </>
  );
}
