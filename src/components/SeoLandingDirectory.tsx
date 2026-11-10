import React, { useState, useEffect } from 'react';
import { SEO_LANDING_PAGES, SeoLandingPage } from '../data/seoPagesData';
import { Search, ArrowRight, Link2, HelpCircle, Cpu } from 'lucide-react';

interface SeoLandingDirectoryProps {
  onSelectCtaPreset: (ctaLabel: string, useCase: string) => void;
}

const CLUSTERS: ('All' | SeoLandingPage['cluster'])[] = [
  'All',
  'Infrastructure & AIOps',
  'Service Desk & Automation',
  'Cloud & Security',
  'Enterprise AI & RAG'
];

export const SeoLandingDirectory: React.FC<SeoLandingDirectoryProps> = ({
  onSelectCtaPreset
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(SEO_LANDING_PAGES[0].slug);
  const [clusterFilter, setClusterFilter] = useState<'All' | SeoLandingPage['cluster']>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPages = SEO_LANDING_PAGES.filter((page) => {
    const matchesCluster = clusterFilter === 'All' || page.cluster === clusterFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      page.targetKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.h1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.technicalOverview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCluster && matchesSearch;
  });

  const activePage =
    SEO_LANDING_PAGES.find((p) => p.slug === selectedSlug) ||
    filteredPages[0] ||
    SEO_LANDING_PAGES[0];

  useEffect(() => {
    if (activePage) {
      document.title = activePage.metaTitle;
    }
  }, [activePage]);

  return (
    <section id="solution-directory" className="py-16 lg:py-24 border-b border-slate-200 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="text-xs font-medium text-slate-500 mb-2">
              <span>Dedicated Solution Landing Pages</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>13 Technical SEO Architecture Hubs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Specialized AI &amp; Infrastructure Solution Directory
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Explore our 13 dedicated technical landing pages—each featuring domain-specific architecture patterns, measurable production use cases, engineering FAQs, internal cross-linking, and conversion paths.
            </p>
          </div>

          {/* Search & Cluster Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 13 solution pages..."
                className="pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 w-full sm:w-56"
              />
            </div>
          </div>
        </div>

        {/* Cluster Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 mb-8 w-fit">
          {CLUSTERS.map((cluster) => (
            <button
              key={cluster}
              onClick={() => setClusterFilter(cluster)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                clusterFilter === cluster
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cluster}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation List of 13 SEO Pages */}
          <div className="lg:col-span-4 space-y-1.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredPages.map((page, index) => {
              const isSelected = page.slug === activePage.slug;
              return (
                <button
                  key={page.slug}
                  onClick={() => setSelectedSlug(page.slug)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className={isSelected ? 'text-blue-300' : 'text-slate-500'}>
                      /{page.slug}
                    </span>
                    <span className={isSelected ? 'text-slate-400' : 'text-slate-400'}>
                      0{index + 1 < 10 ? index + 1 : ''}{index + 1 >= 10 ? index + 1 : ''}
                    </span>
                  </div>
                  <div className="text-xs font-bold mt-1">{page.targetKeyword}</div>
                </button>
              );
            })}
          </div>

          {/* Right Full Dedicated Landing Page View */}
          <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
            {/* SEO Metadata Preview Bar */}
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 mb-6">
              <div className="text-[11px] font-mono text-slate-500">
                Canonical Route: <span className="text-blue-700 font-semibold">/solutions/{activePage.slug}</span> · Cluster: {activePage.cluster}
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">
                {activePage.metaTitle}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {activePage.metaDescription}
              </div>
            </div>

            {/* Landing Page H1 & Overview */}
            <div className="mb-6">
              <div className="text-xs font-mono text-blue-700 mb-1">
                Target Vertical: {activePage.targetKeyword}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
                {activePage.h1}
              </h3>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                {activePage.technicalOverview}
              </p>
            </div>

            {/* Reference Architecture Flow */}
            <div className="p-4 rounded-lg bg-slate-900 text-slate-100 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>Reference Implementation Pipeline</span>
              </div>
              <div className="text-xs font-mono text-slate-200 leading-relaxed">
                {activePage.architecturePattern}
              </div>
            </div>

            {/* Concrete Production Use Cases */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3">
                Production Use Cases &amp; Commercial Impact
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePage.useCases.map((uc) => (
                  <div key={uc.title} className="p-4 rounded-lg bg-white border border-slate-200 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 mb-1.5">{uc.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">{uc.detail}</p>
                    </div>
                    <div className="pt-2.5 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                      Impact: {uc.measurableImpact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical FAQs */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 mb-3">
                <HelpCircle className="w-4 h-4 text-blue-700" />
                <span>Technical &amp; Operational FAQs</span>
              </div>
              <div className="space-y-3">
                {activePage.faqs.map((faq) => (
                  <div key={faq.question} className="p-4 rounded-lg bg-white border border-slate-200">
                    <div className="text-xs font-bold text-slate-900 mb-1">
                      {faq.question}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Cross-Links & Primary Conversion CTA */}
            <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
                  <Link2 className="w-3.5 h-3.5 text-blue-700" />
                  <span>Related Technical Solution Pages:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activePage.relatedSlugs.map((slug) => {
                    const linkedPage = SEO_LANDING_PAGES.find((p) => p.slug === slug);
                    if (!linkedPage) return null;
                    return (
                      <button
                        key={slug}
                        onClick={() => {
                          setClusterFilter('All');
                          setSearchQuery('');
                          setSelectedSlug(slug);
                        }}
                        className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:border-blue-600 text-xs font-medium text-blue-700 transition-colors cursor-pointer"
                      >
                        {linkedPage.targetKeyword}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => onSelectCtaPreset(activePage.primaryCta, activePage.presetUseCase)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{activePage.primaryCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
