/* The Impact Connector - Applied AI Workflow Lab v0.1.
   Entirely synthetic demonstration, with no network calls or visitor tracking. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.LabModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const baseline = Object.freeze({
    programmes: 3, contributors: 9, packages: 6,
    monthlyHours: 64,
    activities: Object.freeze([
      {id:'collect',hours:12}, {id:'consolidate',hours:14},
      {id:'resolve',hours:10}, {id:'draft',hours:14},
      {id:'verify',hours:10}, {id:'approve',hours:4}
    ])
  });
  const dimensions = Object.freeze([
    { id:'process', questions:['process_documented','process_baseline'] },
    { id:'data', questions:['data_definitions','data_permissions'] },
    { id:'people', questions:['people_skills','people_review'] },
    { id:'governance', questions:['governance_tool','governance_approval'] },
    { id:'technology', questions:['technology_sources','technology_fit'] },
    { id:'implementation', questions:['implementation_owner','implementation_evaluation'] }
  ]);
  const answerOptions = ['0','1','2','unknown'];
  function scoreAssessment(answers) {
    const response = answers || {};
    const scores = dimensions.map(dim => {
      let points=0, unknown=0, answered=0;
      for (const id of dim.questions) {
        const value = response[id];
        if (!answerOptions.includes(String(value))) continue;
        answered += 1;
        if (value === 'unknown') unknown += 1;
        else points += Number(value);
      }
      return {id:dim.id, points, maximum:4, percent:Math.round(points/4*100),
        unknown, answered,
        band:points===4 && unknown===0 ? 'documented' : points>=2 && unknown===0 ? 'developing' : 'foundation'};
    });
    const allAnswered = scores.every(x=>x.answered===2);
    const gateRequirements = ['data_permissions','governance_tool','governance_approval'];
    const missingGates = gateRequirements.filter(id=>response[id]!== '2');
    const areas = scores.filter(s=>s.points<4 || s.unknown>0).map(s=>s.id);
    return {scores, allAnswered, missingGates, areas,
      permittedNextStep:missingGates.length ? 'synthetic_only' : 'controlled_pilot_review',
      unknownCount:scores.reduce((n,s)=>n+s.unknown,0)};
  }
  const caseChoices = Object.freeze({
    diagnosis:['fragmented_inputs','writing_time','missing_ai'],
    intervention:['process','ai_only','combined','auto_approval'],
    controls:['approved','partial','none'],
    evaluation:['quality_cost_risk','speed_only','informal']
  });
  function evaluateCase(choices) {
    const c = Object.assign({diagnosis:'fragmented_inputs',intervention:'combined',controls:'approved',evaluation:'quality_cost_risk'},choices||{});
    for(const [key,values] of Object.entries(caseChoices)) {
      if(!values.includes(c[key])) throw new Error('Invalid case selection: '+key);
    }
    const automated = c.intervention === 'auto_approval';
    const aiRequested = ['ai_only','combined'].includes(c.intervention);
    const aiPermitted = aiRequested && c.controls==='approved';
    let hours = baseline.monthlyHours;
    if(c.intervention==='process' || c.intervention==='combined') hours -= 12;
    if(aiPermitted) hours -= 6;
    // No unreviewed automated approval is permitted in this scenario.
    if(automated) hours = baseline.monthlyHours;
    const blocked = automated || (aiRequested && !aiPermitted);
    const evaluationSufficient = c.evaluation==='quality_cost_risk';
    return {
      choices:c, hours, changeHours:baseline.monthlyHours-hours,
      percentChange:Math.round((baseline.monthlyHours-hours)/baseline.monthlyHours*100),
      blocked, automated, aiPermitted, evaluationSufficient,
      diagnosisSupported:c.diagnosis==='fragmented_inputs',
      scaleRecommendation:!blocked && evaluationSufficient ? 'test_then_review' : 'not_ready',
      label: automated ? 'rejected' : blocked ? 'controls_missing' : evaluationSufficient ? 'test' : 'evaluation_missing'
    };
  }
  return { baseline, dimensions, answerOptions, caseChoices, scoreAssessment, evaluateCase };
});