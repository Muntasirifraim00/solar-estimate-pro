import { createFileRoute } from "@tanstack/react-router";
import {
  Sun,
  Zap,
  Ruler,
  Printer,
  CheckCircle2,
  AlertCircle,
  Wallet,
  ClipboardList,
} from "lucide-react";
import sunclickLogoAsset from "@/assets/sunclick-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "১৮০ কিলোওয়াট অন-গ্রিড সোলার — প্রাথমিক কোটেশন" },
      {
        name: "description",
        content:
          "১৬,০০০ বর্গফুট ছাদে ১৮০ kW অন-গ্রিড সোলার সিস্টেমের প্রাথমিক কোটেশন, পণ্য তালিকা ও কাজের পরিধি।",
      },
      { property: "og:title", content: "১৮০ kW অন-গ্রিড সোলার কোটেশন" },
      {
        property: "og:description",
        content:
          "সম্পূর্ণ সেটআপের পণ্য তালিকা, পরিমাণ ও কাজের পরিধি — বাংলাদেশের বাজারে উপলভ্য পণ্য ধরে।",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: QuotationPage,
});

/* ---------------- ডেটা ---------------- */

const scopeIncluded = [
  "সাইট সার্ভে, স্ট্রাকচারাল ও ইলেকট্রিক্যাল ডিজাইন",
  "সম্পূর্ণ সরবরাহ, পরিবহন ও ছাদে ওঠানো",
  "ইনস্টলেশন, কমিশনিং ও পারফরম্যান্স টেস্ট",
  "নেট-মিটারিং আবেদন ও ইউটিলিটি লিয়েজন",
  "১ বছর ফ্রি সার্ভিস (৪টি ভিজিট) ও অনলাইন মনিটরিং সেটআপ",
];

const scopeExcluded = [
  "VAT / TAX ও ইউটিলিটি সিকিউরিটি ডিপোজিট",
  "ছাদের সিভিল/ওয়াটারপ্রুফিং কাজ বা কাঠামো শক্তিশালীকরণ",
  "ট্রান্সফরমার আপগ্রেড বা নতুন সংযোগ ফি",
  "ব্যাটারি ব্যাকআপ (অন-গ্রিডে প্রয়োজন নেই)",
  "ছাদে ওঠার সিঁড়ি/লিফট ও নিরাপত্তা রেলিং নির্মাণ",
];

const commercialTerms = [
  ["পেমেন্ট শর্ত", "৪০% অগ্রিম, ৪০% মালামাল সাইটে, ২০% কমিশনিংয়ের পর"],
  ["সরবরাহ ও ইনস্টলেশন", "কার্যাদেশের পর ৮–১০ সপ্তাহ"],
  ["কোটেশনের মেয়াদ", "ইস্যুর তারিখ থেকে ১৫ দিন"],
  ["ওয়ার্কম্যানশিপ ওয়ারেন্টি", "২ বছর (ইনস্টলেশন ও BOS)"],
  ["বার্ষিক রক্ষণাবেক্ষণ (AMC)", "১ম বছরের পর ঐচ্ছিক"],
  ["পারফরম্যান্স গ্যারান্টি", "প্রথম বছরে ন্যূনতম ২.৬০ লাখ ইউনিট"],
];



/* ---------------- পেজ ---------------- */

