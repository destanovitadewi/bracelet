"use client";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Katalog Gelang Unik",
      description:
        "Temukan berbagai model gelang handmade dengan desain eksklusif dan bahan berkualitas.",
      icon: (
        <svg
          className="h-6 w-6 text-pink-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4h16v16H4z"
          />
        </svg>
      ),
    },
    {
      title: "Custom Nama & Ukuran",
      description:
        "Pesan gelang dengan nama pilihanmu dan sesuaikan ukuran sesuai keinginan.",
      icon: (
        <svg
          className="h-6 w-6 text-pink-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14"
          />
        </svg>
      ),
    },
    {
      title: "Pesan & Lacak Order",
      description:
        "Proses pemesanan mudah dan fitur pelacakan untuk memastikan gelang sampai ke tanganmu.",
      icon: (
        <svg
          className="h-6 w-6 text-pink-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12h18"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800">
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        {/* Hero */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-pink-800 mb-4">
            Toko Gelang Custom & Aksesoris
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Koleksi gelang unik, layanan custom nama, dan pemesanan online cepat
            langsung dari pengrajin lokal.
          </p>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl shadow-sm hover:shadow-lg p-6 transition"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-lg">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mt-4">{f.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{f.description}</p>
            </div>
          ))}
        </section>

        {/* Secondary Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-pink-800 mb-10">
            Kenapa Pilih Toko Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {["Layanan Custom", "Kemudahan Berbelanja"].map((title, idx) => {
              const items =
                title === "Layanan Custom"
                  ? [
                      "Bisa tulis nama/inisial di gelang",
                      "Pilih warna & ukuran sesuai selera",
                      "Desain eksklusif buatan tangan",
                    ]
                  : [
                      "Checkout cepat & aman",
                      "Lacak status pesanan kapan saja",
                      "Support ramah & cepat respon",
                    ];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-6 border shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {title}
                  </h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-center">
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
