# Organisational AI Readiness Self-Assessment — Scoring and Safeguards

**Version:** 0.1 (demonstration, unvalidated). **Use:** Exploratory organisational conversation, not certification, procurement approval or legal/privacy advice.

## Assessment dimensions and questions

Six equally presented dimensions, two questions each, with the following exact IDs in `app.js` and `model.js`:

| Dimension | Question IDs | Core concern |
| --- | --- | --- |
| Processes | process_documented, process_baseline | Documented current state and measurable baseline |
| Data | data_definitions, data_permissions | Source consistency and permitted input rules |
| People | people_skills, people_review | Critical AI literacy and verification ownership |
| Governance | governance_tool, governance_approval | Tool/data-term approval and human sign-off |
| Technology | technology_sources, technology_fit | Reliable authoritative sources and systems compatibility |
| Implementation | implementation_owner, implementation_evaluation | Ownership, resources, success criteria and stop rules |

## Answer meanings

- `0`: Not in place (0 evidenced points).
- `1`: Partly in place (1 evidenced point).
- `2`: In place and evidenced (2 evidenced points).
- `unknown`: Not sure (0 **verified** points **for conservative planning**, but counted separately as 'unknown'; not proof the capability is absent).

Each dimension has a maximum of 4 points, reported as **0–4** with a visual bar, not a single organisation-wide 'AI-ready' percentage. A dimension is labelled 'Evidenced' at 4/4 with no unknowns, 'Developing' at 2–3/4 with no unknowns and 'Needs evidence' otherwise. These bands are provisional communication labels; there has been no external psychometric or field validation.

All 12 questions need a recorded response (including 'unknown') before the profile is shown. This ensures visitors see explicitly what they do not know rather than accidentally treating skipped answers as readiness information.

## Hard gates override any points

All three must be answered **2 / in place and evidenced** for the output to say that a further *controlled pilot review* is a possible next step:

1. `data_permissions`: documented rules for permitted AI inputs.
2. `governance_tool`: approval by an authorised role for the tool and its data terms.
3. `governance_approval`: explicit human approval before AI-assisted reporting or consequential decisions.

Any `0`, `1`, or `unknown` on a gate produces **'synthetic-data testing only; do not proceed with live operational data'**. Passing all three gates **does not** authorise deployment: independent privacy, security, safeguarding, organisational authority and tool evaluations are still necessary.

## Suggested actions

The results provide a short practical action for every dimension scoring below 4/4 or containing an unknown. These are planning suggestions, not guaranteed recommendations or an AI procurement suitability verdict.

## Data and use restrictions

- No form field collects names, email addresses or free-text organisational details.
- No external analytics or APIs are called. Assessment answers live in JavaScript memory only until the visitor chooses to download a JSON file.
- The JSON report may contain sensitive information about organisational capabilities even without names. The visitor decides whether and where to store or share it.
- The tool makes no external submissions, contacts or profile changes.

## Validation backlog

This version should not be described as a validated 'AI readiness diagnostic' until tested. Proposed tests: inter-rater reliability, understandability across Arabic dialect and modern standard Arabic audiences, governance false-positive scenarios, clarity of unknown responses, disability/accessibility tests, data-security evaluation and sector-specific relevance. Thresholds and questions may need revision after evidence collection.