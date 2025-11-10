import React from 'react'

function CoreServices() {
    const services = [
        {
            title: "RPA Strategy & Consulting",
            icon: <img src="/compass.png" alt="Compass" className="w-8 h-8 object-contain" />,
            description: "End-to-end process assessment, identification of high-value automation opportunities, and creation of a customized implementation roadmap for maximum ROI.",
        },
        {
            title: "Custom Bot Development",
            icon: <img src="/robot.png" alt="Robot" className="w-8 h-8 object-contain" />,
            description: "Design, development, and testing of tailored software bots to automate specific tasks, integrated seamlessly with your existing systems.",
        },
        {
            title: "Managed Automation Services",
            icon: <img src="/settings.png" alt="Settings" className="w-8 h-8 object-contain" />,
            description: "Full 24/7 management and maintenance services for deployed bots. We handle monitoring, troubleshooting, and routine updates for optimal performance.",
        },
    ];

    return (
        <section className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-2">
                        Service Pillars
                    </h2>
                    <h3 className="text-4xl sm:text-5xl font-extrabold text-white">
                        Core <span className="text-orange-600">Intelligent Automation</span> Solutions
                    </h3>
                </div>

                {/* Service Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-8 rounded-xl shadow-xl transition duration-300 transform hover:scale-[1.02] hover:shadow-orange-700/50 border border-gray-700 hover:border-orange-600"
                        >
                            {/* Icon Container */}
                            <div className="w-16 h-16 mb-4 p-3 inline-flex items-center justify-center rounded-full bg-orange-600 border-2 border-orange-600"
                            >
                                {service.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3">
                                {service.title}
                            </h4>
                            <p className="text-gray-400">
                                {service.description}
                            </p>
                            <a href="#" className="mt-6 inline-flex items-center text-orange-500 font-semibold hover:text-orange-400 transition duration-150">
                                Learn More
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    ))}
                    
                </div>

            </div>
        </section>
    )
}

export default CoreServices