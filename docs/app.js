/* Bilingual client-side interface, all choices and scoring are computed locally. */
(() => {
'use strict';
const model = window.LabModel;
if (!model) { document.body.insertAdjacentHTML('afterbegin','<p>Could not load local scoring model.</p>'); return; }
const state={lang:'en',tab:'case',caseStep:0,caseAnswers:{},caseReport:false,assessment:{},assessmentShown:false};
const dictionary={
 en:{
  brandSub:'By Saddam Sayyaleh · Applied tools & methods',heroEyebrow:'THE IMPACT CONNECTOR / APPLIED AI WORKFLOW LAB',heroTitle:'AI adoption begins with understanding the work.',
  heroLead:"Explore Ali's reporting challenge, assess your own organisation's readiness, and see the decision rules behind the recommendations.",
  heroAssessment:'Take the readiness assessment',heroCase:"Explore Ali's case",metaTime:'5–7 minute self-assessment',metaPrivate:'No sign-in. No information sent.',
  noticeText:'Review prototype. Ali, the organisation and all numbers are constructed examples. Results are indicative, not an AI safety certification.',
  tabCaseText:"Ali's case simulation",tabAssessmentText:'Your readiness assessment',tabMethodText:'The technical model',
  caseEyebrow:'A WORKED ORGANISATIONAL SCENARIO',caseTitle:"Meet Ali. The reports aren't the whole problem.",
  caseIntro:'Ali oversees three youth programmes at a nonprofit in Jordan. Nine contributors provide monthly updates across spreadsheets, email and Word documents. His team spends a modelled 64 staff-hours preparing six reporting packages.',
  caseLabel:'CASE STUDY 01',m1label:'Active programmes',m2label:'Contributors',m3label:'Reporting packages',m4label:'Staff-hours / month',
  baselineTitle:'Where the monthly time goes',baselineSub:'Modelled staff-hours, all reporting staff',sourceTitle:'A closer look at the evidence',
  sourceIntro:"Ali sees figures that don't appear to match in one programme's records:",sourceA:'Approved register',sourceAl:'Unique participants',sourceB:'Narrative draft',sourceBl:'Participants reached',
  sourceNote:'Both figures may be valid if they describe different indicators. Verify definitions before asking any tool to reconcile them.',
  simEyebrow:'DECISION SIMULATION',simTitle:"You're advising Ali. What comes next?",caseProgress:n=>`Step ${n} of 4`,
  caseNext:'Next step',caseBack:'Back',caseFinish:'Show decision report',caseAgain:'Revise decisions',
  readEyebrow:'ORGANISATIONAL SELF-ASSESSMENT',readTitle:'Is your organisation ready to test AI responsibly?',
  readIntro:'Answer 12 evidence-focused questions across six areas. Choose the current state of your organisation, not its intended future state. An uncertain answer remains uncertain in the report.',
  readLabel:'PRIVATE / IN BROWSER',readNote:'Do not enter names, case notes, financial records or confidential information. Your selections stay in this browser session unless you download a report.',
  scale:['0 · Not in place','1 · Partly in place','2 · In place + evidenced','? · Not sure'],
  assessmentProgress:n=>`${n} of 12 answered`,assessmentCalculate:'View my assessment',assessmentReset:'Clear answers',assessmentMissing:'Please answer every question, including “Not sure” where appropriate.',
  methodEyebrow:'OPEN TECHNICAL MODEL',methodTitle:'Understand the method behind the recommendation.',
  methodIntro:'A transparent, deliberately bounded decision model. Reproduce calculations, review the synthetic inputs and examine the safeguards before adapting this approach.',
  methodLabel:'PROTOTYPE v0.1',footerTag:'Strategic Partnerships, Social Innovation & International Development',footerDraft:'Methodology demonstration · not a completed client engagement',
  activity:['Collect and chase updates','Consolidate data and files','Resolve inconsistencies','Prepare bilingual narratives','Verify sources and content','Final revisions and approval'],
  caseSteps:[
   {tag:'01 / ASSESS',title:'What problem should Ali investigate first?',intro:'The team spends 36 of 64 hours collecting, consolidating and resolving data. Choose the most defensible initial diagnosis.',choices:[['fragmented_inputs','Reporting inputs and definitions are fragmented','Map the workflow, improve input consistency and validate indicators.'],['writing_time','Writing is the only bottleneck','Concentrate on drafting speed, leaving upstream rework unexamined.'],['missing_ai','The organisation lacks an AI tool','Choose technology before identifying the operational constraint.']]},
   {tag:'02 / EVALUATE & PRIORITISE',title:'Which improvement should Ali pursue?',intro:'Compare organisational improvements with controlled AI assistance. Each option has different dependencies.',choices:[['process','Standardise the reporting process first','Common templates, indicator definitions and review responsibilities.'],['ai_only','Test AI drafting without fixing the inputs','Might reduce writing time but leaves fragmented source information.'],['combined','Standardise first, then pilot AI-assisted drafting','Sequence process improvements before a bounded, reviewed AI test.'],['auto_approval','Let AI approve and submit reports','Removes human sign-off; not permitted in this scenario.']]},
   {tag:'03 / SAFEGUARDS',title:'What controls will be in place?',intro:'An AI pilot requires approved inputs, authorised tools and named human reviewers. Choose the controls in the proposed plan.',choices:[['approved','Approved tool, safe inputs and human review','The authorised team can test controlled drafting using permitted data.'],['partial','Some controls are unresolved','Proceed with process changes, but defer the AI component.'],['none','No formal approval or review controls','Do not move an AI tool into this operational workflow.']]},
   {tag:'04 / EVALUATION',title:'What evidence will determine whether the pilot continues?',intro:'The team must evaluate the complete workflow, not just the quality or speed of one draft.',choices:[['quality_cost_risk','Accuracy, staff time, cost, risk and usability','Define baselines, thresholds and a human approval gate.'],['speed_only','Time saved on AI drafting alone','Misses correction effort, costs and substantive reporting errors.'],['informal','Staff impressions without a test protocol','Useful feedback, but insufficient to establish operational value.']]}
  ],
  intervention:['Process redesign','AI drafting only','Process redesign + controlled AI','Unreviewed automated approval'],
  scoreCaseTitle:'Your implementation scenario',scoreBase:'Constructed baseline',scoreModel:'Modelled monthly effort',scoreChange:'Modelled reduction',
  scoreCasePassed:'Eligible for controlled testing, subject to actual review and approval.',scoreCaseBlocked:'AI component blocked: governance or approval conditions are not met.',
  scoreAuto:'Automated approval is rejected. Staff remain responsible for reporting judgements and external submissions.',
  scoreEval:'A reliable scale-up decision is not possible with the chosen evaluation approach.',
  scoreDiag:'The selected diagnosis does not address the largest measured workload components. Revisit the upstream reporting process.',
  scoreAssumptions:'Illustrative calculations only. They exclude transition effort, AI fees, training costs and any newly observed errors. No savings are verified.',
  scoreCaseOutcome:'Planning recommendation',scoreScale:'Pilot is a test, not permission for unattended or live deployment.',
  downloadCase:'Download case report (.json)',downloadAssessment:'Download assessment (.json)',
  readResultTitle:'Your organisational readiness profile',readResultCaution:'This is a self-assessment, not an audit or certification.',
  readGateTitle:'Operational AI use: decision gate',readGateBlocked:'Do not proceed with live operational AI inputs. Use synthetic examples while resolving the requirements below.',
  readGateConditional:'Core prerequisites are self-reported as evidenced. A formal tool, privacy and risk review is still needed before live deployment.',
  readUnknown:'“Not sure” answers are treated as unverified for planning, not proof that a capability is absent.',
  readAreasTitle:'Priority capability gaps',readNoGaps:'All statements were self-reported as evidenced. Verify controls independently and set a scoped pilot before deployment.',
  readCriteria:'Assessment areas',readNeed:'Recommended next action',readBand:{documented:'Evidenced',developing:'Developing',foundation:'Needs evidence'},
  dim:{
    process:['Processes and baselines','Can the team see where work happens and measure it?','Map the workflow and record current time, rework and quality issues.'],
    data:['Data and information','Are source definitions and permissions reliable?','Define indicators, data classifications, access permissions and approved source records.'],
    people:['People and verification','Can staff question and check AI-assisted outputs?','Train reviewers on verification, bilingual quality and escalation.'],
    governance:['Governance and accountability','Are tools authorised and decisions owned by staff?','Approve tools, record risk controls and assign explicit human sign-off.'],
    technology:['Systems and integration','Can the workflow operate with existing information systems?','Inventory systems and test interoperability and access controls.'],
    implementation:['Pilot delivery','Can the team own, evaluate and sustain a controlled experiment?','Assign an owner, resources, thresholds and a stop/review decision.']
  },
  questions:{
    process_documented:'Is the current workflow documented, with clear responsibilities?',process_baseline:'Do you measure effort, delays and quality before introducing technology?',
    data_definitions:'Are the relevant data fields and indicators consistently defined?',data_permissions:'Do you have a documented rule for what information may enter an approved AI tool?',
    people_skills:'Have relevant staff been trained in AI limitations and verification?',people_review:'Can a named reviewer verify sources, languages and key claims?',
    governance_tool:'Has a responsible authority approved the proposed tool and its data terms?',governance_approval:'Is human approval required before AI-assisted decisions or external reporting?',
    technology_sources:'Can staff reliably access authoritative source documents?',technology_fit:'Has the proposed tool been checked for fit with existing systems and constraints?',
    implementation_owner:'Is an accountable pilot owner assigned with time and resources?',implementation_evaluation:'Are measurable success, failure and stopping criteria agreed in advance?'
  },
  gateDescriptions:{data_permissions:'Approved data-input rules',governance_tool:'Tool and data-terms approval',governance_approval:'Human sign-off and accountability'},
  methodCards:[
    ['Four-step operating method','<b>Assess</b> the current workflow; <b>Evaluate</b> feasible interventions; <b>Prioritise</b> value and safeguards; <b>Plan</b> a bounded pilot.'],
    ['Workload calculations','Constructed baseline: 12 + 14 + 10 + 14 + 10 + 4 = <b>64 staff-hours</b>. Process redesign is modelled at 52 hours; adding controlled drafting yields 46 hours. No impact has been measured.'],
    ['Readiness evidence model','Six dimensions, two statements each. Responses score 0, 1 or 2 evidence points. “Not sure” earns no verified points and is separately flagged. Dimensions are reported individually, not as a certification.'],
    ['Non-negotiable gates','A live AI pilot cannot be recommended without documented input permissions, authorised tool/data terms and human approval. The score cannot override these gates.'],
    ['Data and privacy','The demonstration uses synthetic aggregate data only; no personal information is needed. Answers are processed in your browser. No external service receives them.'],
    ['Reuse and independent review','Inspect model.js for the calculation rules, /data for example inputs and /docs for definitions, limitations and adaptation guidance. Validate before reuse.']
  ],
  methodLinks:['Read methodology','Scoring rules','Synthetic input data','Implementation notes'],
  noData:'None provided',reviewOnly:'Planning exercise only · no operational authorisation',copyNotNeeded:'Download saves a local JSON report. Nothing is uploaded.'
 },
 ar:{
  brandSub:'إعداد وتصميم صدام سيالة · أدوات ومنهجيات تطبيقية',heroEyebrow:'ذا إمباكت كونكتور / مختبر تصميم سير العمل والذكاء الاصطناعي',heroTitle:'تبنّي الذكاء الاصطناعي يبدأ بفهم طريقة العمل.',
  heroLead:'تعرّف على التحدّي الذي يواجه علي في إعداد التقارير، وقيّم جاهزية مؤسستك، واطّلع على القواعد التي تستند إليها التوصيات.',
  heroAssessment:'قيّم جاهزية مؤسستك',heroCase:'استكشف حالة علي',metaTime:'تقييم ذاتي في ٥–٧ دقائق',metaPrivate:'دون تسجيل أو إرسال بيانات',
  noticeText:'هذه نسخة تجريبية للمراجعة. شخصية علي والمؤسسة وجميع الأرقام أمثلة مُنشأة للتوضيح، والنتائج إرشادية وليست شهادة تؤكد سلامة استخدام الذكاء الاصطناعي.',
  tabCaseText:'محاكاة حالة علي',tabAssessmentText:'تقييم جاهزية مؤسستك',tabMethodText:'النموذج الفني الكامل',
  caseEyebrow:'حالة تنظيمية مشروحة خطوة بخطوة',caseTitle:'تعرّف على علي: كتابة التقارير ليست المشكلة كلها.',
  caseIntro:'يشرف علي على ثلاثة برامج للشباب في مؤسسة غير ربحية بالأردن. يرسل تسعة موظفين تحديثاتهم الشهرية عبر الجداول الإلكترونية والبريد والملفات النصية. ووفق بيانات المثال، يحتاج الفريق إلى ٦٤ ساعة عمل لإعداد ست حزم تقارير شهرياً.',
  caseLabel:'الحالة التطبيقية ٠١',m1label:'البرامج النشطة',m2label:'المساهمون في التقارير',m3label:'حزم التقارير',m4label:'ساعات العمل شهرياً',
  baselineTitle:'كيف يتوزّع وقت الفريق؟',baselineSub:'ساعات افتراضية تشمل جميع المشاركين في إعداد التقارير',sourceTitle:'لننظر إلى الأدلة عن قرب',
  sourceIntro:'يجد علي رقمين يبدوان متعارضين في سجلات أحد البرامج:',sourceA:'سجل الحضور المعتمد',sourceAl:'المشاركون الفريدون',sourceB:'المسودة السردية',sourceBl:'الأشخاص الذين وصل إليهم البرنامج',
  sourceNote:'قد يكون الرقمان صحيحين إذا كان لكل منهما تعريف مختلف. يجب التحقق من معنى المؤشر قبل الطلب من أي أداة توحيد الرقمين.',
  simEyebrow:'محاكاة اتخاذ القرار',simTitle:'أنت مستشار علي. ما الخطوة التالية؟',caseProgress:n=>`الخطوة ${n} من ٤`,
  caseNext:'الخطوة التالية',caseBack:'السابق',caseFinish:'اعرض تقرير القرار',caseAgain:'غيّر اختياراتك',
  readEyebrow:'تقييم ذاتي للمؤسسات',readTitle:'هل مؤسستك جاهزة لاختبار الذكاء الاصطناعي بمسؤولية؟',
  readIntro:'أجب عن ١٢ سؤالاً تستند إلى الأدلة، موزعة على ستة محاور. اختر الوضع القائم فعلاً، لا ما تنوي المؤسسة تحقيقه لاحقاً. وسنُبقي الإجابات غير المؤكدة واضحة في التقرير.',
  readLabel:'خاص / داخل المتصفح',readNote:'لا تُدخل أسماء أشخاص أو تفاصيل حالات أو بيانات مالية أو معلومات سرية. تبقى اختياراتك في جلسة المتصفح ما لم تقم بتنزيل التقرير.',
  scale:['٠ · غير متوفر','١ · متوفر جزئياً','٢ · متوفر وموثّق','؟ · غير متأكد'],
  assessmentProgress:n=>`تمت الإجابة عن ${n} من ١٢`,assessmentCalculate:'اعرض نتيجة التقييم',assessmentReset:'امسح الإجابات',assessmentMissing:'يرجى الإجابة عن جميع الأسئلة، ويمكن اختيار «غير متأكد» عند الحاجة.',
  methodEyebrow:'النموذج الفني المفتوح',methodTitle:'افهم المنهجية التي تقف وراء التوصيات.',
  methodIntro:'نموذج واضح ومحدود النطاق لاتخاذ القرار. يمكنك مراجعة حساباته وبياناته التجريبية وضوابطه قبل التفكير في استخدامه داخل مؤسستك.',
  methodLabel:'نسخة تجريبية ٠.١',footerTag:'الشراكات الاستراتيجية والابتكار الاجتماعي والتنمية الدولية',footerDraft:'نموذج منهجي توضيحي · ليس مشروعاً منفّذاً لعميل',
  activity:['جمع التحديثات ومتابعتها','دمج الملفات والبيانات','معالجة التباينات','إعداد النصوص بالعربية والإنجليزية','مراجعة المصادر والمحتوى','التعديلات النهائية وإجراءات الاعتماد'],
  caseSteps:[
   {tag:'٠١ / التقييم الأولي',title:'ما المشكلة التي ينبغي لعلي فحصها أولاً؟',intro:'يقضي الفريق ٣٦ ساعة من أصل ٦٤ في جمع البيانات ودمجها وحل التباينات. اختر التشخيص الأقرب إلى الأدلة.',choices:[['fragmented_inputs','المدخلات والتعريفات غير موحّدة','تتبّع الخطوات، ونظّم المدخلات، وتحقق من تعريف المؤشرات.'],['writing_time','الكتابة هي المشكلة الوحيدة','التركيز على سرعة المسودات مع تجاهل إعادة العمل في المراحل السابقة.'],['missing_ai','المؤسسة تفتقر إلى أداة ذكاء اصطناعي','اختيار التقنية قبل تحديد الخلل التشغيلي.']]},
   {tag:'٠٢ / دراسة البدائل وترتيبها',title:'أي تحسين ينبغي لعلي اختياره؟',intro:'قارن بين تحسين طريقة العمل والاستعانة بالذكاء الاصطناعي ضمن نطاق محدد.',choices:[['process','توحيد آلية إعداد التقارير أولاً','قوالب مشتركة وتعريفات واضحة للمؤشرات ومسؤوليات محددة للمراجعة.'],['ai_only','اختبار صياغة المسودات بالذكاء الاصطناعي دون إصلاح المدخلات','قد يخفّف وقت الكتابة لكنه لا يعالج تشتّت المعلومات.'],['combined','توحيد العمل أولاً، ثم اختبار الصياغة بمساعدة الذكاء الاصطناعي','معالجة المشكلات الأساسية قبل تجربة محدودة تخضع للمراجعة.'],['auto_approval','ترك اعتماد التقارير وإرسالها للذكاء الاصطناعي','يلغي الاعتماد البشري؛ وهو خيار غير مسموح به في هذه الحالة.']]},
   {tag:'٠٣ / ضوابط الاستخدام',title:'ما الضوابط المتوفرة في الخطة؟',intro:'تحتاج التجربة إلى بيانات مسموح باستخدامها، وأداة معتمدة، ومراجعين مسؤولين.',choices:[['approved','أداة معتمدة ومدخلات آمنة ومراجعة بشرية','يمكن للفريق المخوّل اختبار إعداد المسودات ضمن نطاق مصرح به.'],['partial','بعض متطلبات الحوكمة لم تُحسم','ننفّذ التحسينات الإدارية ونؤجل استخدام الذكاء الاصطناعي.'],['none','لا توجد موافقات أو آلية مراجعة رسمية','لا ينبغي إدخال الذكاء الاصطناعي إلى سير العمل التشغيلي.']]},
   {tag:'٠٤ / قياس النتائج',title:'كيف نقرر إن كانت التجربة تستحق الاستمرار؟',intro:'يجب تقييم سير العمل كاملاً، لا سرعة إنتاج المسودة وحدها.',choices:[['quality_cost_risk','الدقة ووقت الفريق والتكلفة والمخاطر وسهولة الاستخدام','اعتماد خط أساس ومعايير واضحة وحدّ للموافقة البشرية.'],['speed_only','الوقت الذي وفرته كتابة المسودة فقط','يتجاهل وقت التصحيح والتكاليف والأخطاء المحتملة.'],['informal','الانطباعات العامة دون خطة اختبار','الآراء مفيدة، لكنها لا تكفي لإثبات جدوى التطبيق.']]}
  ],
  intervention:['إعادة تنظيم العمل','صياغة المسودات بالذكاء الاصطناعي فقط','تحسين العملية ثم اختبار الذكاء الاصطناعي','اعتماد وإرسال تلقائي دون مراجعة'],
  scoreCaseTitle:'نتيجة سيناريو التنفيذ',scoreBase:'خط الأساس الافتراضي',scoreModel:'ساعات العمل المتوقعة في النموذج',scoreChange:'الانخفاض الافتراضي',
  scoreCasePassed:'يمكن الانتقال إلى اختبار محدود بعد استكمال المراجعة والموافقات الفعلية.',scoreCaseBlocked:'تعطّل مكوّن الذكاء الاصطناعي بسبب نقص الموافقات أو الضوابط.',
  scoreAuto:'يُرفض الاعتماد التلقائي دون مراجعة. يتحمل الموظفون مسؤولية التحقق والقرارات وإرسال التقارير.',
  scoreEval:'لا يمكن اتخاذ قرار موثوق بتوسيع الاستخدام وفق طريقة التقييم المختارة.',
  scoreDiag:'التشخيص المختار لا يعالج الأنشطة الأكثر استهلاكاً للوقت في البيانات. راجع مراحل جمع المعلومات وتوحيدها.',
  scoreAssumptions:'هذه حسابات توضيحية وليست نتائج مثبتة. لا تشمل كلفة التحول أو رسوم الأدوات أو التدريب أو أخطاء إضافية قد تظهر. لم يتم التحقق من أي وفورات.',
  scoreCaseOutcome:'الخطوة المقترحة',scoreScale:'التجربة ليست إذناً بالتشغيل الآلي أو معالجة بيانات حقيقية.',
  downloadCase:'نزّل تقرير الحالة (.json)',downloadAssessment:'نزّل تقرير التقييم (.json)',
  readResultTitle:'ملف جاهزية مؤسستك',readResultCaution:'هذا تقييم ذاتي وليس تدقيقاً مستقلاً أو شهادة اعتماد.',
  readGateTitle:'شرط الانتقال للاستخدام الفعلي',readGateBlocked:'لا تنتقل إلى إدخال بيانات تشغيلية حقيقية في أدوات الذكاء الاصطناعي. استخدم بيانات تجريبية إلى أن تُستكمل المتطلبات التالية.',
  readGateConditional:'المتطلبات الأساسية موثّقة بحسب إجاباتك، لكن يجب إجراء مراجعة فعلية للأداة والخصوصية والمخاطر قبل أي تشغيل حقيقي.',
  readUnknown:'نعتبر إجابة «غير متأكد» دليلاً غير متحقق منه لأغراض التخطيط، وليس دليلاً على غياب القدرة.',
  readAreasTitle:'الفجوات التي تستحق المعالجة',readNoGaps:'أشرت إلى توثيق جميع البنود. لا يزال من الضروري التحقق المستقل من الضوابط وتحديد تجربة محدودة قبل التطبيق.',
  readCriteria:'محاور التقييم',readNeed:'الخطوة المقترحة',readBand:{documented:'موثّق',developing:'قيد التطوير',foundation:'يحتاج أدلة'},
  dim:{
    process:['العمليات وخط الأساس','هل نفهم خطوات العمل ونستطيع قياسها؟','وثّق العملية وقِس الوقت وإعادة العمل ومشكلات الجودة.'],
    data:['البيانات والمعلومات','هل المصادر والتعريفات والصلاحيات واضحة؟','وحّد المؤشرات، وصنّف البيانات، وحدّد الصلاحيات والمصادر المسموح بها.'],
    people:['المهارات والمراجعة','هل يستطيع الموظفون التحقق من المخرجات؟','درّب المراجعين على التحقق من المصادر والمحتوى باللغتين وآلية التصعيد.'],
    governance:['الحوكمة والمساءلة','هل الأدوات معتمدة والقرارات بيد أشخاص محددين؟','اعتمد الأدوات وسجّل المخاطر وحدّد مسؤولاً عن الموافقة البشرية.'],
    technology:['الأنظمة والتكامل','هل يمكن للحل العمل مع الأنظمة القائمة؟','احصر الأنظمة واختبر توافق الأدوات وصلاحيات الوصول.'],
    implementation:['إدارة التجربة','هل توجد قدرة لإدارة تجربة محدودة وتقييمها؟','حدّد مسؤولاً وموارد ومعايير للنجاح والتوقف والمراجعة.']
  },
  questions:{
    process_documented:'هل خطوات العمل الحالية موثّقة ومسؤولياتها واضحة؟',process_baseline:'هل تقيسون الجهد والتأخير والجودة قبل إدخال تقنية جديدة؟',
    data_definitions:'هل حقول البيانات ومؤشرات البرامج ذات تعريفات موحّدة؟',data_permissions:'هل لديكم قواعد موثّقة لما يجوز إدخاله في أداة ذكاء اصطناعي معتمدة؟',
    people_skills:'هل تلقّى الموظفون المعنيون تدريباً على حدود الذكاء الاصطناعي وكيفية التحقق منه؟',people_review:'هل يوجد مراجع محدد يستطيع التحقق من المصادر واللغتين والمعلومات الأساسية؟',
    governance_tool:'هل وافقت جهة مخوّلة على الأداة المقترحة وشروط معالجة البيانات فيها؟',governance_approval:'هل تشترط المؤسسة موافقة بشرية قبل القرارات أو التقارير التي ساعد الذكاء الاصطناعي في إعدادها؟',
    technology_sources:'هل يستطيع الموظفون الوصول إلى المصادر المعتمدة بوضوح وانتظام؟',technology_fit:'هل جرى التحقق من توافق الأداة المقترحة مع الأنظمة والقيود القائمة؟',
    implementation_owner:'هل يوجد مسؤول واضح عن التجربة ولديه وقت وموارد كافية؟',implementation_evaluation:'هل اتُفق مسبقاً على معايير قابلة للقياس للنجاح والفشل والتوقف؟'
  },
  gateDescriptions:{data_permissions:'قواعد استخدام البيانات',governance_tool:'اعتماد الأداة وشروط البيانات',governance_approval:'المراجعة البشرية والمساءلة'},
  methodCards:[
    ['منهجية من أربع مراحل','<b>تقييم الواقع</b> وفهم سير العمل، ثم <b>دراسة البدائل</b>، و<b>ترتيب الأولويات</b>، ثم <b>تخطيط تجربة</b> محددة يمكن قياسها.'],
    ['حساب الجهد التشغيلي','خط الأساس الافتراضي: ١٢ + ١٤ + ١٠ + ١٤ + ١٠ + ٤ = <b>٦٤ ساعة عمل</b>. نموذج تحسين العملية يصل إلى ٥٢ ساعة، ومع إضافة صياغة مضبوطة تصبح ٤٦ ساعة. هذه افتراضات وليست نتائج مثبتة.'],
    ['نموذج إثبات الجاهزية','ستة محاور، لكل محور سؤالان. تمنح الإجابات صفرًا أو نقطة أو نقطتين بحسب توافر الأدلة. وتُسجّل إجابات «غير متأكد» على حدة. لا تتحول النتائج إلى شهادة جاهزية.'],
    ['شروط لا تتجاوزها النقاط','لا نوصي بإدخال بيانات تشغيلية حقيقية دون قواعد موثّقة للمدخلات، وأداة معتمدة، ومسؤولية بشرية واضحة عن الموافقة.'],
    ['البيانات والخصوصية','تعتمد المحاكاة على بيانات تجريبية إجمالية فقط. لا يحتاج التقييم إلى معلومات شخصية، وتُعالج الإجابات محلياً داخل المتصفح.'],
    ['إعادة الاستخدام والمراجعة','تتضمن الحزمة ملف model.js لقواعد الحساب، وملفات /data للبيانات التجريبية، و/docs للمنهجية وحدود استخدامها. يجب التحقق من النموذج قبل تبنّيه.']
  ],
  methodLinks:['اقرأ المنهجية','قواعد التقييم','ملفات البيانات التجريبية','ملاحظات التطبيق'],
  noData:'لا يوجد',reviewOnly:'تمرين تخطيطي · لا يمنح إذناً بالتطبيق الفعلي',copyNotNeeded:'سيُحفظ ملف JSON على جهازك، دون رفع أي بيانات.'
 }
};
const ids=['brandSub','heroEyebrow','heroTitle','heroLead','metaTime','metaPrivate','noticeText','tabCaseText','tabAssessmentText','tabMethodText','caseEyebrow','caseTitle','caseIntro','caseLabel','m1label','m2label','m3label','m4label','baselineTitle','baselineSub','sourceTitle','sourceIntro','sourceA','sourceAl','sourceB','sourceBl','sourceNote','simEyebrow','simTitle','readEyebrow','readTitle','readIntro','readLabel','readNote','methodEyebrow','methodTitle','methodIntro','methodLabel','footerTag','footerDraft'];
const $=id=>document.getElementById(id);
const tr=()=>dictionary[state.lang];
const htmlSafe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function buttonLabel(id,key){$(id).textContent=tr()[key];}
function langChange(lang){
 state.lang=lang;
 document.documentElement.lang=lang; document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 $('langEn').setAttribute('aria-pressed',String(lang==='en'));$('langAr').setAttribute('aria-pressed',String(lang==='ar'));
 ids.forEach(id=>{ if($(id)) $(id).textContent=tr()[id]; });
 buttonLabel('heroAssessment','heroAssessment');buttonLabel('heroCase','heroCase');buttonLabel('caseBack','caseBack');buttonLabel('assessmentCalculate','assessmentCalculate');buttonLabel('assessmentReset','assessmentReset');
 drawBaseline();drawCase();drawAssessment();drawMethod();
}
function switchTab(tab,scroll=true){state.tab=tab;['case','assessment','method'].forEach(name=>{ const on=name===tab;$('panel'+name.charAt(0).toUpperCase()+name.slice(1)).classList.toggle('hidden',!on); $('tab'+name.charAt(0).toUpperCase()+name.slice(1)).classList.toggle('active',on);$('tab'+name.charAt(0).toUpperCase()+name.slice(1)).setAttribute('aria-selected',String(on)); });
 if(scroll){const target=$('tabCase');target?.parentElement?.scrollIntoView({behavior:'smooth',block:'start'});}
}
function drawBaseline(){ $('baselineBars').innerHTML=model.baseline.activities.map((row,i)=>`<div class="bar-row"><div class="bar-meta"><span>${htmlSafe(tr().activity[i])}</span><span>${row.hours} h</span></div><div class="track"><span class="fill" style="width:${row.hours/14*100}%"></span></div></div>`).join(''); }
function drawCase(){
 const a=tr(),index=state.caseStep,step=a.caseSteps[index],key=['diagnosis','intervention','controls','evaluation'][index],selected=state.caseAnswers[key];
 $('caseProgress').textContent=a.caseProgress(index+1);$('caseProgressBar').style.width=`${25*(index+1)}%`;
 $('caseQuestion').innerHTML=`<div class="question-kicker">${htmlSafe(step.tag)}</div><div class="question-title">${htmlSafe(step.title)}</div><p class="question-context">${htmlSafe(step.intro)}</p><div role="radiogroup" aria-label="${htmlSafe(step.title)}">${step.choices.map(([v,label,detail])=>`<label class="option"><input type="radio" name="case-${key}" value="${v}" ${selected===v?'checked':''}/><div><strong>${htmlSafe(label)}</strong><span>${htmlSafe(detail)}</span></div></label>`).join('')}</div>`;
 document.querySelectorAll(`input[name="case-${key}"]`).forEach(input=>input.addEventListener('change',()=>{state.caseAnswers[key]=input.value;state.caseReport=false;drawCase();}));
 $('caseBack').disabled=index===0;$('caseNext').disabled=!selected;$('caseNext').textContent=index===3?a.caseFinish:a.caseNext;
 $('caseResult').classList.toggle('hidden',!state.caseReport);
 if(state.caseReport) drawCaseReport();
}
function caseNext(){if(!state.caseAnswers[['diagnosis','intervention','controls','evaluation'][state.caseStep]])return;if(state.caseStep<3){state.caseStep++;state.caseReport=false;drawCase();} else {state.caseReport=true;drawCase();$('caseResult').scrollIntoView({behavior:'smooth',block:'nearest'});} }
function caseBack(){state.caseStep=Math.max(0,state.caseStep-1);state.caseReport=false;drawCase();}
function drawCaseReport(){
 const a=tr(),r=model.evaluateCase(state.caseAnswers),message=r.automated?a.scoreAuto:r.blocked?a.scoreCaseBlocked:a.scoreCasePassed;
 let notes=[];if(!r.diagnosisSupported)notes.push(a.scoreDiag);if(!r.evaluationSufficient)notes.push(a.scoreEval);notes.push(a.scoreAssumptions);
 $('caseResult').innerHTML=`<h3>${a.scoreCaseTitle}</h3><div class="${r.blocked?'alert':'good-note'}">${message}</div><dl><div><dt>${a.scoreBase}</dt><dd>64 h</dd></div><div><dt>${a.scoreModel}</dt><dd>${r.hours} h</dd></div><div><dt>${a.scoreChange}</dt><dd>${r.percentChange}%</dd></div></dl><h4>${a.scoreCaseOutcome}</h4><p>${a.scoreScale}</p>${notes.map(n=>`<p class="small-note">${n}</p>`).join('')}<div class="report-actions"><button type="button" class="btn primary" id="downloadCase">${a.downloadCase}</button><button type="button" class="btn muted" id="reviseCase">${a.caseAgain}</button></div>`;
 $('downloadCase').addEventListener('click',()=>download('ali-case-decision-report.json',{model_version:'0.1',language:state.lang,illustrative:true,created_at:new Date().toISOString(),baseline:model.baseline,selection:state.caseAnswers,outcome:r,limitations:notes}));
 $('reviseCase').addEventListener('click',()=>{state.caseStep=0;state.caseReport=false;drawCase();});
}
function drawAssessment(){
 const a=tr();$('readScale').innerHTML=a.scale.map(s=>`<span>${htmlSafe(s)}</span>`).join('');
 $('assessmentQuestions').innerHTML=model.dimensions.map((dim,i)=>`<div class="dimension"><div class="dimension-head"><span class="dimension-num">0${i+1}</span><div><h3>${htmlSafe(a.dim[dim.id][0])}</h3><p class="dim-desc">${htmlSafe(a.dim[dim.id][1])}</p></div></div>${dim.questions.map(id=>`<div class="assess-question"><label class="q-title" id="label-${id}">${htmlSafe(a.questions[id])}</label><div role="radiogroup" class="choice-row" aria-labelledby="label-${id}">${model.answerOptions.map((v,j)=>`<label><input type="radio" name="${id}" value="${v}" ${state.assessment[id]===v?'checked':''}/>${htmlSafe(a.scale[j].split(' · ')[1])}</label>`).join('')}</div></div>`).join('')}</div>`).join('');
 $('assessmentQuestions').querySelectorAll('input[type="radio"]').forEach(el=>el.addEventListener('change',()=>{state.assessment[el.name]=el.value;state.assessmentShown=false;$('assessmentResult').classList.add('hidden');updateAssessmentProgress();}));
 updateAssessmentProgress();if(state.assessmentShown)drawAssessmentReport();
}
function updateAssessmentProgress(){const n=Object.keys(state.assessment).length; $('assessmentProgress').textContent=tr().assessmentProgress(n);}
function calculateAssessment(){
 const score=model.scoreAssessment(state.assessment);
 if(!score.allAnswered){$('assessmentResult').classList.remove('hidden');$('assessmentResult').innerHTML=`<div class="alert">${tr().assessmentMissing}</div>`;return;}
 state.assessmentShown=true;drawAssessmentReport();$('assessmentResult').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function drawAssessmentReport(){
 const a=tr(),r=model.scoreAssessment(state.assessment);if(!r.allAnswered)return;
 let gate=r.missingGates.length>0;
 let html=`<h3>${a.readResultTitle}</h3><p>${a.readResultCaution}</p><div class="result-grid">`;
 for(const s of r.scores){const title=a.dim[s.id][0];html+=`<div class="result-dimension"><h4>${htmlSafe(title)}</h4><div class="bar-meta"><span>${htmlSafe(a.readBand[s.band])}</span><span>${s.points}/4</span></div><div class="track"><span class="fill" style="width:${s.percent}%"></span></div><p>${htmlSafe(a.dim[s.id][2])}</p></div>`;}
 html+='</div><h3 style="margin-top:22px">'+a.readGateTitle+'</h3>';
 html+=`<div class="${gate?'alert':'good-note'}">${gate?a.readGateBlocked:a.readGateConditional}</div>`;
 if(gate) html+=`<ul>${r.missingGates.map(k=>`<li>${htmlSafe(a.gateDescriptions[k])}</li>`).join('')}</ul>`;
 if(r.unknownCount>0)html+=`<p class="small-note">${a.readUnknown}</p>`;
 html+=`<h3 style="margin-top:20px">${a.readAreasTitle}</h3>`;
 html+=r.areas.length?`<ul>${r.areas.map(k=>`<li><b>${htmlSafe(a.dim[k][0])}:</b> ${htmlSafe(a.dim[k][2])}</li>`).join('')}</ul>`:`<p>${a.readNoGaps}</p>`;
 html+=`<p class="small-note">${a.reviewOnly}</p><div class="report-actions"><button class="btn primary" type="button" id="downloadAssessment">${a.downloadAssessment}</button></div>`;
 $('assessmentResult').innerHTML=html;$('assessmentResult').classList.remove('hidden');
 $('downloadAssessment').addEventListener('click',()=>download('ai-readiness-self-assessment.json',{
  model_version:'0.1',language:state.lang,created_at:new Date().toISOString(),is_self_assessment:true,is_certification:false,
  answers:state.assessment,scores:r,important_note:a.readResultCaution,critical_controls:r.missingGates.map(k=>a.gateDescriptions[k]),
  suggested_actions:r.areas.map(id=>({dimension:a.dim[id][0],action:a.dim[id][2]}))}));
}
function drawMethod(){const a=tr();$('methodContent').innerHTML=`<div class="method-grid">${a.methodCards.map(([name,html])=>`<div class="method-tile"><h3>${name}</h3><p>${html}</p></div>`).join('')}<div class="method-tile"><h3>${a.methodLinks[0]}</h3><p><a href="docs/methodology.md" target="_blank" rel="noopener">${a.methodLinks[0]} ↗</a></p><p><a href="docs/assessment_specification.md" target="_blank" rel="noopener">${a.methodLinks[1]} ↗</a></p><p><a href="data/reporting_worklog.csv" target="_blank" rel="noopener">${a.methodLinks[2]} ↗</a></p></div><div class="method-tile"><h3>${a.methodLinks[3]}</h3><p>${a.copyNotNeeded}</p><p>model.js · data/*.csv · docs/*.md · tests/model.test.cjs</p></div></div>`;}
function download(filename,obj){const json=JSON.stringify(obj,null,2),blob=new Blob([json],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('langEn').addEventListener('click',()=>langChange('en'));
$('langAr').addEventListener('click',()=>langChange('ar'));
['case','assessment','method'].forEach(tab=>$('tab'+tab.charAt(0).toUpperCase()+tab.slice(1)).addEventListener('click',()=>switchTab(tab)));
$('heroAssessment').addEventListener('click',()=>switchTab('assessment'));
$('heroCase').addEventListener('click',()=>switchTab('case'));
$('caseNext').addEventListener('click',caseNext);$('caseBack').addEventListener('click',caseBack);
$('assessmentCalculate').addEventListener('click',calculateAssessment);
$('assessmentReset').addEventListener('click',()=>{state.assessment={};state.assessmentShown=false;$('assessmentResult').classList.add('hidden');drawAssessment();});
langChange('en');switchTab('case',false);
})();