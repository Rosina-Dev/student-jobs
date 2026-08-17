#
## Town-first product architecture

The primary hierarchy is:

```
Platform -> Town -> Local jobs
```

The Cranford pilot is:

```
Platform -> Cranford, New Jersey -> Cranford-area jobs
```

Jobs belong to a local marketplace, not an individual school. Eligibility and discovery use age, town or ZIP code, travel radius, availability, transportation, and role requirements. School enrollment never determines which jobs a student can see.

This structure includes students at the local public high school, private and vocational schools, schools in another town, homeschool students, and students who live near Cranford.

## Platform-level landing page

The default entry page is geographically neutral. It explains within 10-15 seconds that the product offers:

- Real local part-time jobs specifically intended for high-school students
- Verified participating employers
- Work designed to fit around school
- Town or ZIP-code discovery

In the prototype, Cranford, NJ and ZIP code 07016 route to the Cranford local marketplace.

## One platform brand plus local town editions

The platform brand, typography, navigation, safety controls, data model, and user experience remain consistent. A town edition may change its town name, coverage radius, local jobs, local employment guidance, and original landmark-inspired illustration.

Cranford uses subtle references to the downtown clock, river, greenery, streetscape, and transit. Official seals and municipal branding are excluded unless a future authorized partnership explicitly permits them.

## School-specific entry pages

Schools are optional partnership and distribution channels, not separate marketplaces.

Conceptual routes:

- `/cranford` - the standard Cranford marketplace
- `/schools/cranford-high` - a Cranford High School partner entry page

Both routes use the same Cranford-area jobs. A school page may add partner copy or career-office resources, but it must not duplicate, isolate, or own the job inventory.

Recommended relationships:

- A `marketplace` has many `jobs`
- A `school` may reference a default marketplace
- A `school_entry_page` references one school and one marketplace
- Entry-page context affects presentation and attribution, not job eligibility

## Optional school profile field

Student registration requires age, home town or ZIP, availability, and travel range. School is optional.

Cranford prototype options:

- Cranford High School
- Union County Vocational-Technical Schools
- Private school
- Another school
- Homeschool
- Prefer not to say

School data must not restrict marketplace access. Any future school reporting requires appropriate privacy controls and minimum group-size protections.

## Data-model additions

- `marketplaces`: town, state, ZIP coverage, service radius, status, local visual configuration
- `schools`: name, type, location, verification status
- `school_entry_pages`: school_id, marketplace_id, slug, partner copy, status
- `jobs.marketplace_id`: the local marketplace that owns discovery for the role
- `student_profiles.school_id`: nullable and never an eligibility key

There is one shared jobs table. Town pages and school entry pages are filtered views over shared inventory, not separate databases.

## Preserved Cranford pilot decisions

- Student audience ages 16-18
- Approximately 10-20 working hours per week
- Employer verification and human safety review
- Heart/save-job functionality
- Fictional jobs labeled "Sample job - prototype only."
- School comes first
- Town-specific Cranford editorial illustration

 Cranford Connect — MVP product blueprint

Working name for a safety-first, hyperlocal job marketplace serving Cranford, New Jersey high-school students ages 16–18.

## Pilot objective

Validate that verified Cranford-area employers have legitimate part-time work for students and that students will discover and apply for those roles through a purpose-built experience.

Initial success targets:

- 50–100 registered students
- 15–25 verified employers
- 25–40 approved openings
- At least 40% of approved jobs receive a qualified application
- At least 10 successful hires during the pilot
- Zero unresolved high-severity safety reports

## Product policy

- Listings must offer 10–20 hours per week.
- Education and school attendance take priority.
- Employer identity and organization are verified before a listing is published.
- Every first listing receives human review.
- Exact student address, school schedule, personal phone, and date of birth are never public.
- Initial employer–student communication remains inside the platform.
- Private-residence and informal household gigs are excluded from the first pilot.
- The product guides users to New Jersey's official working-papers process; it does not issue or approve working papers.
- Legal compliance rules are a backstop, not a recommendation for maximum working hours.

## Users and permissions

### Student

- Create a private account and limited application profile.
- Enter age band, approximate location, availability, transportation radius, interests, and skills.
- View only age- and schedule-compatible roles.
- Save jobs and submit a short guided application without requiring a résumé.
- Message verified employers only after applying.
- Block or report an employer, listing, or message.

