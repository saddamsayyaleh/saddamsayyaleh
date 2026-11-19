# Applied AI Workflow Lab — Ali's Reporting Challenge

**Version:** 0.1 · **Status:** Proposed methodology for demonstration and internal review · **Provenance:** Constructed teaching case, not a documented client engagement.

## Purpose and audience

Illustrate a repeatable method for mid- and senior-level nonprofit leaders to examine organisational processes, evaluate potential AI uses, prioritise interventions and design a bounded, measurable pilot. The aim is to demonstrate applied institutional diagnosis and workflow design, not AI promotional content or a claim of professional technical commissions delivered.

## Scenario definition

Ali manages reporting across three youth programmes in Jordan. Nine contributors prepare programme information, which feeds six monthly reporting packages (three management-oriented and three donor-oriented outputs, with Arabic and English content as required). Information is spread across spreadsheets, emails and documents. The modelled reporting workload totals **64 staff-hours per month across all staff**, not 64 hours of Ali's personal labour.

| Activity | Baseline staff-hours/month |
| --- | ---: |
| Collecting and chasing updates | 12 |
| Consolidating files and data | 14 |
| Resolving inconsistencies | 10 |
| Preparing bilingual narratives | 14 |
| Verifying sources, language and claims | 10 |
| Final revisions and approval administration | 4 |
| **Total** | **64** |

The first three activities total **36 hours (56.25%)**. This supports investigating upstream information flows before purchasing AI drafting software. Every value is **synthetic and illustrative**; no field study, time log, adoption trial or client verification is claimed.

## Four-stage model

### 1. Assess

- Map sources, roles, handoffs, frequency, quality requirements, rework and approval authority.
- Determine what is symptom versus root cause. Missing evidence and ambiguous indicator definitions should be recorded as unresolved, not automatically 'corrected'.
- Establish a baseline across the whole team, including reviewer effort.
- Example: '118 unique participants' and '126 participants reached' may be different indicators, rather than contradictory figures. Compare definitions and sources before treating either as erroneous.

**Output:** current-state workflow map, bottleneck profile, data dictionary and issue log.

### 2. Evaluate

Compare alternatives that include non-AI improvements:

- **Process standardisation:** templates, indicators, reporting calendar, document organisation and review ownership.
- **Controlled bilingual drafting:** generate initial narrative drafts from permitted and source-checked inputs, with human verification.
- **Curated knowledge retrieval:** a possible later-stage intervention requiring trusted document access, permissions and source tracking.
- **Unreviewed automated approval:** deliberately included as a rejected option because it removes staff accountability for sensitive or externally submitted reports.

**Output:** alternatives list with dependencies, data classifications, costs, capabilities and risks.

### 3. Prioritise

Use operational value, feasibility, governance suitability and implementation ease as criteria. A numerical ranking is a decision aid, never a substitute for mandatory approval and safeguarding conditions. The v0.1 interface demonstrates consequences without giving the visitor a false 'certified' readiness score.

**Output:** reasoned intervention sequence and explicit stop/go prerequisites.

### 4. Plan

Proposed sequence: diagnose and validate the baseline; standardise inputs and indicators; test bounded AI drafting on synthetic or otherwise approved non-sensitive data; evaluate accuracy, staff time (including review), cost, incidents and usability.

The four-week illustration below is a **planning sequence only**:

| Week | Focus | Evidence |
| --- | --- | --- |
| 1 | Workflow mapping and baseline | Approved process map, time logs and observed discrepancies |
| 2 | Process redesign | Standard templates, indicator definitions, owners |
| 3 | Controlled synthetic-data drafting test | Versioned test outputs, review log, incidents and tool-approval check |
| 4 | Evaluate and decide | Baseline comparison, cost/risk findings and sign-off recommendation |

A four-week preparatory exercise does not establish performance across two real monthly reporting cycles; a live evaluation would need a longer, separately agreed period.

## Numerical demonstration model

The simulator intentionally uses simple, visible assumptions to demonstrate choice consequences:

- **Existing process:** 64 staff-hours/month.
- **Process redesign:** assume a reduction of 4 hours in collection, 5 in consolidation and 3 in discrepancies, leaving **52**.
- **Approved AI drafting alone:** assume 6 fewer hours of drafting while other tasks remain unchanged, leaving **58**. This does not establish data reliability.
- **Process redesign + approved AI drafting:** 52 – 6 = **46** hours/month.
- **AI controls incomplete:** the AI component is blocked; process redesign may still yield the modelled **52** if chosen.
- **Unreviewed automatic approval:** rejected; no saving is credited.

The 64→46 change is 18 hours or **28.125%**, displayed as **28%** after rounding. These are *modelled* and are **not** validated forecasts. Training, subscription costs, adoption effort, new quality checks and other impacts are excluded. In reality AI might make the process slower.

The simulated diagnosis and evaluation choices produce qualitative warnings; the deterministic workload outcomes are driven by the intervention and whether the AI controls are approved. The initial prototype should not pretend that selecting a 'correct' multiple-choice answer measures professional competence.

## Files and sources of synthetic data

The five CSV datasets in `../data/` provide a small, inspectable scenario:

- `programme_register.csv`: one record per programme, two packages per programme.
- `monthly_updates.csv`: nine contributors and intentionally uneven input quality.
- `indicator_records.csv`: approved aggregates alongside unverified draft statements.
- `reporting_worklog.csv`: one synthetic monthly time allocation per activity.
- `review_issues.csv`: issue descriptions, source pointers and investigation status.

### Important indicator distinction

'Participants reached' is a narrative term that requires a formally agreed definition before comparison with 'unique participants'. A reporting assistant must not choose the higher or lower figure as truth or infer impact from attendance alone.

## Proposed technical outputs

- Auditable workflow map, including human verification and approval points.
- Comparative intervention decision and rationale.
- Structured capability and governance self-assessment.
- Synthetic-data exercise that shows how to check discrepant indicators.
- Bilingual results summary and downloadable JSON output.
- Model version history and tests for key scoring and safety rules.

## Boundaries and next validation work

Before any public release or operational reuse: consult experienced nonprofit managers, data/governance leads and Arabic/English editors; test sample organisations; calibrate wording and thresholds; check the intended audience understands 'unknown' as an evidence gap; test assistive technologies and mobile/RTL layout; and document where model assumptions fail. **No external testing, user outcomes or institutional endorsement is implied by this draft.**