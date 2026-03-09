export const ISSUE_COURSES = {
  1: {
    courseTitle: 'Climate Change: Foundations to Solutions',
    level: 'Intermediate',
    estimatedHours: '3h 30m',
    objectives: [
      'Explain the greenhouse effect and key climate forcing agents.',
      'Interpret major climate indicators and risk signals.',
      'Evaluate mitigation and adaptation pathways at different scales.',
      'Build a practical personal and community climate action roadmap.',
    ],
    modules: [
      {
        id: 'climate-m1',
        title: 'Climate System Fundamentals',
        duration: '50 min',
        summary: 'Understand the physics and evidence behind modern climate change.',
        lessons: [
          {
            title: 'Earth energy balance',
            content:
              'Learn how incoming solar radiation and outgoing heat establish climate stability, and why imbalance drives warming trends.',
          },
          {
            title: 'Greenhouse gases and forcing',
            content:
              'Compare CO2, methane, and nitrous oxide by lifetime and warming potential, and connect emissions to global temperature response.',
          },
          {
            title: 'Reading climate signals',
            content:
              'Use temperature records, ocean heat content, glacier mass, and sea-level data as core evidence for system change.',
          },
        ],
      },
      {
        id: 'climate-m2',
        title: 'Impacts, Exposure, and Risk',
        duration: '65 min',
        summary: 'Map climate hazards to vulnerable populations, sectors, and ecosystems.',
        lessons: [
          {
            title: 'Extreme weather trends',
            content:
              'Assess links between warming and heatwaves, heavy rainfall, drought severity, wildfire conditions, and compound events.',
          },
          {
            title: 'Human systems at risk',
            content:
              'Analyze impacts on food systems, health outcomes, infrastructure reliability, and macroeconomic resilience.',
          },
          {
            title: 'Tipping points and uncertainty',
            content:
              'Distinguish between known risks, uncertainty ranges, and low-probability high-impact scenarios in long-term planning.',
          },
        ],
      },
      {
        id: 'climate-m3',
        title: 'Mitigation and Adaptation',
        duration: '70 min',
        summary: 'Build a practical portfolio of interventions with measurable outcomes.',
        lessons: [
          {
            title: 'Decarbonization pathways',
            content:
              'Compare electricity decarbonization, transport electrification, efficiency, industrial transition, and land-use strategies.',
          },
          {
            title: 'Adaptation planning',
            content:
              'Design adaptation measures such as cooling plans, water resilience, ecosystem restoration, and early warning systems.',
          },
          {
            title: 'Governance and accountability',
            content:
              'Translate goals into targets, budgets, milestones, and transparent reporting to sustain implementation over time.',
          },
        ],
      },
    ],
    knowledgeCheck: [
      {
        id: 'climate-q1',
        prompt: 'Which gas is currently the largest long-lived contributor to warming?',
        options: ['Nitrogen', 'Carbon dioxide', 'Helium', 'Ozone'],
        answer: 1,
        explanation: 'Carbon dioxide is the dominant long-lived anthropogenic greenhouse gas.',
      },
      {
        id: 'climate-q2',
        prompt: 'An adaptation strategy is best described as:',
        options: [
          'Cutting emissions only',
          'Adjusting systems to reduce harm from climate impacts',
          'Ignoring long-term climate data',
          'Replacing all public policy with voluntary action',
        ],
        answer: 1,
        explanation: 'Adaptation reduces damage from climate hazards that are already occurring or expected.',
      },
      {
        id: 'climate-q3',
        prompt: 'Why does ocean heat content matter in climate monitoring?',
        options: [
          'It is unrelated to warming',
          'It captures where most excess heat accumulates',
          'It only tracks sea salt',
          'It replaces atmospheric measurements entirely',
        ],
        answer: 1,
        explanation: 'Most excess energy from global warming is stored in oceans, making this a critical indicator.',
      },
    ],
    actionPlan: [
      'Audit personal and household energy demand; prioritize highest-impact reductions first.',
      'Adopt low-carbon transport habits and track monthly emissions change.',
      'Support local adaptation initiatives such as cooling shelters and flood preparedness.',
      'Engage decision-makers on evidence-based climate policy and implementation milestones.',
      'Review progress every quarter and adjust the action portfolio using measurable outcomes.',
    ],
    resources: [
      'IPCC Synthesis Reports',
      'UNEP Emissions Gap Reports',
      'National Meteorological Services climate dashboards',
    ],
    completionCriteria: [
      'Finish all three modules',
      'Score at least 2/3 on the knowledge check',
      'Draft a 90-day personal climate action roadmap',
    ],
  },
  2: {
    courseTitle: 'Ocean Pollution: Source to Sea Management',
    level: 'Intermediate',
    estimatedHours: '3h 10m',
    objectives: [
      'Identify major marine pollution pathways and pollutant categories.',
      'Evaluate ecological and human health impacts from coastal to open ocean systems.',
      'Apply prevention-first waste and wastewater management strategies.',
      'Design a local intervention plan with measurable leakage reduction.',
    ],
    modules: [
      {
        id: 'ocean-m1',
        title: 'Pollution Sources and Pathways',
        duration: '45 min',
        summary: 'Trace pollutants from production and use to rivers, coastlines, and offshore zones.',
        lessons: [
          {
            title: 'Land-based leakage',
            content:
              'Understand how poor collection, open dumping, and stormwater transport move waste into waterways.',
          },
          {
            title: 'Marine and shipping contributions',
            content:
              'Review ghost gear, vessel waste, and accidental releases that impact marine habitats.',
          },
          {
            title: 'Microplastics and fibers',
            content:
              'Examine how fragmentation and synthetic fibers create persistent, hard-to-capture pollutants.',
          },
        ],
      },
      {
        id: 'ocean-m2',
        title: 'Impacts on Ecosystems and Health',
        duration: '60 min',
        summary: 'Connect pollutant exposure to ecological decline and human risk.',
        lessons: [
          {
            title: 'Food web contamination',
            content:
              'Explore ingestion pathways in marine organisms and potential transfer through seafood systems.',
          },
          {
            title: 'Habitat degradation',
            content:
              'Assess effects on coral reefs, seagrasses, mangroves, and nursery grounds.',
          },
          {
            title: 'Economic and social burden',
            content:
              'Quantify impacts on fisheries, tourism, cleanup costs, and coastal livelihoods.',
          },
        ],
      },
      {
        id: 'ocean-m3',
        title: 'Intervention Design',
        duration: '65 min',
        summary: 'Build practical programs that stop pollution before it reaches water.',
        lessons: [
          {
            title: 'Upstream policy tools',
            content:
              'Use extended producer responsibility, design standards, and procurement policy to reduce disposable waste.',
          },
          {
            title: 'Collection and treatment upgrades',
            content:
              'Prioritize waste services, drainage controls, and wastewater treatment where leakage risk is highest.',
          },
          {
            title: 'Monitoring and enforcement',
            content:
              'Set indicators, audit systems, and compliance mechanisms for long-term leakage prevention.',
          },
        ],
      },
    ],
    knowledgeCheck: [
      {
        id: 'ocean-q1',
        prompt: 'Most marine plastic pollution is estimated to originate from:',
        options: ['Land-based systems', 'Deep-sea vents', 'Volcanoes', 'Atmospheric oxygen'],
        answer: 0,
        explanation: 'A large share of marine pollution is driven by land-based waste leakage pathways.',
      },
      {
        id: 'ocean-q2',
        prompt: 'A prevention-first strategy focuses on:',
        options: [
          'Only ocean cleanup boats',
          'Stopping leakage at source and system design stages',
          'Delaying collection investments',
          'Ignoring producer accountability',
        ],
        answer: 1,
        explanation: 'Source reduction and system redesign reduce total pollution load before cleanup is needed.',
      },
      {
        id: 'ocean-q3',
        prompt: 'Why are microplastics difficult to manage?',
        options: [
          'They are always visible and easy to capture',
          'They are tiny, persistent, and widely dispersed',
          'They dissolve in minutes',
          'They do not enter food webs',
        ],
        answer: 1,
        explanation: 'Small size and persistence make microplastics technically challenging to remove.',
      },
    ],
    actionPlan: [
      'Map local leakage hotspots across drains, markets, and riverbanks.',
      'Prioritize source reduction for high-volume single-use packaging.',
      'Strengthen community collection and sorting systems in underserved zones.',
      'Coordinate cleanup with upstream prevention measures and data tracking.',
      'Publish quarterly leakage and recovery metrics to maintain accountability.',
    ],
    resources: [
      'UNEP marine litter guidance',
      'NOAA marine debris program tools',
      'Local coastal management plans',
    ],
    completionCriteria: [
      'Finish all modules and lessons',
      'Achieve 2/3 or better on the knowledge check',
      'Produce a local source-to-sea intervention blueprint',
    ],
  },
  3: {
    courseTitle: 'Deforestation: Drivers, Impacts, and Restoration',
    level: 'Intermediate',
    estimatedHours: '3h 00m',
    objectives: [
      'Diagnose key land-use drivers linked to forest loss.',
      'Assess carbon, biodiversity, and livelihood impacts of deforestation.',
      'Compare conservation, restoration, and supply-chain strategies.',
      'Develop a place-based forest resilience action plan.',
    ],
    modules: [
      {
        id: 'forest-m1',
        title: 'Deforestation Drivers',
        duration: '45 min',
        summary: 'Understand economic, governance, and land-use pressures behind forest conversion.',
        lessons: [
          { title: 'Agricultural expansion', content: 'Track commodity pressures and frontier expansion patterns in high-risk landscapes.' },
          { title: 'Logging and infrastructure', content: 'Evaluate legal and illegal extraction, road access effects, and cumulative fragmentation.' },
          { title: 'Policy and tenure gaps', content: 'Connect weak land rights and enforcement gaps to persistent forest loss.' },
        ],
      },
      {
        id: 'forest-m2',
        title: 'System Impacts',
        duration: '55 min',
        summary: 'Link forest loss to climate instability, habitat collapse, and social vulnerability.',
        lessons: [
          { title: 'Carbon cycle disruption', content: 'Quantify emissions from clearing and reduced future carbon sequestration potential.' },
          { title: 'Biodiversity decline', content: 'Measure habitat loss effects on species richness, connectivity, and ecosystem function.' },
          { title: 'Community consequences', content: 'Assess implications for livelihoods, water regulation, and local food security.' },
        ],
      },
      {
        id: 'forest-m3',
        title: 'Conservation to Regeneration',
        duration: '60 min',
        summary: 'Deploy practical tools for protection, restoration, and sustainable production.',
        lessons: [
          { title: 'Protected area effectiveness', content: 'Identify where protected status works and where governance upgrades are needed.' },
          { title: 'Restoration models', content: 'Compare assisted natural regeneration, native planting, and mixed landscape restoration.' },
          { title: 'Deforestation-free supply chains', content: 'Use traceability, procurement standards, and verification to reduce market-linked loss.' },
        ],
      },
    ],
    knowledgeCheck: [
      {
        id: 'forest-q1',
        prompt: 'A major direct driver of deforestation is:',
        options: ['Agricultural expansion', 'Ocean salinity', 'Solar activity', 'Cloud albedo'],
        answer: 0,
        explanation: 'Agricultural expansion remains one of the largest direct drivers globally.',
      },
      {
        id: 'forest-q2',
        prompt: 'Forest fragmentation typically causes:',
        options: ['Improved habitat connectivity', 'Reduced ecological resilience', 'Lower biodiversity pressure', 'More carbon storage'],
        answer: 1,
        explanation: 'Fragmentation isolates habitats and weakens ecosystem stability.',
      },
      {
        id: 'forest-q3',
        prompt: 'A deforestation-free supply chain relies heavily on:',
        options: ['Traceability and verification', 'Untracked commodity sourcing', 'No monitoring', 'Removing all standards'],
        answer: 0,
        explanation: 'Traceability and verification are core to accountability in sourcing.',
      },
    ],
    actionPlan: [
      'Identify local forest-risk commodities and sourcing patterns.',
      'Promote certified and traceable products in procurement decisions.',
      'Support community-led restoration and tenure security initiatives.',
      'Track forest cover change using open satellite data tools.',
      'Set annual restoration and protection targets with public reporting.',
    ],
    resources: ['FAO forest resources reports', 'Global Forest Watch', 'FSC certification resources'],
    completionCriteria: ['Complete all modules', 'Pass knowledge check with 2/3', 'Draft a 12-month forest action plan'],
  },
  4: {
    courseTitle: 'Biodiversity Loss: Ecosystem Resilience in Practice',
    level: 'Intermediate',
    estimatedHours: '3h 20m',
    objectives: [
      'Explain biodiversity across genes, species, and ecosystems.',
      'Diagnose major pressures causing species decline.',
      'Apply ecosystem-based conservation and restoration principles.',
      'Design practical interventions for local biodiversity recovery.',
    ],
    modules: [
      {
        id: 'bio-m1',
        title: 'Biodiversity Fundamentals',
        duration: '45 min',
        summary: 'Build a systems understanding of why biodiversity underpins resilience.',
        lessons: [
          { title: 'Levels of biodiversity', content: 'Differentiate genetic, species, and ecosystem diversity and why all three matter.' },
          { title: 'Ecosystem services', content: 'Connect biodiversity to pollination, soil health, water regulation, and climate stability.' },
          { title: 'Resilience dynamics', content: 'Learn how diversity buffers systems against shocks and long-term stressors.' },
        ],
      },
      {
        id: 'bio-m2',
        title: 'Drivers of Decline',
        duration: '60 min',
        summary: 'Map the major human pressures accelerating biodiversity loss.',
        lessons: [
          { title: 'Habitat loss and fragmentation', content: 'Assess land conversion patterns and corridor disruption effects.' },
          { title: 'Pollution and invasive species', content: 'Evaluate ecosystem disruption from chemical, plastic, and biological pressures.' },
          { title: 'Overexploitation and climate stress', content: 'Understand compounding effects across food webs and species ranges.' },
        ],
      },
      {
        id: 'bio-m3',
        title: 'Recovery Strategies',
        duration: '65 min',
        summary: 'Use nature-positive planning to restore ecosystem function and species viability.',
        lessons: [
          { title: 'Habitat restoration', content: 'Plan restoration with native species, ecological succession, and long-term stewardship.' },
          { title: 'Protected and connected areas', content: 'Improve conservation outcomes by linking fragmented habitats.' },
          { title: 'Community conservation', content: 'Integrate local knowledge, livelihoods, and co-management for durable outcomes.' },
        ],
      },
    ],
    knowledgeCheck: [
      {
        id: 'bio-q1',
        prompt: 'Why is biodiversity important for resilience?',
        options: ['It has no role in resilience', 'It provides redundancy and adaptive capacity', 'It only affects aesthetics', 'It reduces all natural variation'],
        answer: 1,
        explanation: 'Diverse ecosystems typically adapt better and recover faster after disturbance.',
      },
      {
        id: 'bio-q2',
        prompt: 'A major pressure behind biodiversity decline is:',
        options: ['Stable habitat connectivity', 'Habitat conversion and fragmentation', 'Consistent species protection', 'Improved restoration'],
        answer: 1,
        explanation: 'Habitat loss and fragmentation are central drivers across regions.',
      },
      {
        id: 'bio-q3',
        prompt: 'An effective biodiversity intervention usually includes:',
        options: ['Single short cleanup only', 'Long-term restoration and monitoring', 'No baseline assessment', 'No community involvement'],
        answer: 1,
        explanation: 'Long-term implementation and monitoring are needed for measurable ecological recovery.',
      },
    ],
    actionPlan: [
      'Map local habitat patches and identify missing ecological corridors.',
      'Replace invasive species with native plants in priority zones.',
      'Coordinate biodiversity monitoring with schools and community groups.',
      'Reduce pesticide and pollutant pressure around sensitive habitats.',
      'Publish a yearly biodiversity scorecard with clear indicators.',
    ],
    resources: ['IUCN Red List', 'IPBES assessments', 'Local conservation authority reports'],
    completionCriteria: ['Finish all modules', 'Score 2/3+ on quiz', 'Submit a biodiversity restoration micro-plan'],
  },
  5: {
    courseTitle: 'Water Scarcity: Risk, Governance, and Resilience',
    level: 'Intermediate',
    estimatedHours: '3h 05m',
    objectives: [
      'Understand water scarcity drivers across climate and demand dimensions.',
      'Assess vulnerability in households, agriculture, and urban systems.',
      'Apply demand management, reuse, and watershed protection strategies.',
      'Develop a water resilience roadmap with measurable milestones.',
    ],
    modules: [
      {
        id: 'water-m1',
        title: 'Hydrology and Scarcity Drivers',
        duration: '45 min',
        summary: 'Connect climate variability and demand pressure to water stress outcomes.',
        lessons: [
          { title: 'Water cycle basics', content: 'Review precipitation, storage, runoff, and recharge with scarcity indicators.' },
          { title: 'Demand-side pressure', content: 'Compare sectoral withdrawals and identify inefficiency hotspots.' },
          { title: 'Climate amplification', content: 'Link heat, drought, and rainfall volatility to reliability risks.' },
        ],
      },
      {
        id: 'water-m2',
        title: 'System Vulnerability',
        duration: '60 min',
        summary: 'Prioritize high-risk users and fragile infrastructure contexts.',
        lessons: [
          { title: 'Urban water stress', content: 'Assess leakage, network losses, and service equity in growing cities.' },
          { title: 'Agricultural exposure', content: 'Analyze irrigation efficiency and crop-water productivity tradeoffs.' },
          { title: 'Public health linkage', content: 'Connect scarcity and quality constraints to health outcomes and inequality.' },
        ],
      },
      {
        id: 'water-m3',
        title: 'Resilience Toolset',
        duration: '65 min',
        summary: 'Deploy integrated water management strategies for short and long horizons.',
        lessons: [
          { title: 'Demand management', content: 'Implement pricing, leakage control, and efficient-use standards.' },
          { title: 'Reuse and recycling', content: 'Integrate non-potable reuse and circular water systems in urban planning.' },
          { title: 'Watershed restoration', content: 'Protect upstream ecosystems that stabilize quantity and quality.' },
        ],
      },
    ],
    knowledgeCheck: [
      {
        id: 'water-q1',
        prompt: 'Which sector generally withdraws the most freshwater globally?',
        options: ['Aviation', 'Agriculture', 'Telecommunications', 'Media'],
        answer: 1,
        explanation: 'Agriculture is typically the largest freshwater withdrawal sector.',
      },
      {
        id: 'water-q2',
        prompt: 'A high-impact urban action for scarcity is:',
        options: ['Ignoring network losses', 'Leak reduction and demand management', 'Increasing waste discharge', 'Removing monitoring'],
        answer: 1,
        explanation: 'Loss control and efficient demand are among the fastest high-impact measures.',
      },
      {
        id: 'water-q3',
        prompt: 'Watershed restoration helps because it:',
        options: ['Eliminates all drought instantly', 'Improves hydrological stability and quality', 'Replaces all treatment plants', 'Stops rainfall variability'],
        answer: 1,
        explanation: 'Healthy watersheds improve infiltration, storage, and water quality outcomes.',
      },
    ],
    actionPlan: [
      'Run a local water risk scan by sector and season.',
      'Set reduction targets for household and institutional demand.',
      'Implement leak detection and pressure management in priority zones.',
      'Adopt safe reuse standards for non-potable applications.',
      'Track monthly supply reliability and demand intensity indicators.',
    ],
    resources: ['UN-Water reports', 'FAO AQUASTAT', 'Municipal utility performance dashboards'],
    completionCriteria: ['Complete all modules', 'Get 2/3+ on quiz', 'Create a 6-month water resilience implementation sheet'],
  },
  6: {
    courseTitle: 'Waste Crisis: Circular Systems and Implementation',
    level: 'Intermediate',
    estimatedHours: '3h 15m',
    objectives: [
      'Map waste streams and lifecycle leakage points.',
      'Evaluate environmental and climate costs of linear systems.',
      'Apply circular economy strategies across design, use, and recovery.',
      'Build a practical zero-waste transition plan for local contexts.',
    ],
    modules: [
      {
        id: 'waste-m1',
        title: 'Waste System Diagnostics',
        duration: '50 min',
        summary: 'Understand where and why waste escapes formal management systems.',
        lessons: [
          { title: 'Material flow mapping', content: 'Track products from purchase to disposal to identify major leakage nodes.' },
          { title: 'Collection and sorting gaps', content: 'Assess service coverage, contamination rates, and recovery bottlenecks.' },
          { title: 'Landfill and open dumping risks', content: 'Analyze methane, leachate, and public health burdens from poor disposal.' },
        ],
      },
      {
        id: 'waste-m2',
        title: 'Climate and Ecological Impacts',
        duration: '55 min',
        summary: 'Connect waste mismanagement to emissions, pollution, and ecosystem decline.',
        lessons: [
          { title: 'Methane from organics', content: 'Quantify climate impact from unmanaged biodegradable waste streams.' },
          { title: 'Plastic and toxic exposure', content: 'Evaluate risks from plastics, e-waste, and uncontrolled burning.' },
          { title: 'Economic inefficiency', content: 'Estimate losses from discarded recoverable materials and weak circular loops.' },
        ],
      },
      {
        id: 'waste-m3',
        title: 'Circular Transition Playbook',
        duration: '65 min',
        summary: 'Implement reduction, reuse, repair, and recovery with governance support.',
        lessons: [
          { title: 'Design for circularity', content: 'Apply durability, modularity, refill systems, and material simplification.' },
          { title: 'Policy and market levers', content: 'Use producer responsibility, procurement standards, and landfill diversion targets.' },
          { title: 'Behavior and operations', content: 'Build source separation routines and data-backed continuous improvement cycles.' },
        ],
      },
    ],
    knowledgeCheck: [
      {
        id: 'waste-q1',
        prompt: 'The waste hierarchy generally prioritizes:',
        options: ['Landfill first', 'Prevention and reduction first', 'Incineration first', 'No sorting needed'],
        answer: 1,
        explanation: 'Preventing waste is usually the highest-value strategy in circular systems.',
      },
      {
        id: 'waste-q2',
        prompt: 'Why is organic waste important in climate strategy?',
        options: ['It has no emissions relevance', 'It can emit methane when unmanaged', 'It always sequesters carbon', 'It cannot be composted'],
        answer: 1,
        explanation: 'Unmanaged organics in anaerobic conditions produce methane.',
      },
      {
        id: 'waste-q3',
        prompt: 'A strong circular policy package often includes:',
        options: ['No producer responsibility', 'Extended producer responsibility and design standards', 'Removing all monitoring', 'Banning source separation'],
        answer: 1,
        explanation: 'Producer accountability and design requirements are core circular levers.',
      },
    ],
    actionPlan: [
      'Measure baseline waste generation and composition by stream.',
      'Prioritize top reduction opportunities (packaging, food waste, disposables).',
      'Scale source separation and quality control for recovery streams.',
      'Expand organics diversion through composting or anaerobic digestion.',
      'Publish diversion, contamination, and recovery metrics monthly.',
    ],
    resources: ['World Bank What a Waste reports', 'Ellen MacArthur Foundation circular guides', 'Local solid waste management regulations'],
    completionCriteria: ['Complete course modules', 'Score 2/3+ on quiz', 'Deliver a circular transition implementation checklist'],
  },
};
