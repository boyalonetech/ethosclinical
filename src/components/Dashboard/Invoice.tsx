"use client";

import React, { useState, useRef } from "react";
import {
  Download,
  FileText,
  Image as ImageIcon,
  User,
  Hash,
  CreditCard,
  MessageSquare,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { toast } from "sonner";
import Image from "next/image";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: string;
  price: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  clientName: string;
  items: InvoiceItem[];
  accountName: string;
  bsb: string;
  accountNumber: string;
  payId: string;
  companyAddress: string;
  companyWebsite: string;
  companyPhone: string;
}

export default function Invoice() {
  const [view, setView] = useState<"input" | "preview">("input");
  const [data, setData] = useState<InvoiceData>(() => ({
    invoiceNumber: "#000-000",
    date: new Date().toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    clientName: "",
    items: [
      { id: "1", description: "Counselling", quantity: "1hr", price: 150 },
    ],
    accountName: "ETHOS CLINICAL SUPERVISION",
    bsb: "062-111",
    accountNumber: "1139 1673",
    payId: "0491046780",
    companyAddress: "2148 Blacktown, Australia",
    companyWebsite: "www.ethosclinicalsupervision.com.au",
    companyPhone: "+61 491 046 780",
  }));

  const invoiceRef = useRef<HTMLDivElement>(null);

  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      return sum + qty * item.price;
    }, 0);
  };

  const addItem = () => {
    setData({
      ...data,
      items: [
        ...data.items,
        {
          id: Math.random().toString(36).substring(2, 9),
          description: "",
          quantity: "1",
          price: 0,
        },
      ],
    });
  };



  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    setData({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    });
  };

  const downloadImage = async () => {
    if (!invoiceRef.current) return;
    try {
      const dataUrl = await toPng(invoiceRef.current, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `invoice-${data.invoiceNumber}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Invoice downloaded as PNG");
    } catch {
      toast.error("Failed to generate image");
    }
  };

  const downloadPDF = async () => {
    if (!invoiceRef.current) return;
    try {
      const dataUrl = await toPng(invoiceRef.current, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 2,
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${data.invoiceNumber}.pdf`);
      toast.success("Invoice downloaded as PDF");
    } catch {
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#fcfbfa] overflow-hidden">
      {view === "input" ? (
        /* Input Configuration View */
        <div className="flex flex-col h-full w-full max-w-3xl mx-auto overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-[#7b8b60]/10 flex items-center justify-center text-[#7b8b60]">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brown tracking-tight">
                Invoice System
              </h2>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">
                Ethos Clinical Management
              </p>
            </div>
          </div>

          <div className="space-y-8 pb-20">
            {/* Metadata Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm">
              <h3 className="text-sm font-black text-brown mb-6 flex items-center gap-2 uppercase tracking-wider">
                <Hash size={18} className="text-[#7b8b60]" /> Document Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest ml-1">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={data.invoiceNumber}
                    onChange={(e) =>
                      setData({ ...data, invoiceNumber: e.target.value })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b8b60]/20 focus:border-[#7b8b60] transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest ml-1">
                    Date Text
                  </label>
                  <input
                    type="text"
                    value={data.date}
                    onChange={(e) => setData({ ...data, date: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b8b60]/20 focus:border-[#7b8b60] transition"
                  />
                </div>
              </div>
            </div>

            {/* Client Details */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm">
              <h3 className="text-sm font-black text-brown mb-6 flex items-center gap-2 uppercase tracking-wider">
                <User size={18} className="text-[#7b8b60]" /> Client Details
              </h3>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest ml-1">
                  Client Name
                </label>
                <input
                  type="text"
                  value={data.clientName}
                  onChange={(e) =>
                    setData({ ...data, clientName: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b8b60]/20 focus:border-[#7b8b60] transition"
                />
              </div>
            </div>

            {/* Table Items */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-brown flex items-center gap-2 uppercase tracking-wider">
                  <CreditCard size={18} className="text-[#7b8b60]" /> Line Items
                </h3>
                <button
                  onClick={addItem}
                  className="text-[10px] hidden font-black text-[#7b8b60] bg-[#7b8b60]/10 px-4 py-1.5 rounded-full uppercase tracking-widest hover:bg-[#7b8b60]/20 transition active:scale-95"
                >
                  Add Row
                </button>
              </div>

              <div className="space-y-4">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 bg-stone-50 border border-stone-100 rounded-2xl space-y-4"
                  >
                    <div className="flex gap-4">
                      <div className="flex-grow space-y-1.5">
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest ml-1">
                          Description
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Counselling Session"
                          value={item.description}
                          onChange={(e) =>
                            updateItem(item.id, "description", e.target.value)
                          }
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#7b8b60]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest ml-1">
                          Qty / Duration
                        </label>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(item.id, "quantity", e.target.value)
                          }
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#7b8b60]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest ml-1">
                          Rate ($)
                        </label>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "price",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#7b8b60]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm">
              <h3 className="text-sm font-black text-brown mb-6 flex items-center gap-2 uppercase tracking-wider">
                <MessageSquare size={18} className="text-[#7b8b60]" />{" "}
                Remittance Info
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={data.accountName}
                    onChange={(e) =>
                      setData({ ...data, accountName: e.target.value })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                      BSB
                    </label>
                    <input
                      type="text"
                      value={data.bsb}
                      onChange={(e) =>
                        setData({ ...data, bsb: e.target.value })
                      }
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={data.accountNumber}
                      onChange={(e) =>
                        setData({ ...data, accountNumber: e.target.value })
                      }
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                    PAY ID
                  </label>
                  <input
                    type="text"
                    value={data.payId}
                    onChange={(e) =>
                      setData({ ...data, payId: e.target.value })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setView("preview")}
              className="w-full flex items-center justify-center gap-2 bg-[#7b8b60] text-white font-bold px-6 py-4 rounded-2xl shadow-lg shadow-[#7b8b60]/20 hover:bg-[#687750] transition active:scale-95 mt-4"
            >
              <Sparkles size={18} /> Generate Receipt
            </button>
          </div>
        </div>
      ) : (
        /* Receipt Preview View */
        <div className="flex-grow flex flex-col h-full overflow-hidden bg-[#eae8e4] relative">
          {/* Preview Header / Actions */}
          <div className="w-full bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
            <button
              onClick={() => setView("input")}
              className="flex items-center gap-2 text-[#8e6f5d] font-bold px-4 py-2 rounded-xl hover:bg-stone-50 transition"
            >
              <ArrowLeft size={18} /> Edit Data
            </button>
            <div className="flex gap-3">
              <button
                onClick={downloadImage}
                className="hidden md:flex items-center gap-2 bg-white text-brown font-bold px-5 py-2 rounded-xl border border-stone-200 hover:border-[#7b8b60] transition shadow-sm"
              >
                <ImageIcon size={18} /> PNG
              </button>
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 bg-[#7b8b60] text-white font-bold px-6 py-2 rounded-xl shadow-md hover:bg-[#687750] transition active:scale-95"
              >
                <Download size={18} /> Download PDF
              </button>
            </div>
          </div>

          {/* The Receipt Document Container */}
          <div className="flex-grow overflow-y-auto p-4 md:p-12 flex flex-col items-center custom-scrollbar">
            <div className="w-full max-w-[820px] bg-white shadow-2xl mb-12 transform origin-top transition-transform duration-500">
              <div
                ref={invoiceRef}
                className="bg-white px-8 md:px-16 py-12 md:py-20 min-h-[1050px] flex flex-col justify-between text-brown"
                style={{ fontFamily: "Georgia, serif" }}
              >
                <div>
                  {/* Branding Header */}
                  <div className="flex justify-center mb-12">
                    <div className="border border-[#dcd6cd] bg-[#fcfaf7] px-6 py-2 flex items-center gap-3 rounded-md shadow-sm">
                      <Image
                        src="/logo.webp"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="flex scale-150 lg:scale-200 color-burn flex-col text-left"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-left w-full mb-4">
                    <h1 className="text-4xl md:text-5xl font-normal tracking-wide text-[#7b8b60] opacity-90 select-none">
                      INVOICE
                    </h1>
                  </div>
                  <div className="w-full h-[1.5px] bg-[#d3c9be] mb-8"></div>

                  {/* Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mb-10 text-base">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#7b8b60]">Name</h3>
                      <p className="text-brown text-[17px] font-medium pt-1">
                        {data.clientName || "—"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-xl font-bold text-[#7b8b60] whitespace-nowrap">
                          INVOICE NO :
                        </h3>
                        <p className="text-base font-semibold text-brown">
                          {data.invoiceNumber}
                        </p>
                      </div>
                      <p className="text-brown text-[17px] font-medium pt-1">
                        {data.date}
                      </p>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="w-full mb-8 overflow-hidden">
                    <div className="bg-[#8e6f5d] text-white font-bold text-xs md:text-sm tracking-widest grid grid-cols-12 rounded-sm py-2.5 px-4 uppercase text-center">
                      <div className="col-span-5 text-left">Description</div>
                      <div className="col-span-2">Price</div>
                      <div className="col-span-2">Qty</div>
                      <div className="col-span-3 text-right">Total</div>
                    </div>

                    <div className="divide-y divide-[#ebd9c8]/40 px-4 min-h-[120px]">
                      {data.items.map((item) => {
                        const parsedQty = parseFloat(item.quantity) || 0;
                        return (
                          <div
                            key={item.id}
                            className="grid grid-cols-12 text-center py-5 text-sm md:text-[16px] text-brown font-medium items-center"
                          >
                            <div className="col-span-5 text-left text-brown">
                              {item.description || "Service session"}
                            </div>
                            <div className="col-span-2">${item.price}</div>
                            <div className="col-span-2">{item.quantity}</div>
                            <div className="col-span-3 text-right font-bold">
                              ${(parsedQty * item.price).toFixed(0)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-[#d3c9be] mb-5"></div>

                  {/* Sub Total Area */}
                  <div className="flex justify-end items-center gap-8 md:gap-16 px-4 mb-16 text-lg font-bold">
                    <span className="text-[#8e6f5d] uppercase tracking-wider text-sm">
                      Sub Total
                    </span>
                    <span className="text-xl text-brown">
                      ${calculateSubtotal().toFixed(0)}
                    </span>
                  </div>

                  {/* Remittance Block */}
                  <div className="w-full max-w-lg text-left space-y-4">
                    <h4 className="text-[#8e6f5d] font-bold text-sm tracking-wider uppercase">
                      Payment Info
                    </h4>
                    <div className="space-y-2 text-[15px]">
                      <div className="grid grid-cols-3">
                        <span className="text-[#7b8b60] font-bold">
                          Account Name:
                        </span>
                        <span className="col-span-2 font-bold uppercase tracking-wide text-brown">
                          {data.accountName}
                        </span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-[#7b8b60] font-bold">BSB:</span>
                        <span className="col-span-2 font-bold text-brown">
                          {data.bsb}
                        </span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-[#7b8b60] font-bold">
                          Account Number:
                        </span>
                        <span className="col-span-2 font-bold text-brown">
                          {data.accountNumber}
                        </span>
                      </div>
                      <div className="py-1 text-center max-w-[240px] font-bold text-[#8e6f5d] italic text-sm tracking-widest select-none">
                        OR
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <span className="text-[#7b8b60] font-bold tracking-wider">
                          PAY ID:
                        </span>
                        <span className="col-span-2 font-bold text-brown">
                          {data.payId}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="mt-16">
                  <div className="w-full h-[1.5px] bg-[#d3c9be] mb-4"></div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[13px] text-[#8e6f5d] font-medium gap-4 sm:gap-0">
                    <div className="flex flex-col text-left">
                      <span className="font-bold tracking-wider uppercase text-brown">
                        {data.accountName}
                      </span>
                      <span className="text-brown text-md font-semibold mt-1 lowercase flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="currentColor"
                            d="M24 12v-.006c0-3.551-1.546-6.74-4.001-8.933l-.012-.01a.6.6 0 0 0-.101-.087l-.002-.001A11.92 11.92 0 0 0 11.998.001c-3.032 0-5.8 1.126-7.91 2.984l.013-.011a.5.5 0 0 0-.07.065v.001A11.96 11.96 0 0 0 0 12.003c0 3.55 1.544 6.739 3.997 8.933l.012.01a.7.7 0 0 0 .106.097l.002.001a11.92 11.92 0 0 0 7.881 2.958a11.93 11.93 0 0 0 7.911-2.984l-.013.011a11.94 11.94 0 0 0 4.106-9.021v-.007zm-4.462 7.805a12 12 0 0 0-1.909-1.262l-.065-.032c.613-1.767.982-3.804 1.017-5.923v-.016h4.261a10.82 10.82 0 0 1-3.301 7.23zM12.572 18.3c1.283.069 2.482.351 3.588.81l-.072-.026c-.886 2.02-2.133 3.408-3.516 3.713zm0-1.144v-4.584h4.868a18.6 18.6 0 0 1-.976 5.578l.039-.131a11.6 11.6 0 0 0-3.903-.862l-.027-.001zm0-5.728V6.844a11.9 11.9 0 0 0 4.007-.891l-.079.029c.555 1.619.896 3.485.94 5.425v.021zm0-5.728V1.205c1.383.305 2.63 1.687 3.516 3.713c-1.034.43-2.233.711-3.487.781zm2.854-4a10.8 10.8 0 0 1 3.258 1.752l-.023-.018c-.443.348-.94.676-1.464.961l-.056.028a10 10 0 0 0-1.724-2.737l.009.011zm-4-.492V5.7a10.8 10.8 0 0 1-3.588-.81l.072.026c.89-2.02 2.135-3.407 3.518-3.712zM6.858 4.42a11 11 0 0 1-1.544-1.007l.024.018a10.7 10.7 0 0 1 3.158-1.712l.076-.023a10 10 0 0 0-1.689 2.658zm4.57 2.423v4.584H6.56c.044-1.961.385-3.827.979-5.577l-.039.131a11.7 11.7 0 0 0 3.901.861zm0 5.728v4.584a11.9 11.9 0 0 0-4.007.891l.079-.029c-.555-1.618-.896-3.485-.94-5.425v-.021zm0 5.728v4.495c-1.383-.305-2.63-1.687-3.516-3.713c1.034-.43 2.233-.71 3.487-.78zm-2.85 4a10.9 10.9 0 0 1-3.258-1.748l.024.018c.443-.348.94-.676 1.464-.961l.056-.028a9.8 9.8 0 0 0 1.723 2.733l-.009-.01zm8.564-2.72c.58.315 1.077.642 1.544 1.007l-.024-.018a10.7 10.7 0 0 1-3.158 1.712l-.076.023a10 10 0 0 0 1.689-2.657l.025-.065zm5.7-8.151h-4.261a19.7 19.7 0 0 0-1.058-6.078l.041.138a12.4 12.4 0 0 0 1.997-1.312l-.024.018a10.8 10.8 0 0 1 3.303 7.205zM4.462 4.195c.576.468 1.223.897 1.909 1.262l.065.032c-.613 1.767-.982 3.804-1.017 5.923v.016H1.157a10.82 10.82 0 0 1 3.301-7.23zm-3.304 8.377h4.261a19.7 19.7 0 0 0 1.058 6.078l-.041-.138c-.751.399-1.397.828-1.997 1.312l.024-.018a10.8 10.8 0 0 1-3.303-7.205l-.001-.028z"
                          />
                        </svg>
                        <span className="text-md font-semibold">
                          {data.companyWebsite}
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-col text-left sm:text-right text-[#8c786c]">
                      <span>{data.companyAddress}</span>
                      <span className="mt-0.5">{data.companyPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dcd6cd;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c7bdb0;
        }
      `}</style>
    </div>
  );
}
