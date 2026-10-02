(function () {
  const rawWork = [
    { group: "Designing for Clarity", cases: [
      { title: "Improving Dashboard Decision-Making", summary: "Helping users make faster, better decisions through thoughtful information design.", problem: "Users rarely used the monitoring dashboard because it was overloaded with metrics, widgets, and information that made it difficult to know where to focus.", insight: "Research and usage data showed that users felt overwhelmed and struggled to find the information needed to make decisions quickly.", solution: "Simplified the dashboard by prioritizing key performance metrics, organizing related information into clear sections, and introducing diagnostic workflows that helped users move from insights to action.", impact: "Transformed the dashboard from a data-heavy monitoring screen into a focused decision-making hub, improving adoption, usability, and task efficiency.", image: "uploads/dashboard-case.png", imageCaption: "Two monitoring dashboards cleaned for clarity and focused decision-making", fullCaseUrl: "#" },
      { title: "Making Irrigation Data Relatable", summary: "Helping farmers understand irrigation needs through visuals that reflect what they see on their farms.", problem: "Existing irrigation tools relied on meters and numbers that farmers found confusing, making it difficult to understand soil conditions and decide when to water.", insight: "Competitor analysis revealed a gap between how tools presented data and how farmers understood their fields. Familiar visuals could make technical information more relatable and easier to act on.", solution: "Redesigned Outgrow's Smart Irrigation Planner to visually represent crop stress and soil moisture, connecting data to conditions farmers recognise on their farms, with clear guidance on when and how much to irrigate.", impact: "Testing with 15 farmers indicated that the visuals made soil moisture and irrigation needs easier to understand. Their feedback helped refine the design before development.", metric: "15 farmers tested", image: "uploads/irrigation-synopsis.png", imageCaption: "Competitor UI vs. the redesigned Smart Irrigation Planner", fullCaseUrl: "#" },
    ]},
    { group: "Designing with Evidence", cases: [
      { title: "Learning the Cost of Assumptions", summary: "Ensuring the product is built on real user needs.", problem: "We redesigned a POS keyboard from QWERTY to an alphabetical layout based on internal assumptions rather than user research.", insight: "Users were already highly familiar with QWERTY keyboards through everyday smartphone use and found the new layout frustrating.", solution: "The keyboard was redesigned back to a standard QWERTY layout after validating user needs and behaviors.", impact: "A costly hardware redesign reinforced a key design principle: validate assumptions with users before committing to major product changes.", fullCaseUrl: "#" },
    ]},
    { group: "Designing for Accessibility", cases: [
      { title: "Improving POS Visibility in Bright Environments", summary: "Making screens readable in the harshest working conditions.", problem: "Cashiers struggled to view the POS screen in direct sunlight, leading to lower product adoption and satisfaction.", insight: "Field research revealed that screen glare, not the interface itself, was the primary usability barrier.", solution: "Introduced a high-contrast mode and adaptive brightness controls for improved visibility.", impact: "Increased daily application usage by 30% and improved user satisfaction.", metric: "+30% daily usage", fullCaseUrl: "#" },
      { title: "Making Mobile Data Entry Glove-Friendly", summary: "Designing touch interactions for real-world hands.", problem: "Field installers frequently made data-entry mistakes while wearing protective gloves.", insight: "Small touch targets made interactions difficult in real working conditions.", solution: "Enlarged interactive elements and optimized touch targets for gloved use.", impact: "Reduced data-entry errors by approximately 65% and improved workflow efficiency.", metric: "−65% data-entry errors", fullCaseUrl: "#" },
      { title: "Improving Accessibility for All Users", summary: "Accessibility as a baseline — not an afterthought.", problem: "Critical information relied on color alone, and navigation was difficult for keyboard and screen-reader users.", insight: "Accessibility reviews identified gaps that affected users with visual and motor impairments.", solution: "Added text and icon-based status indicators, improved screen-reader support, and optimized keyboard navigation.", impact: "Achieved a more inclusive experience aligned with accessibility best practices.", fullCaseUrl: "#" },
    ]},
  ];
  const services = [
    { num: "01", name: "Product Strategy & Architecture", caps: ["Product Discovery & Definition", "Information Architecture", "UX Audits & Heuristic Evaluations"] },
    { num: "02", name: "Complex Workflows & Enterprise UX", caps: ["Dashboard & Data Visualization", "Enterprise Software Modernization", "Hardware-Software Integration"] },
    { num: "03", name: "Design Systems & Operations", caps: ["Design System Architecture", "Advanced Figma Workflows", "Design-to-Engineering Handoff"] },
    { num: "04", name: "End-to-End Product Design", name2: "(0 to 1 & Beyond)", caps: ["MVP Incubation", "Cross-Platform Experience Design"] },
    { num: "05", name: "Brand Identity", caps: ["Logo & Visual Identity", "Brand Guidelines", "Brand Storytelling"] },
    { num: "06", name: "Motion & Video", caps: ["Promotional Videos", "Product Showcases", "Motion Graphics"] },
  ];
  const steps = [
    { num: "01", title: "Understand", body: "Ask better questions. Research context, users and business goals." },
    { num: "02", title: "Frame", body: "Find the problem worth solving. Synthesize insights, define opportunities." },
    { num: "03", title: "Explore", body: "Make ideas tangible. Flows, wireframes, prototypes and concepts." },
    { num: "04", title: "Validate", body: "Find out what actually works. Test, learn and iterate." },
    { num: "05", title: "Refine", body: "Make it useful, accessible and scalable. Final experience, system and handoff." },
  ];
  const people = [
    { role: "Suraj Sridhar", first: "Suraj", last: "Sridhar", focus: "Product & UX design leader", bio: "Brings deep domain expertise from shaping experiences at RedMart, WayCool, Victoria's Secret, and ChargePoint." },
    { role: "Keerthi G", first: "Keerthi", last: "G", focus: "Product & UX design leader", bio: "Brings extensive enterprise and systems design mastery from her work at SAP, Micro Focus, OpenText, and ChargePoint." },
  ];
  const insights = [
    { n: "01", title: "Smart AI", body: "Creating experiences that predict user needs, streamline tasks, and help prevent issues before they become problems." },
    { n: "02", title: "Actionable data and visibility", body: "Transforming complex data into clear, actionable visual experiences that provide instant access to critical business insights." },
    { n: "03", title: "Visual content and design", body: "Making eye-catching pictures, layouts, and styles that tell a great story and look amazing." },
    { n: "04", title: "Universal accessibility", body: "Making sure our tools and screens are simple for all people to use, meeting official accessibility rules." },
  ];
  const clients = ["SAP Labs", "Victoria's Secret", "WayCool Foods", "OpenText", "Micro Focus", "RedMart", "Lazada", "ChargePoint"];
  const pad = (n) => String(n).padStart(2, "0");

  function vals(c) {
    const st = c.state;
    const ob = st.openBook;
    const curBook = ob == null ? null : rawWork[ob];
    const total = curBook ? curBook.cases.length : 0;
    const page = curBook ? Math.min(st.page, total - 1) : 0;
    const cur = curBook ? curBook.cases[page] : {};
    const books = rawWork.map((g, i) => ({
      vol: "Vol. " + pad(i + 1), volNum: pad(i + 1), group: g.group,
      first: g.group.split(" ").slice(0, -1).join(" "), last: g.group.split(" ").slice(-1)[0],
      count: g.cases.length + (g.cases.length === 1 ? " problem" : " problems"),
      aria: "Open " + g.group + ", " + g.cases.length + (g.cases.length === 1 ? " problem" : " problems"),
      open: () => { c._dir = 0; c.setState({ openBook: i, page: 0 }); },
    }));
    return {
      services, steps, people, insights, clients, books,
      clientsLine: clients.join("  ·  "),
      navOpen: st.navOpen,
      toggleNav: () => c.setState(s => ({ navOpen: !s.navOpen })),
      closeNav: () => c.setState({ navOpen: false }),
      openContact: () => c.setState({ contactOpen: true, contactSent: false, contactName: "", contactEmail: "", contactMsg: "", navOpen: false }),
      closeContact: () => c.setState({ contactOpen: false }),
      stopProp: (e) => e.stopPropagation(),
      contactOpen: st.contactOpen, contactSent: st.contactSent, contactNotSent: !st.contactSent,
      contactName: st.contactName, contactEmail: st.contactEmail, contactMsg: st.contactMsg,
      onContactName: (e) => c.setState({ contactName: e.target.value }),
      onContactEmail: (e) => c.setState({ contactEmail: e.target.value }),
      onContactMsg: (e) => c.setState({ contactMsg: e.target.value }),
      submitContact: () => {
        const { contactName, contactEmail, contactMsg } = c.state;
        const subject = encodeURIComponent("New enquiry from IBBRU website");
        const body = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMsg}`);
        window.open(`mailto:ibbru.studio@gmail.com?subject=${subject}&body=${body}`, "_blank");
        c.setState({ contactSent: true });
      },
      shelfOpen: ob == null, bookOpen: ob != null,
      curVol: curBook ? "Vol. " + pad(ob + 1) : "", curGroup: curBook ? curBook.group : "",
      curNum: pad(page + 1), curTitle: cur.title || "", curSummary: cur.summary || "", curMetric: cur.metric || "",
      curProblem: cur.problem || "", curInsight: cur.insight || "", curSolution: cur.solution || "", curImpact: cur.impact || "",
      curImage: cur.image || "", curImageCaption: cur.imageCaption || "",
      curFullCaseUrl: cur.fullCaseUrl || "#", hasFullCase: !!cur.fullCaseUrl,
      pageLabel: total ? pad(page + 1) + " / " + pad(total) : "",
      noPrev: page <= 0, noNext: page >= total - 1,
      nextPage: () => { c._dir = 1; c.setState(s => ({ page: Math.min(s.page + 1, total - 1) })); },
      prevPage: () => { c._dir = -1; c.setState(s => ({ page: Math.max(s.page - 1, 0) })); },
      closeBook: () => c.setState({ openBook: null, page: 0 }),
    };
  }

  function turn(c, prev) {
    if (c.state.openBook == null || prev.openBook !== c.state.openBook || prev.page === c.state.page || !c._dir) return;
    const t = document.querySelector("[data-page-turn]");
    const spread = document.querySelector("[data-spread]");
    if (!t || !spread || spread.offsetWidth < 760) return;
    t.style.display = "block";
    const kf = c._dir > 0 ? [{ transform: "rotateY(0deg)" }, { transform: "rotateY(-180deg)" }] : [{ transform: "rotateY(-180deg)" }, { transform: "rotateY(0deg)" }];
    const a = t.animate(kf, { duration: 620, easing: "cubic-bezier(.4,.05,.25,1)" });
    a.onfinish = () => { t.style.display = "none"; };
  }

  window.IBBRU = { vals, turn, initialState: { navOpen: false, openBook: null, page: 0, contactOpen: false, contactSent: false, contactName: "", contactEmail: "", contactMsg: "" } };
})();