### Employer

- Identify a responsible hiring representative.
- Verify the organization and worksite.
- Submit postings with pay, duties, equipment, supervision, schedule, minimum age, and location.
- View applicants only for approved postings.
- Communicate through moderated platform messaging.
- Record interview and hiring outcomes.

### Administrator

- Review employer verification evidence.
- Approve, return, reject, pause, or archive listings.
- Review automated risk flags and user reports.
- Restrict accounts and preserve an audit trail.
- Monitor funnel, hiring, response-time, and safety metrics.

## Core journeys

### Student journey

1. Create account and confirm age eligibility.
2. Enter approximate location and weekly availability.
3. Browse matched local roles.
4. Review transparent pay, duties, schedule, and verification status.
5. Answer 3–5 role-specific questions and apply.
6. Track status: submitted, viewed, interview requested, offered, closed.
7. If hired while under 18, follow the link and checklist for New Jersey working papers.

### Employer journey

1. Create representative and organization accounts.
2. Submit business verification information.
3. Create a structured job posting.
4. Receive instant warnings for excessive hours, missing pay, late schedules, risky duties, or prohibited equipment.
5. Submit for administrator review.
6. Review matched applicants and communicate inside the platform.
7. Mark the result and provide the information needed for the student's working-papers application.

### Safety-review journey

1. System checks required fields and structured risk rules.
2. Administrator reviews employer identity, worksite, duties, schedule, supervision, and compensation.
3. Listing is approved, returned for changes, or rejected with a reason.
4. Material edits to duties, schedule, location, or equipment trigger re-review.
5. Reports can immediately hide a listing pending investigation.

## MVP screens

1. Public landing page
2. Student registration and private profile
3. Job discovery, search, and filters
4. Job detail and safety information
5. Guided application
6. Student application tracker
7. Employer registration and verification
8. Structured job-posting form
9. Employer applicants dashboard
10. In-platform conversation
11. Report/block flow
12. Administrator verification and moderation queue

## Required data entities

- `users`: authentication identity, role, account status
- `student_profiles`: age band, approximate location, travel radius, skills, availability
- `guardian_contacts`: optional or policy-required consent relationship; tightly restricted
- `employer_representatives`: identity and authorization status
- `organizations`: legal/display name, type, location, verification status
- `jobs`: duties, pay, hours, schedule, age, equipment, supervision, status
- `applications`: student, job, answers, status, timestamps
- `conversations` and `messages`: participants, content, safety flags
- `reports`: reporter, subject, category, severity, disposition
- `verification_records`: evidence type, reviewer, decision, expiration
- `audit_events`: actor, action, object, timestamp, relevant metadata

Sensitive student identity data should be separated from discovery and application-profile data, with stricter access and retention controls.

## Automated posting checks

- Reject weekly schedules below 10 or above 20 hours for the pilot.
- Flag shifts that overlap school hours or exceed platform policy.
- Require numeric compensation and prohibit unpaid trial shifts.
- Flag construction, demolition, driving, manufacturing hazards, dangerous machinery, alcohol-centered worksites, and other restricted duties for human review or rejection.
- Require an adult-supervision declaration.
- Detect requests for applicant photos, banking details, Social Security numbers, fees, off-platform contact, or work in a private residence.
- Re-review material posting edits.

These controls support screening but do not replace review by qualified legal and youth-safety professionals.

## Pilot operating model

Launch as a curated marketplace rather than open self-service. Recruit employers manually through Cranford business, municipal, school, library, recreation, and community networks. Verify and onboard each initial employer personally. Begin student enrollment only after a credible base of approved jobs is live.

The pilot should remain free. Revenue experiments should wait until supply, trust, and successful hiring are demonstrated.

## Not in the first release

- Payroll or tax processing
- Background-check adjudication
- Public student profiles
- Household gigs or private-home worksites
- Ratings of individual students
- Algorithmic applicant ranking
- Social feeds
- Native mobile apps
- Expansion beyond the initial geographic radius

## Decisions needed after prototype review

- Final brand name and domain
- Exact Cranford-area radius
- Whether 18-year-old students receive the same platform schedule limit
- Guardian notification or consent policy for 16- and 17-year-olds
- Employer-verification evidence and review owner
- Initial community partner and pilot operator
- Legal/privacy review before collecting real minor data
