import React from 'react';
import { FaCheckCircle, FaNetworkWired, FaKey, FaChartLine } from 'react-icons/fa';
import { GiCircuitry } from 'react-icons/gi';
import { BiGitBranch } from 'react-icons/bi';

const features = [
  {
    icon: <FaCheckCircle className="text-4xl text-orange-500" />,
    title: 'Excellent Performance',
    desc: `The highest quality with the best price–performance ratio – this is what we focus all our efforts on. Excellence is our drive. We set ourselves high standards and create innovative solutions.`,
  },
  {
    icon: <GiCircuitry className="text-4xl text-orange-500" />,
    title: 'State-of-the-art Technology',
    desc: `To increase efficiency and precision, we use digital construction and innovative methods to use the latest technology. We are technological pioneers.`,
  },
  {
    icon: <BiGitBranch className="text-4xl text-orange-500" />,
    title: 'Local Networks',
    desc: `We work with the best planning offices and executing companies on a situational and regional basis, tailored to the property and the initial situation. We are where our customers are.`,
  },
  {
    icon: <BiGitBranch className="text-4xl text-orange-500 rotate-90" />,
    title: 'Transparent Processes',
    desc: `Our entrepreneurial independence creates full cost transparency and maximum flexibility for our customers. We maintain transparent business relationships.`,
  },
  {
    icon: <FaKey className="text-4xl text-orange-500" />,
    title: 'Reliability In All Phases',
    desc: `Our customers can rely on our information – from planning to implementation. They receive intelligent and responsible solutions without restrictions. Because we deliver on our promises.`,
  },
  {
    icon: <FaChartLine className="text-4xl text-orange-500" />,
    title: 'Profitability With Added Value',
    desc: `We increase profitability with efficient use of space and cost optimisation. Our solutions create measurable added value by combining quality, functionality and profitability.`,
  },
];

const WhatSetsUsApart = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-center font-bold mb-2 text-2xl sm:text-4xl">This is what <span className='underline decoration-orange-400 underline-offset-4 decoration-1 font-light'>sets us apart</span></h2>
      <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Our Core Principles</p>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((item, i) => (
          <div key={i} className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition">
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2x">{item.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatSetsUsApart;