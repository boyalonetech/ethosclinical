"use client";
import { FAQS } from "@/app/data/about";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const ANSWERS = [
    "Ethos serves mental health and human services practitioners across diverse settings—including out-of-home care, NDIS, trauma programs, and Aboriginal Community Controlled Organisations—as well as the organisations that employ them.",
    "Clinical supervision is a structured, regular process where practitioners reflect on their casework, ethical challenges, and professional practice with an experienced supervisor to support both quality care and practitioner wellbeing.",
    "Unlike compliance-focused models, Ethos uses the S.O. Reflective Practice Framework to engage the full clinical, ethical, and human dimensions of practice. We go beyond checklists to create genuine, lasting change.",
    "Reflective supervision creates protected space for practitioners to process emotional weight, identify stuck points, and develop thoughtful responses to complex situations—reducing burnout and moral injury over time.",
    "Yes. Ethos offers tailored 12-month organisational programs, group supervision models, and leadership consultation alongside individual sessions.",
  ];

  return (
    <section className="bg-stone-50 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-normal text-stone-900 text-center mb-12 font-['Bona_Nova',serif] tracking-tight">
          Questions? We&apos;re Here to Help.
        </h2>

        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {FAQS.map((question, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="flex flex-col gap-2">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full bg-white rounded-xl px-5 py-5 flex items-start justify-between gap-4 text-left hover:bg-stone-50 transition-colors border border-stone-100 hover:border-stone-200"
                >
                  <span className="text-gray-600 text-base font-normal leading-snug flex-1">
                    {question}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-brown flex items-center justify-center shrink-0 mt-0.5">
                    {isOpen ? (
                      <Minus size={14} className="text-white" />
                    ) : (
                      <Plus size={14} className="text-white" />
                    )}
                  </span>
                </button>

                {/* Answer panel directly below this question */}
                {isOpen && (
                  <div className="bg-stone-100 rounded-xl px-5 py-4 text-gray-600 text-sm leading-relaxed border border-stone-200">
                    {ANSWERS[i]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}