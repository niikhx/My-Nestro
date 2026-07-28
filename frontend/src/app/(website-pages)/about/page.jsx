import React from 'react'

export default function page() {
  const stats = [
    { id: 1, value: '12K+', label: 'Homes transformed' },
    { id: 2, value: '280+', label: 'Curated products' },
    { id: 3, value: '8', label: 'Showrooms across India' },
    { id: 4, value: '4.9★', label: 'Average rating' },
  ];
  const subHeading = "WHAT DRIVES US";
  const heading = "Our Values";

  const valuesData = [
    {
      id: 1,
      title: "Sustainable Craft",
      description: "We source responsibly — FSC-certified woods, natural fibres, and local artisans. Furniture that's good for your home and the planet.",
      // Custom SVG path for Leaf Icon
      iconPath: "M12 3v18M12 3a9 9 0 019 9c0 3-3 6-9 9m0-18a9 9 0 00-9 9c0 3 3 6 9 9"
    },
    {
      id: 2,
      title: "Uncompromising Quality",
      description: "Every piece passes a 23-point quality check before it reaches your home. We back it with a 5-year warranty.",
      // Custom SVG path for Diamond Icon
      iconPath: "M6 5h12l4 6-10 8L2 11l4-6z"
    },
    {
      id: 3,
      title: "Design with Soul",
      description: "We don't chase trends. We design furniture that ages gracefully and belongs in every chapter of your life.",
      // Custom SVG path for Heart Icon
      iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    }
  ];

  const teamMembers = [
    {
      initials: "AK",
      name: "Aarav Kumar",
      role: "Founder & CEO",
    },
    {
      initials: "SM",
      name: "Sanya Mehta",
      role: "Head of Design",
    },
    {
      initials: "VR",
      name: "Vikram Rao",
      role: "Chief Craftsman",
    },
    {
      initials: "PJ",
      name: "Preet Joshi",
      role: "Customer Experience",
    },
  ];
  return (
    <>
      <section className="mx-4 sm:mx-6 my-5 mt-12 sm:mt-20 bg-[#2C2016] p-4 sm:p-6 rounded-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between">

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-10 z-10 w-full lg:w-1/2">

          <h1 className="text-[24px] sm:text-[28px] lg:text-[42px] font-normal text-[#FAF7F4] leading-[1.15] tracking-[-0.03em] mb-2 lg:whitespace-nowrap">
            Furniture crafted with <em className="italic text-[#D8B18A]">purpose</em>
          </h1>

          <p className="text-[13px] sm:text-[14px] text-white/50 tracking-tighter leading-[1.75] mb-7 max-w-[540px]">
            Founded in 2018, Nestro was born from a belief that beautiful furniture shouldn't be a luxury.
            We work directly with master craftsmen across India and Scandinavia to bring you pieces
            that are honest in material, thoughtful in design, and built to outlast trends.
          </p>

        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src="/images/Gaga.jpg"
            alt="Furniture"
            className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[500px] h-[180px] sm:h-[220px] lg:h-[300px] object-contain"
          />
        </div>

      </section>
      <section className="py-4">
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="bg-[#faf8f6] border border-[#E6DEC9] rounded-xl md:rounded-[18px] p-5 sm:p-6 md:px-10 lg:px-12 shadow-sm">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">

              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col items-center text-center"
                >
                  <span className="text-[22px] sm:text-2xl lg:text-[28px] font-semibold text-[#8C6239] tracking-tight">
                    {stat.value}
                  </span>

                  <span className="mt-1 text-[11px] sm:text-xs text-[#707070] leading-relaxed max-w-[180px]">
                    {stat.label}
                  </span>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>
      <section className="w-full py-8 sm:py-10 md:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header Part */}
          <div className="mb-4 sm:mb-6 text-left mt-2 sm:mt-4">
            <span className="block text-[10px] mb-1 sm:text-[11px] font-medium uppercase tracking-widest text-[#a0764c]">
              {subHeading}
            </span>

            <h2 className="text-[22px] sm:text-[23px] md:text-[23px] font-normal text-[#1A1A1A] tracking-tight leading-tight">
              {heading}
            </h2>
          </div>

          {/* Cards Grid Part */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {valuesData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E6DEC9] rounded-2xl p-4 md:p-5 flex flex-col justify-start items-start shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
              >
                {/* Dynamic SVG Icon */}
                <svg
                  className="w-6 h-6 text-[#8C6239] mb-2 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={item.iconPath}
                  />
                </svg>

                {/* Card Title */}
                <h3 className="text-[13px] font-medium text-[#1A1A1A] mb-1">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-[8px] sm:text-[11px] text-[#5A5A5A] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
      <section className="py-4 md:py-4">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">

          <span className="text-[9px] sm:text-[9px] tracking-[0.35em] uppercase text-[#8C6239]">
            The People Behind Nestro
          </span>

          <h2 className="text-[22px] sm:text-[26px] md:text-[26px] text-[#1A1A1A] mt-1 mb-1 md:mb-4">
            Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-2xl border border-[#E6DEC9] bg-white h-full"
              >
                {/* Top Section */}
                <div className="bg-[#E8E4DE] h-[120px] sm:h-[130px] flex items-center justify-center">
                  <span className="text-[36px] sm:text-[42px] md:text-[33px] font-normal text-[#A56D32]">
                    {member.initials}
                  </span>
                </div>

                {/* Bottom Section */}
                <div className="p-1 sm:p-2">
                  <h3 className="text-[11px] sm:text-[13px] font-medium text-[#1A1A1A] leading-tight">
                    {member.name}
                  </h3>

                  <p className="text-[9px] sm:text-[10px] text-[#7A7A7A] mt-1 leading-relaxed">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
