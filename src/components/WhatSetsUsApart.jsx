import { Award, Cpu, Network, Eye, ShieldCheck, TrendingUp } from 'lucide-react';

// Icons are decorative (aria-hidden): every principle is fully described by
// its heading and copy. One icon set (lucide, already used across the site)
// keeps the stroke weight and style coherent.
const features = [
  {
    Icon: Award,
    title: 'Excellent Performance',
    desc: `The highest quality with the best price–performance ratio – this is what we focus all our efforts on. Excellence is our drive. We set ourselves high standards and create innovative solutions.`,
  },
  {
    Icon: Cpu,
    title: 'State-of-the-art Technology',
    desc: `To increase efficiency and precision, we use digital construction and innovative methods to use the latest technology. We are technological pioneers.`,
  },
  {
    Icon: Network,
    title: 'Local Networks',
    desc: `We work with the best planning offices and executing companies on a situational and regional basis, tailored to the property and the initial situation. We are where our customers are.`,
  },
  {
    Icon: Eye,
    title: 'Transparent Processes',
    desc: `Our entrepreneurial independence creates full cost transparency and maximum flexibility for our customers. We maintain transparent business relationships.`,
  },
  {
    Icon: ShieldCheck,
    title: 'Reliability In All Phases',
    desc: `Our customers can rely on our information – from planning to implementation. They receive intelligent and responsible solutions without restrictions. Because we deliver on our promises.`,
  },
  {
    Icon: TrendingUp,
    title: 'Profitability With Added Value',
    desc: `We increase profitability with efficient use of space and cost optimisation. Our solutions create measurable added value by combining quality, functionality and profitability.`,
  },
];

const WhatSetsUsApart = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-center font-bold mb-2 text-3xl sm:text-4xl">This is what <span className='underline decoration-brand-500 underline-offset-4 decoration-1 font-light'>sets us apart</span></h2>
      <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Our Core Principles</p>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {features.map(({ Icon, title, desc }) => (
          <div key={title} className="bg-brand-50 p-6 rounded-md shadow">
            <Icon className="mb-4 size-9 text-brand-500" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 text-base leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
