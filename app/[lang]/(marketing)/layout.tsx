import { Suspense } from "react";

import { ModalProvider } from "@/components/modal-provider";
import { NavBar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import type { Locale } from "@/config/i18n-config";
import { getMarketingConfig } from "@/config/ui/marketing";
import { getDictionary } from "@/lib/get-dictionary";

export default async function MarketingLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{
      lang: Locale;
    }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const {
    children
  } = props;

  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <NavBar
          items={
            (await getMarketingConfig({ params: { lang: `${lang}` } })).mainNav
          }
          params={{ lang: `${lang}` }}
          scroll
          marketing={dict.marketing}
          dropdown={dict.dropdown}
        />
      </Suspense>
      <ModalProvider dict={dict.login} />
      <main className="flex-1">{children}</main>
      <SiteFooter
        className="border-t border-border"
        params={{ lang: `${lang}` }}
        dict={dict.common}
      />
    </div>
  );
}