function QuotationPage() {
  return (
    <div className="min-h-screen py-6 sm:py-10 print:py-0">
      <div className="mx-auto max-w-4xl px-3 sm:px-6">
        {/* প্রিন্ট বাটন */}
        <div className="no-print mb-4 flex justify-end">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Printer className="h-4 w-4" />
            প্রিন্ট / PDF সেভ করুন
          </button>
        </div>

        <article className="print-page overflow-hidden rounded-xl border border-brand-red/20 bg-card shadow-xl">
          {/* হেডার */}
          <header className="quotation-header relative border-b border-brand-red/20 bg-brand-red-soft px-6 py-6 sm:px-10">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-brand-red" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <img
                  src={sunclickLogoAsset.url}
                  alt="SUNCLICK Global Limited"
                  className="brand-logo h-auto w-48 sm:w-64"
                />
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-red">
                  <Sun className="h-4 w-4" /> সম্ভাব্য মূল্য প্রাক্কলন / কোটেশন
                </p>
                <h1 className="font-display mt-2 border-l-4 border-brand-red pl-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  ১৮০ কিলোওয়াট অন-গ্রিড
                  <br />
                  সোলার পাওয়ার সিস্টেম
                </h1>
                <p className="mt-3 max-w-xl text-sm text-ink-soft">
                  ছাদের আয়তন: ১৬,০০০ বর্গফুট • নেট-মিটারিং ভিত্তিক থ্রি-ফেজ
                  অন-গ্রিড সিস্টেম • বাংলাদেশের বাজারে উপলভ্য পণ্য
                </p>
              </div>
              <div className="hidden shrink-0 rounded-xl border border-brand-red/20 bg-brand-red-soft p-4 text-center sm:block">
                <p className="text-xs text-ink-soft">তারিখ</p>
                <p className="font-semibold">সেপ্টেম্বর ২০২৬</p>
              </div>
            </div>
          </header>

          <main className="space-y-8 px-6 py-8 sm:px-10">
            {/* ছাদ সম্ভাব্যতা */}
            <section aria-labelledby="feasibility" className="print-keep">
              <h2
                id="feasibility"
                className="font-display flex items-center gap-2 text-xl font-bold text-foreground"
              >
                 <Ruler className="h-5 w-5 text-brand-red" />
                আপনার ছাদে কি ১৮০ kW সম্ভব?
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-brand-red/20 bg-brand-red-soft p-4">
                  <p className="text-sm text-ink-soft">ছাদের মোট জায়গা</p>
                  <p className="mt-1 text-2xl font-bold">১৬,০০০ বর্গফুট</p>
                </div>
                <div className="rounded-lg border border-brand-red/20 bg-brand-red-soft p-4">
                  <p className="text-sm text-ink-soft">
                    ১৮০ kW-এর জন্য প্রয়োজন (সারি-ফাঁকাসহ)
                  </p>
                  <p className="mt-1 text-2xl font-bold">≈ ৯,০০০ বর্গফুট</p>
                </div>
                <div className="rounded-lg border border-brand-red/20 bg-card p-4 shadow-sm">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-brand-red">
                    <CheckCircle2 className="h-4 w-4" /> হ্যাঁ, আরামে করা যাবে
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    ছাদের মাত্র ~৫৬% লাগবে; বাকি জায়গা হাঁটার পথ ও
                    মেইনটেন্যান্সের জন্য খালি থাকবে।
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink-soft">
                হিসাব: ৬২০ Wp-এর একটি প্যানেলের আকার প্রায় ২৭ বর্গফুট। ২৯৬টি
                প্যানেল + সারির মাঝে হাঁটার ফাঁকা ধরে মোট ~৯,০০০ বর্গফুট ধরা
                হয়েছে। ছাদ যদি ছায়ামুক্ত (পানির ট্যাংক, পাশের বিল্ডিং, গাছ
                ইত্যাদি নেই) হয়, তাহলে কোনো সমস্যা নেই।
              </p>
            </section>

            {/* সিস্টেম সামারি */}
            <section aria-labelledby="summary" className="print-keep">
              <h2
                id="summary"
                className="font-display flex items-center gap-2 text-xl font-bold text-foreground"
              >
                 <Zap className="h-5 w-5 text-brand-red" />
                সিস্টেমের এক নজরে
              </h2>
              <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["মোট ক্ষমতা", "১৮৩.৫ kWp"],
                  ["প্যানেল", "২৯৬ পিস × ৬২০ Wp"],
                  ["ইনভার্টার", "৩ পিস × ৬০ kW"],
                  ["ধরন", "অন-গ্রিড (নেট-মিটারিং)"],
                ].map(([k, v]) => (
                   <div key={k} className="rounded-lg border border-brand-red/15 border-t-2 border-t-brand-red bg-card p-4">
                    <dt className="text-xs text-muted-foreground">{k}</dt>
                    <dd className="mt-1 font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>


            {/* কাজের পরিধি */}
            <section aria-labelledby="scope" className="print-keep">
              <h2
                id="scope"
                className="font-display flex items-center gap-2 text-xl font-bold text-foreground"
              >
                <ClipboardList className="h-5 w-5 text-brand-red" />
                কাজের পরিধি — কী অন্তর্ভুক্ত, কী নয়
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-brand-red/20 bg-card p-4">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-brand-red">
                    <CheckCircle2 className="h-4 w-4" /> অন্তর্ভুক্ত
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
                    {scopeIncluded.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-brand-red/20 bg-brand-red-soft p-4">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-brand-red">
                    <AlertCircle className="h-4 w-4" /> অন্তর্ভুক্ত নয়
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
                    {scopeExcluded.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* বাণিজ্যিক শর্ত */}
            <section aria-labelledby="commercial" className="print-keep">
              <h2
                id="commercial"
                className="font-display flex items-center gap-2 text-xl font-bold text-foreground"
              >
                <Wallet className="h-5 w-5 text-brand-red" />
                পেমেন্ট, সময়সীমা ও ওয়ারেন্টি
              </h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {commercialTerms.map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-lg border border-brand-red/15 border-l-4 border-l-brand-red bg-card p-4"
                  >
                    <dt className="text-xs font-semibold text-brand-red">{k}</dt>
                    <dd className="mt-1 text-sm text-ink-soft">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>



            {/* শর্তাবলী */}
            <section aria-labelledby="terms" className="print-keep print-new-page rounded-lg border-l-4 border-brand-red bg-brand-red-soft p-5 text-sm">
              <h2
                id="terms"
                className="font-display flex items-center gap-2 text-base font-bold"
              >
                 <AlertCircle className="h-4 w-4 text-brand-red" />
                জেনে রাখুন
              </h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-soft">
                <li>
                  এটি বাজারভিত্তিক <strong>আনুমানিক প্রাক্কলন</strong> — চূড়ান্ত
                  দাম ব্র্যান্ড, সাইট ভিজিট ও চলতি ডলার রেটের ওপর নির্ভর করবে
                  (±১০% হতে পারে)।
                </li>
                <li>
                  নেট-মিটারিং অনুমোদনের জন্য সংশ্লিষ্ট বিদ্যুৎ সংস্থায়
                  (DPDC/DESCO/PDB/REB) আবেদন করতে হবে — তাদের ট্রান্সফরমার
                  ক্ষমতার সর্বোচ্চ ৭০% পর্যন্ত সোলার অনুমোদন হয়।
                </li>
                <li>
                  সাধারণ ওয়ারেন্টি: প্যানেল ১২ বছর (প্রোডাক্ট) + ৩০ বছর
                  (পারফরম্যান্স), ইনভার্টার ৫–১০ বছর।
                </li>
                <li>ব্যাটারি লাগবে না — অন-গ্রিড সিস্টেমে গ্রিডই ব্যাকআপ।</li>
                <li>VAT/TAX ও বিদ্যুৎ সংস্থার সিকিউরিটি ডিপোজিট এই হিসাবের বাইরে।</li>
              </ul>
            </section>
          </main>

          <footer className="print-keep border-t border-brand-red/20 bg-brand-red-soft px-6 py-5 text-center text-xs text-ink-soft sm:px-10">
            <p className="font-bold text-brand-red">SUNCLICK GLOBAL LIMITED</p>
            <p className="mt-1">www.sunclickgloballimited.com</p>
            <p className="mt-2">
              এই কোটেশনটি ১৮০ kW অন-গ্রিড সোলার প্রকল্পের পরিকল্পনার উদ্দেশ্যে
              তৈরি — চূড়ান্ত প্রস্তাবের জন্য সাইট পরিদর্শন প্রয়োজন।
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}
