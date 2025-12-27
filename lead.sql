-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 27, 2025 at 07:20 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lead`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(500) DEFAULT NULL,
  `role` enum('admin','superadmin') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leadership_type`
--

CREATE TABLE `leadership_type` (
  `id` int(11) NOT NULL,
  `guna` varchar(4) DEFAULT NULL,
  ` pillar` varchar(3) DEFAULT NULL,
  `Profile_level` varchar(19) DEFAULT NULL,
  ` Insight` varchar(193) DEFAULT NULL,
  ` behaviors` varchar(187) DEFAULT NULL,
  ` risks` varchar(118) DEFAULT NULL,
  ` Focus` varchar(181) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `leadership_type`
--

INSERT INTO `leadership_type` (`id`, `guna`, ` pillar`, `Profile_level`, ` Insight`, ` behaviors`, ` risks`, ` Focus`) VALUES
(1, 'S ', ' L ', 'Strength', ' Purpose-driven leadership anchored in clarity. You naturally connect people, priorities, and ethics, making collective outcomes feel meaningful and well-governed. ', ' Aligns teams around a shared mission; consults stakeholders before major decisions; communicates principles clearly; makes fair trade-offs; sustains a long-term, collective orientation. ', ' Can become idealistic or overly consensus-driven; decision-making may slow in ambiguous or high-conflict situations. ', ' Time-box alignment conversations. Clearly define decision owner and decision deadline, and convert values into 2–3 measurable quarterly commitments so purpose translates into pace.'),
(2, 'S ', ' L ', 'Balanced', ' You value collective purpose and fairness, though the anchor may soften when operational pressures rise. Purpose is present, but not always activated as a daily leadership driver. ', ' Supports shared goals; maintains governance routines; encourages cooperation; balances stakeholder expectations. ', ' Purpose messaging can become generic; effort may spread across too many well-intended initiatives. ', ' Conduct a quarterly purpose reset. Identify the single most important collective outcome, pause low-impact activities, and communicate a clear priority narrative.'),
(3, 'S ', ' L ', 'Development', ' Intent toward collective good exists, but leadership operates more from task execution than mission alignment. Purpose is understood conceptually but inconsistently applied. ', ' Follows process; completes assigned responsibilities; supports team needs when asked; maintains stability over inspiration. ', ' Teams may experience leadership as operational rather than meaningful; engagement and ownership remain moderate. ', ' Build purpose habits. Begin key meetings with a short “why,” link decisions to stakeholder impact, and track one visible collective metric.'),
(4, 'S ', ' L ', 'Risk / Blind Spot', ' Collective purpose is weak or unclear. Leadership focus remains narrow, compliance-driven, or inward-looking, limiting shared meaning. ', ' Works in silos; prioritizes immediate deliverables; avoids broader stakeholder engagement; minimal narrative-setting. ', ' Trust erosion; disengagement; short-term thinking; reduced sense of belonging and responsibility. ', ' Rebuild trust through transparency. Define two non-negotiable principles, listen to stakeholders, and execute small visible actions that demonstrate service to the collective.'),
(5, 'S ', ' E ', 'Strength', ' Your leadership reflects calm clarity under pressure. You respond to challenges with balance, emotional maturity, and thoughtful restraint, creating psychological safety and trust. ', ' Remains composed in high-pressure situations; listens before responding; de-escalates conflict; makes reasoned decisions; recovers quickly from setbacks. ', ' Calmness may be misread as hesitation; excessive reflection can delay timely intervention when urgency is required. ', ' Define clear escalation triggers and decision timelines. Practice assertive responses in advance so calmness is paired with decisive action when stakes are high.'),
(6, 'S ', ' E ', 'Balanced', ' You generally maintain emotional balance, though external pressure can occasionally slow response or dilute clarity. Equanimity is present but not yet fully reliable in prolonged stress. ', ' Stays composed most of the time; avoids emotional extremes; seeks fairness in reactions; reflects before acting. ', ' May postpone difficult conversations; emotional neutrality can slip into passivity during fast-moving situations. ', ' Time-box reflection. Introduce “respond by” rules for key decisions and rehearse direct yet calm communication for critical moments.'),
(7, 'S ', ' E ', 'Development', ' Emotional balance fluctuates with context. While you value calm responses, stress can influence tone, timing, or confidence in action. ', ' Alternates between composure and reactivity; avoids confrontation; relies on external reassurance in pressure situations. ', ' Inconsistent leadership presence; unresolved tensions; erosion of confidence during crises. ', ' Build emotional discipline routines: pause–breathe–respond practice, pre-mortems before stressful events, and post-incident reflection to stabilize reactions.'),
(8, 'S ', ' E ', 'Risk / Blind Spot', ' Emotional steadiness is fragile under pressure. Stress disrupts clarity, leading to withdrawal, overthinking, or delayed responses. ', ' Avoids difficult conversations; becomes inward or indecisive; inconsistent emotional signals to the team. ', ' Loss of authority; confusion among stakeholders; increased anxiety in teams. ', ' Establish support structures: regular mentor check-ins, simplified decision rules, and a clear escalation ladder to restore confidence and consistency.'),
(9, 'S ', ' A ', 'Strength', ' Your leadership is guided by wise association. You actively seek principled counsel and build high-quality relationships that elevate judgment and learning. ', ' Chooses mentors thoughtfully; listens deeply to diverse perspectives; values ethical guidance; integrates feedback into decisions; learns continuously. ', ' May remain within a comfort circle of like-minded advisors; exposure to strong dissenting views may be limited. ', ' Intentionally invite constructive dissent. Add at least one external or contrarian voice to your advisory circle and periodically audit the diversity of inputs shaping decisions.'),
(10, 'S ', ' A ', 'Balanced', ' You are open to guidance and collaboration, though filtering and prioritizing inputs is still evolving. Association supports you, but does not always sharpen decisions. ', ' Seeks advice when needed; collaborates willingly; values relationships; shows receptivity to feedback. ', ' Information overload; difficulty distinguishing signal from noise; reliance on familiar voices. ', ' Define a trusted mentor panel and decision-filter criteria. Limit advisory inputs for critical decisions and document why specific guidance is accepted or declined.'),
(11, 'S ', ' A ', 'Development', ' You value learning from others but lack a structured approach to association. Guidance is taken inconsistently, often influenced by availability rather than relevance. ', ' Consults sporadically; follows opinions of convenience; inconsistent boundaries with advisors. ', ' Susceptibility to poor advice; confusion in direction; weakened decision confidence. ', ' Establish a structured association discipline: identify 2–3 core mentors, apply a two-source validation rule, and reflect monthly on learning gained from guidance.'),
(12, 'S ', ' A ', 'Risk / Blind Spot', ' Association is either weak or misaligned. Leadership decisions are shaped by isolation or by unexamined external influence. ', ' Avoids seeking counsel or follows guidance blindly; limited reflection on advisor intent or quality. ', ' Strategic blind spots; manipulation risk; erosion of credibility and trust. ', ' Rebuild association deliberately. Seek principled mentors, create regular reflection routines, and anchor guidance selection to clearly articulated values.'),
(13, 'S ', ' D ', 'Strength', ' Your leadership is rooted in integrity and principled judgment. Decisions are guided by fairness, ethics, and a clear sense of right action, even under pressure. ', ' Makes transparent decisions; upholds ethical standards; applies rules with wisdom; takes responsibility for consequences; earns trust through consistency. ', ' May slow down in grey areas due to over-analysis; discomfort with unpopular but necessary decisions. ', ' Create a principles playbook for recurring dilemmas. Define decision SLAs for grey zones and practice making firm calls while documenting ethical rationale.'),
(14, 'S ', ' D ', 'Balanced', ' You generally act with integrity and fairness, though ethical clarity can waver in complex or ambiguous situations. ', ' Follows rules; seeks fairness; escalates when unsure; prefers consensus on ethical matters. ', ' Inconsistent handling of edge cases; delayed decisions may frustrate stakeholders. ', ' Clarify non-negotiables and escalation rules. Use post-decision reviews to strengthen confidence in ethical judgment.'),
(15, 'S ', ' D ', 'Development', ' You value ethical conduct, but application is inconsistent when trade-offs or pressure arise. ', ' Relies on formal rules; avoids conflict; hesitates to own difficult moral decisions. ', ' Perceived moral passivity; loss of authority in critical moments. ', ' Translate values into explicit behaviors. Practice scenario-based ethical decisions and assign personal accountability for outcomes.'),
(16, 'S ', ' D ', 'Risk / Blind Spot', ' Ethical judgment lacks clarity or courage. Decisions may be driven by avoidance, compliance pressure, or situational convenience. ', ' Defers responsibility; follows authority without question; avoids moral ownership. ', ' Trust erosion; reputational and compliance risk; weakened moral culture. ', ' Establish immediate ethical guardrails. Introduce accountability mechanisms, mentoring, and consequences to restore integrity-driven leadership.'),
(17, 'R ', ' L ', 'Strength', ' Your leadership channels strong drive toward collective outcomes. You mobilize people, resources, and urgency to achieve visible results for the group. ', ' Sets ambitious targets; rallies teams with energy; pushes execution; prioritizes outcomes; creates momentum around shared goals. ', ' Pace can overwhelm people; purpose may become secondary to targets; risk of burnout or stakeholder fatigue. ', ' Align ambition with purpose. Clarify the “why” behind goals, introduce pace controls, and delegate ownership to sustain collective energy.'),
(18, 'R ', ' L ', 'Balanced', ' You are results-focused with an emerging sense of collective purpose. Momentum is strong, though alignment may fluctuate under pressure. ', ' Drives delivery; coordinates action; responds quickly to demands; balances speed with basic stakeholder awareness. ', ' Short-term wins may overshadow long-term purpose; uneven engagement across teams. ', ' Conduct quarterly “purpose checkpoints.” Reconnect goals to stakeholder impact and simplify priorities to maintain coherence.'),
(19, 'R ', ' L ', 'Development', ' Activity levels are high, but collective direction is inconsistent. Effort is visible, yet purpose lacks clarity or continuity. ', ' Firefighting execution; frequent task switching; urgency-driven decisions. ', ' Wasted energy; confusion about priorities; reduced trust in leadership direction. ', ' Limit focus to 2–3 core outcomes. Establish weekly prioritization reviews and explicitly stop low-impact activities.'),
(20, 'R ', ' L ', 'Risk / Blind Spot', ' Drive dominates without a collective anchor. Leadership becomes command-driven, prioritizing wins over shared meaning. ', ' Pushes aggressively; dismisses dissent; emphasizes metrics over people. ', ' Trust erosion; political behavior; ethical drift; high attrition risk. ', ' Re-anchor leadership to values. Increase stakeholder listening, restore transparency, and enforce guardrails that protect collective well-being.'),
(21, 'R ', ' E ', 'Strength', ' You bring high energy with workable emotional control. Intensity fuels action, while awareness allows you to recover quickly and keep moving forward. ', ' Acts decisively; maintains momentum under pressure; channels stress into execution; rebounds fast after setbacks. ', ' Overdrive can accumulate fatigue; impatience may surface in prolonged stress. ', ' Build recovery rituals into execution cycles. Use short pauses, clear escalation rules, and workload boundaries to sustain performance without burnout.'),
(22, 'R ', ' E ', 'Balanced', ' Energy is strong, but emotional regulation varies with context. You perform well under pressure, though reactions can sharpen in conflict. ', ' Responds quickly; shows competitive edge; adapts after feedback; alternates between control and urgency. ', ' Reactivity during disagreement; tone may strain relationships. ', ' Map personal triggers and rehearse pause–respond routines. Use conflict scripts to keep speed without emotional spillover.'),
(23, 'R ', ' E ', 'Development', ' Pressure often drives impulsive responses. Emotional intensity influences timing, tone, and judgment. ', ' Quick judgments; sharp communication; acts before full reflection. ', ' Friction, regret decisions, and team fatigue. ', ' Introduce mandatory cooling periods for high-stakes calls. Pair fast action with rapid review and feedback loops.'),
(24, 'R ', ' E ', 'Risk / Blind Spot', ' Emotional spikes dominate leadership behavior. Stress triggers volatility or loss of control. ', ' Explosive reactions; inconsistent signals; difficulty listening under pressure. ', ' Fear-based culture; attrition risk; decision errors. ', ' Implement strict escalation protocols, coaching support, and emotional regulation training to stabilize leadership presence.'),
(25, 'R ', ' A ', 'Strength', ' Your leadership leverages influence and networks to mobilize action. You build alliances quickly and use relationships to unlock momentum and resources. ', ' Builds broad networks; persuades stakeholders; negotiates effectively; mobilizes support for initiatives; connects people to action. ', ' Risk of groupthink or political bias; speed may outpace ethical or factual checks. ', ' Add objective data checkpoints and a formal dissent channel. Apply an ethics filter before major influence-driven decisions.'),
(26, 'R ', ' A ', 'Balanced', ' You maintain functional alliances with growing influence. Relationships support execution, though depth and trust vary by context. ', ' Collaborates widely; engages stakeholders as needed; balances persuasion with delivery. ', ' Relationships can become transactional; trust may be uneven. ', ' Invest in 2–3 deep, long-term mentor or partner relationships. Practice serve-first behaviors to strengthen credibility.'),
(27, 'R ', ' A ', 'Development', ' Networks are used mainly for short-term wins rather than learning or trust-building. Association is opportunistic. ', ' Seeks leverage when needed; transactional collaboration; limited follow-through in relationships. ', ' Reputation risk; shallow trust; reduced long-term support. ', ' Define relationship OKRs. Commit to reciprocity, consistent follow-up, and listening discipline to convert contacts into partners.'),
(28, 'R ', ' A ', 'Risk / Blind Spot', ' Influence becomes manipulative or avoidance-based. Association is driven by politics or isolation rather than principled connection. ', ' Gamesmanship; selective engagement; avoidance of accountability. ', ' Toxic dynamics; loss of credibility; erosion of support. ', ' Reset relationship strategy with transparency and boundaries. Rebuild trust through values-based networking and clear intent.'),
(29, 'R ', ' D ', 'Strength', ' Your leadership combines decisive action with a working moral compass. You take ownership of outcomes and are willing to make tough calls while keeping ethical intent in view. ', ' Acts decisively; owns results; sets clear accountability; enforces standards; moves issues to closure. ', ' Speed can pressure ethical reflection; temptation to justify shortcuts in pursuit of results. ', ' Pre-commit to a clear “red-line” list. Use decision checklists and post-decision reviews to ensure speed remains aligned with values.'),
(30, 'R ', ' D ', 'Balanced', ' You generally act fairly, but ethical clarity can fluctuate under pressure. Pragmatism sometimes overrides deeper moral reflection. ', ' Applies rules; balances results with compliance; escalates selectively. ', ' Edge-case compromises; inconsistent signals on values. ', ' Strengthen accountability with a decision partner. Introduce explicit escalation rules for grey zones and document ethical rationale.'),
(31, 'R ', ' D ', 'Development', ' Results orientation frequently dominates ethical judgment. Principles are understood but inconsistently applied in high-stakes situations. ', ' Pushes delivery; rationalizes exceptions; avoids prolonged ethical debate. ', ' Trust erosion; compliance exposure; weakened moral culture. ', ' Reinforce ethical discipline through scenario practice. Define non-negotiables and link incentives to value-aligned behavior.'),
(32, 'R ', ' D ', 'Risk / Blind Spot', ' Ethical judgment is subordinate to outcomes. Leadership may drift toward “ends justify means” reasoning. ', ' Bypasses controls; dismisses concerns; normalizes rule-bending. ', ' Serious compliance, legal, and reputational risk. ', ' Implement immediate guardrails and oversight. Pause authority where needed, initiate corrective action, and rebuild integrity through transparent accountability.'),
(33, 'T ', ' L ', 'Strength', ' Your leadership provides stability and structural reliability for the collective. You ensure continuity, order, and dependability, especially during periods of uncertainty. ', ' Maintains systems and routines; ensures compliance; provides predictable execution; supports long-term continuity. ', ' Excessive caution can slow adaptation; stability may turn into resistance to change. ', ' Introduce small, visible improvements each quarter. Track progress publicly so stability gradually converts into purposeful momentum.'),
(34, 'T ', ' L ', 'Balanced', ' You offer a dependable baseline for collective functioning, though purpose may feel passive rather than inspiring. ', ' Keeps operations running; follows established processes; supports team requests. ', ' Purpose can drift; teams may feel maintained but not energized. ', ' Sharpen one clear collective priority. Communicate why it matters and link routine work to that shared outcome.'),
(35, 'T ', ' L ', 'Development', ' Leadership emphasizes maintenance over mission. Collective purpose exists in theory but is weakly activated in practice. ', ' Preserves status quo; avoids disruption; focuses on task completion. ', ' Inertia; low engagement; gradual erosion of shared ownership. ', ' Define a clear role in the larger mission. Commit to one action per week that visibly serves collective goals.'),
(36, 'T ', ' L ', 'Risk / Blind Spot', ' Detachment from collective purpose limits leadership impact. Focus remains narrow, inward, or compliance-driven. ', ' Works in silos; avoids initiative; disengages from broader stakeholder needs. ', ' Stagnation; trust loss; declining relevance of leadership. ', ' Reset ownership through stakeholder listening. Establish accountability milestones and visible service-oriented actions to restore collective trust.'),
(37, 'T ', ' E ', 'Strength', ' You bring calm endurance and emotional steadiness, especially in prolonged or uncertain situations. Your presence reduces noise and helps teams remain grounded. ', ' Maintains composure; avoids emotional extremes; provides steady presence; remains patient under pressure. ', ' Calmness can mask inertia; urgency may be under-communicated. ', ' Define clear action triggers and escalation cues. Pair calm presence with pre-agreed response timelines to convert steadiness into timely action.'),
(38, 'T ', ' E ', 'Balanced', ' Emotional stability is generally present, though it may slip into disengagement when pressure rises. ', ' Responds evenly; avoids drama; maintains emotional distance. ', ' Delayed responses; missed inflection points. ', ' Introduce “act-by” commitments for key decisions. Use short check-ins to re-engage energy without increasing stress.'),
(39, 'T ', ' E ', 'Development', ' Low emotional activation reduces responsiveness. You tend to under-react rather than over-react in challenging situations. ', ' Avoids confrontation; postpones responses; stays inward during stress. ', ' Issues linger unresolved; teams perceive passivity. ', ' Practice assertive response scripts and rehearse escalation paths to ensure timely intervention when needed.'),
(40, 'T ', ' E ', 'Risk / Blind Spot', ' Emotional withdrawal dominates under pressure. Stress leads to shutdown rather than engagement. ', ' Freezes or withdraws; avoids responsibility; sends inconsistent signals. ', ' Team confusion; unmanaged risk; erosion of confidence. ', ' Establish a safety net: clear role clarity, external accountability, and coaching support to restore engagement and responsiveness.'),
(41, 'T ', ' A ', 'Strength', ' Your leadership demonstrates loyalty and consistency in relationships. You build trust through reliability and long-term presence, offering a stable relational anchor. ', ' Maintains dependable relationships; honors commitments; supports close collaborators; values continuity. ', ' Network may become insular; limited exposure to new ideas or challenge. ', ' Intentionally broaden association. Add one outside perspective each quarter and rotate mentors to introduce fresh thinking without losing trust.'),
(42, 'T ', ' A ', 'Balanced', ' Relationships are stable but passive. Association supports routine functioning more than learning or growth. ', ' Collaborates when needed; maintains cordial ties; relies on familiar contacts. ', ' Missed opportunities; slow adaptation to change. ', ' Set a monthly outreach goal. Proactively engage one new or underutilized relationship to expand perspective.'),
(43, 'T ', ' A ', 'Development', ' Association is limited or underutilized. Guidance is sought infrequently, often only when issues escalate. ', ' Avoids seeking counsel; stays within comfort circle; minimal feedback loops. ', ' Blind spots persist; decisions lack external validation. ', ' Establish a structured mentor panel. Schedule regular check-ins and document learning from each interaction.'),
(44, 'T ', ' A ', 'Risk / Blind Spot', ' Isolation or echo-chamber dynamics dominate. Leadership decisions are shaped by withdrawal or unexamined influence. ', ' Avoids guidance or follows a single dominant voice; minimal reflection on advice quality. ', ' Strategic drift; manipulation risk; erosion of credibility. ', ' Rebuild association deliberately. Create a diverse advisory set, apply a two-source rule for decisions, and anchor guidance to core values.'),
(45, 'T ', ' D ', 'Strength', ' Your leadership reflects cautious integrity. You respect rules, boundaries, and ethical constraints, providing stability and predictability in judgment. ', ' Follows established norms; respects authority and procedures; avoids unethical shortcuts; ensures compliance. ', ' Excessive rigidity; fear of judgment can slow decisions and discourage initiative. ', ' Pair integrity with flexibility. Use scenario-based practice to build confidence in making timely ethical decisions beyond strict rule-following.'),
(46, 'T ', ' D ', 'Balanced', ' Ethical intent is present, but judgment relies heavily on external rules rather than internal conviction. ', ' Seeks approvals; follows SOPs; escalates frequently for guidance. ', ' Slow decisions; over-dependence on authority; reduced ownership. ', ' Clarify decision rights and ethical boundaries. Define when independent judgment is expected and supported.'),
(47, 'T ', ' D ', 'Development', ' Ethical behavior depends largely on controls and oversight. Moral ownership is limited in ambiguous situations. ', ' Waits for direction; avoids responsibility; applies rules mechanically. ', ' Weak moral leadership; teams lack ethical role-modeling. ', ' Build moral agency through mentoring and reflection. Assign small ownership zones with clear accountability.'),
(48, 'T ', ' D ', 'Risk / Blind Spot', ' Conformity or withdrawal overrides ethical leadership. Under pressure, values are sidelined rather than defended. ', ' Defers excessively; disengages from ethical dilemmas; avoids moral stance. ', ' High compliance and reputational risk; erosion of ethical culture. ', ' Install strong guardrails and oversight immediately. Reset expectations, reinforce accountability, and provide ethics-focused coaching.'),
(49, 'SR ', ' L ', 'Strength', ' You combine clarity of purpose with strong execution. Ethical intent is translated into visible collective outcomes with speed and precision. ', ' Aligns mission with targets; mobilizes teams; balances values and results; sustains momentum for shared goals. ', ' Overcommitment; pace may strain people or systems. ', ' Ruthlessly prioritize. Protect reflection time and delegate ownership to sustain purpose without burnout.'),
(50, 'SR ', ' L ', 'Balanced', ' Purpose and action are generally aligned, though clarity can soften under pressure. Delivery remains strong but focus may diffuse. ', ' Coordinates stakeholders; executes well; responds to urgency. ', ' Drift toward activity without sharp purpose. ', ' Quarterly purpose reset. Define one non-negotiable collective outcome and align execution tightly to it.'),
(51, 'SR ', ' L ', 'Development', ' Intent is strong, but execution lacks consistency. Purpose is clear, yet follow-through varies. ', ' Initiates initiatives; uneven closure; fluctuating momentum. ', ' Fragmentation; credibility erosion. ', ' Time-box initiatives into 90-day plans with weekly cadence and clear owners.'),
(52, 'SR ', ' L ', 'Risk / Blind Spot', ' Action dominates without sufficient ethical anchoring. Momentum risks overriding collective meaning. ', ' Pushes delivery aggressively; deprioritizes stakeholder voice. ', ' Misalignment; trust erosion; ethical drift. ', ' Re-anchor to values. Introduce stakeholder checks and pause low-integrity actions immediately.'),
(53, 'SR ', ' E ', 'Strength', ' You sustain high energy while remaining emotionally composed. Pressure sharpens performance rather than destabilizing it. ', ' Acts decisively; self-regulates; recovers quickly; maintains presence under stress. ', ' Accumulated fatigue; subtle impatience. ', ' Build recovery rituals and escalation rules to preserve long-term resilience.'),
(54, 'SR ', ' E ', 'Balanced', ' Energy and composure are generally balanced, though reactions can sharpen in prolonged stress. ', ' Responds fast; reflects after action; adapts. ', ' Emotional spillover in conflict. ', ' Map triggers and rehearse pause–respond routines for high-stakes moments.'),
(55, 'SR ', ' E ', 'Development', ' Intensity occasionally overwhelms balance. Emotional tone varies with pressure. ', ' Rushes decisions; fluctuating composure. ', ' Friction; team fatigue. ', ' Introduce cooling periods for major decisions and rapid post-action reviews.'),
(56, 'SR ', ' E ', 'Risk / Blind Spot', ' High drive overwhelms emotional regulation. Stress triggers volatility. ', ' Reactive responses; inconsistent signals. ', ' Burnout; attrition; loss of trust. ', ' Reset cadence, enforce escalation protocols, and engage coaching support.'),
(57, 'SR ', ' A ', 'Strength', ' You influence with discernment. Relationships are leveraged for execution while maintaining ethical filters. ', ' Builds alliances; listens selectively; integrates feedback into action. ', ' Groupthink risk; limited dissent. ', ' Add a formal dissent seat and data validation checkpoints.'),
(58, 'SR ', ' A ', 'Balanced', ' Networks support action, though filtering guidance is still maturing. ', ' Collaborates widely; engages advisors as needed. ', ' Advice overload; inconsistent trust depth. ', ' Define a trusted mentor panel and decision-filter criteria.'),
(59, 'SR ', ' A ', 'Development', ' Association supports momentum more than learning. Relationships are transactional. ', ' Seeks leverage; limited reciprocity. ', ' Reputation risk; shallow trust. ', ' Invest in long-term relationships and serve-first behaviors.'),
(60, 'SR ', ' A ', 'Risk / Blind Spot', ' Political or opportunistic association dominates. Influence lacks principled grounding. ', ' Selective engagement; avoidance of accountability. ', ' Toxic dynamics; credibility loss. ', ' Reset relationship strategy around transparency, intent, and values.'),
(61, 'SR ', ' D ', 'Strength', ' You make decisive, values-aligned judgments. Speed and integrity reinforce each other. ', ' Owns outcomes; applies principles; closes decisions firmly. ', ' Hesitation in rare grey zones. ', ' Maintain a principles playbook and clear decision SLAs.'),
(62, 'SR ', ' D ', 'Balanced', ' Judgment is mostly fair, though pressure can introduce inconsistency. ', ' Pragmatic ethics; selective escalation. ', ' Minor ethical drift at edges. ', ' Use accountability partners and post-decision ethical reviews.'),
(63, 'SR ', ' D ', 'Development', ' Principles are understood but unevenly applied under urgency. ', ' Occasional rule-bending; rationalized exceptions. ', ' Trust erosion; compliance exposure. ', ' Define red-line rules and practice scenario-based ethical decisions.'),
(64, 'SR ', ' D ', 'Risk / Blind Spot', ' Results override integrity. Ethical discipline weakens under pressure. ', ' Ends-justify-means reasoning. ', ' Serious compliance and reputational risk. ', ' Immediate guardrails, oversight, and corrective leadership intervention.'),
(65, 'ST ', ' L ', 'Strength', ' You combine moral clarity with steady stability. Purpose is grounded in values and sustained through dependable structures, creating reassurance during uncertainty. ', ' Upholds purpose; maintains routines; communicates principles; ensures continuity. ', ' Slow activation of change; overreliance on structure. ', ' Introduce small, visible wins each quarter and publish progress to convert steadiness into momentum.'),
(66, 'ST ', ' L ', 'Balanced', ' Purpose is sincere but passive. Stability dominates while inspiration and pace fluctuate with context. ', ' Keeps systems running; supports collective goals; avoids disruption. ', ' Drift; low energy around mission. ', ' Sharpen one priority and link routines to a clear stakeholder outcome; communicate the “why” consistently.'),
(67, 'ST ', ' L ', 'Development', ' Values are respected, but purpose is weakly activated. Leadership maintains more than mobilizes. ', ' Preserves status quo; focuses on tasks; avoids visibility. ', ' Inertia; declining engagement. ', ' Define a clear role in the mission and commit to one weekly action that visibly serves the collective.'),
(68, 'ST ', ' L ', 'Risk / Blind Spot', ' Withdrawal from collective purpose limits leadership impact. Values exist, but ownership is minimal. ', ' Siloed work; compliance focus; avoids initiative. ', ' Stagnation; trust erosion. ', ' Reset ownership via stakeholder listening, accountability milestones, and visible service actions.'),
(69, 'ST ', ' E ', 'Strength', ' Calm endurance with ethical restraint. You provide emotional stability without drama, helping teams feel safe and grounded. ', ' Patient responses; steady presence; avoids escalation. ', ' Calm can mask delay; urgency under-communicated. ', ' Define action triggers and escalation cues to pair calm with timely response.'),
(70, 'ST ', ' E ', 'Balanced', ' Generally composed, though engagement dips under sustained pressure. ', ' Even temperament; avoids conflict. ', ' Delayed intervention; missed inflection points. ', ' Use “act-by” commitments and brief check-ins to re-energize response.'),
(71, 'ST ', ' E ', 'Development', ' Low emotional activation reduces responsiveness. You under-react in challenging moments. ', ' Avoids confrontation; postpones decisions. ', ' Issues linger; perception of passivity. ', ' Practice assertive scripts and rehearse escalation paths for timely action.'),
(72, 'ST ', ' E ', 'Risk / Blind Spot', ' Stress leads to withdrawal rather than engagement. ', ' Freezes or disengages; inconsistent signals. ', ' Team confusion; unmanaged risk. ', ' Establish role clarity, external accountability, and coaching support to restore engagement.'),
(73, 'ST ', ' A ', 'Strength', ' Loyal, principled relationships with careful discernment. Trust is built through consistency and values. ', ' Maintains dependable ties; chooses advisors carefully. ', ' Insularity; limited exposure to dissent. ', ' Add outside-in perspectives quarterly and rotate mentors to refresh learning.'),
(74, 'ST ', ' A ', 'Balanced', ' Stable associations support routine work more than growth. ', ' Collaborates when needed; relies on familiar contacts. ', ' Missed opportunities; slow adaptation. ', ' Set a monthly outreach goal to engage one new or underused relationship.'),
(75, 'ST ', ' A ', 'Development', ' Association is limited and under-activated. Guidance is sought infrequently. ', ' Stays within comfort circle; minimal feedback loops. ', ' Blind spots persist. ', ' Create a structured mentor panel and document learning from each interaction.'),
(76, 'ST ', ' A ', 'Risk / Blind Spot', ' Isolation or echo chambers dominate. ', ' Avoids guidance or follows a single voice. ', ' Strategic drift; manipulation risk. ', ' Rebuild association with diverse advisors and apply a two-source validation rule.'),
(77, 'ST ', ' D ', 'Strength', ' Principled caution guides judgment. Integrity is preserved through careful, rule-aware decisions. ', ' Follows norms; respects boundaries; avoids shortcuts. ', ' Rigidity; slow decisions in grey zones. ', ' Use scenario practice to build confidence in timely, values-aligned calls.'),
(78, 'ST ', ' D ', 'Balanced', ' Ethical intent is present, but reliance on rules limits decisiveness. ', ' Seeks approvals; escalates often. ', ' Reduced ownership; slow closure. ', ' Clarify decision rights and when independent judgment is expected.'),
(79, 'ST ', ' D ', 'Development', ' Integrity depends on external controls. Moral ownership is limited. ', ' Waits for direction; avoids responsibility. ', ' Weak moral leadership. ', ' Build moral agency with mentoring and small ownership zones.'),
(80, 'ST ', ' D ', 'Risk / Blind Spot', ' Conformity or withdrawal overrides ethical leadership under pressure. ', ' Defers excessively; disengages from dilemmas. ', ' High compliance and reputational risk. ', ' Install strong guardrails, oversight, and ethics-focused coaching immediately.'),
(81, 'RT ', ' L ', 'Strength', ' You combine forceful execution with endurance. Leadership pushes through resistance and sustains effort, delivering results even in difficult environments. ', ' Drives targets relentlessly; enforces structure; persists under pressure; maintains control during turbulence. ', ' Rigidity; burnout risk; people feel pushed rather than inspired. ', ' Recalibrate pace and purpose. Introduce stakeholder listening, pace controls, and delegation to convert force into sustainable collective momentum.'),
(82, 'RT ', ' L ', 'Balanced', ' Strong effort and stability support delivery, though the collective purpose link can weaken under pressure. ', ' Executes consistently; holds teams accountable; maintains operational order. ', ' Short-termism; friction with stakeholders; uneven engagement. ', ' Quarterly “why” reset. Simplify priorities and reconnect execution to stakeholder impact.'),
(83, 'RT ', ' L ', 'Development', ' Heavy effort without clear collective alignment. Energy is expended, but direction feels reactive. ', ' Firefighting; stubborn execution; resists course correction. ', ' Wasted energy; confusion; declining trust. ', ' Limit focus to 2–3 priorities. Establish weekly reviews and explicitly stop low-value work.'),
(84, 'RT ', ' L ', 'Risk / Blind Spot', ' Force dominates without collective conscience. Leadership becomes command-and-control. ', ' Pushes aggressively; dismisses dissent; prioritizes output over people. ', ' Toxic culture; trust erosion; ethical drift. ', ' Reinstate values guardrails, transparency, and corrective leadership intervention immediately.'),
(85, 'RT ', ' E ', 'Strength', ' You endure pressure with thick skin and persistence. Emotional resilience supports sustained execution. ', ' Absorbs stress; keeps moving; tolerates adversity; maintains operational focus. ', ' Suppressed emotions; delayed recognition of fatigue. ', ' Build recovery rituals and reflection windows to prevent silent burnout.'),
(86, 'RT ', ' E ', 'Balanced', ' Generally steady, though pressure can trigger harshness or withdrawal. ', ' Responds firmly; recovers after stress; maintains control. ', ' Friction in conflict; fatigue accumulation. ', ' Map triggers and use pause-respond routines. Add coaching check-ins during peak pressure.'),
(87, 'RT ', ' E ', 'Development', ' Stress leads to sharp reactions or disengagement. Emotional regulation is inconsistent. ', ' Reactive tone; abrupt decisions; withdrawal at times. ', ' Team fear; decision errors; morale drop. ', ' Introduce cooling routines, conflict scripts, and support structures.'),
(88, 'RT ', ' E ', 'Risk / Blind Spot', ' High volatility or shutdown under pressure. Emotional extremes dominate leadership behavior. ', ' Explosive responses or complete disengagement. ', ' High attrition; unmanaged risks; breakdown of trust. ', ' Enforce strict escalation protocols, reduce load, and engage intensive coaching support.'),
(89, 'RT ', ' A ', 'Strength', ' Strong networks are used to mobilize execution. Relationships help push initiatives forward. ', ' Leverages influence; coordinates power centers; mobilizes quickly. ', ' Political bias; favoritism; ethics dilution. ', ' Add objective data checks, dissent channels, and ethics filters before influence-driven decisions.'),
(90, 'RT ', ' A ', 'Balanced', ' Functional alliances support work, but depth of trust varies. ', ' Transactional collaboration; selective engagement. ', ' Reputation risk; inconsistent support. ', ' Invest in trust-building and serve-first behaviors to deepen alliances.'),
(91, 'RT ', ' A ', 'Development', ' Networking is opportunistic and leverage-driven. Learning and reciprocity are limited. ', ' Uses contacts tactically; minimal follow-through. ', ' Low loyalty; weak long-term support. ', ' Set relationship OKRs focused on reciprocity and consistent follow-up.'),
(92, 'RT ', ' A ', 'Risk / Blind Spot', ' Manipulation or isolation shapes association. Influence lacks principled grounding. ', ' Gamesmanship; avoidance of accountability. ', ' Toxic dynamics; loss of credibility. ', ' Reset relationship strategy with transparency, boundaries, and values-based engagement.'),
(93, 'RT ', ' D ', 'Strength', ' Decisive judgment with guardrails. You take ownership and close issues while respecting basic ethical limits. ', ' Makes firm calls; enforces standards; accepts responsibility. ', ' Shortcut temptation under urgency. ', ' Define a clear red-line list and use decision checklists with post-decision reviews.'),
(94, 'RT ', ' D ', 'Balanced', ' Ethical intent is present, but pressure can tilt judgment. ', ' Pragmatic decisions; selective escalation. ', ' Edge-case ethical drift. ', ' Use accountability partners and explicit escalation for grey zones.'),
(95, 'RT ', ' D ', 'Development', ' Principles are inconsistently applied when speed and pressure rise. ', ' Rule-bending; rationalized exceptions. ', ' Trust erosion; compliance exposure. ', ' Scenario-based ethics training and tighter controls with coaching.'),
(96, 'RT ', ' D ', 'Risk / Blind Spot', ' Results override integrity. “Ends justify means” thinking emerges. ', ' Bypasses controls; dismisses concerns. ', ' Severe legal, compliance, and reputational risk. ', ' Immediate oversight, corrective action, and leadership reset with clear consequences.'),
(97, 'SRT ', ' L ', 'Strength', ' You demonstrate rare equilibrium between clarity, action, and stability. Purpose is understood, acted upon, and sustained with consistency, making collective outcomes reliable and meaningful. ', ' Aligns mission with execution; adapts pace to context; balances stakeholder needs; sustains long-term initiatives. ', ' Comfort with balance may reduce urgency for breakthrough change. ', ' Use balance as a launchpad. Set stretch goals each quarter and assign a bold owner to one initiative that challenges the status quo.'),
(98, 'SRT ', ' L ', 'Balanced', ' Purpose and delivery are generally aligned, though energy and clarity fluctuate with context. Collective outcomes are steady but not distinctive. ', ' Coordinates work well; maintains routines; responds appropriately to change. ', ' Drift toward “good enough”; missed opportunities for leadership impact. ', ' Periodically disrupt comfort. Reassess assumptions and elevate one priority that requires decisive leadership.'),
(99, 'SRT ', ' L ', 'Development', ' Balance exists, but it is fragile. Leadership shifts reactively between clarity, action, and restraint. ', ' Alternates between planning and execution; uneven follow-through. ', ' Inconsistency; diluted purpose signal. ', ' Introduce a simple cadence: one purpose goal, one execution metric, one stability check per cycle.'),
(100, 'SRT ', ' L ', 'Risk / Blind Spot', ' Balance collapses under pressure. Competing forces pull leadership into indecision or passivity. ', ' Delays decisions; avoids clear ownership; mixed signals to teams. ', ' Loss of direction; reduced trust. ', ' Re-establish anchors. Clearly name priorities, owners, and timelines to restore functional balance.'),
(101, 'SRT ', ' E ', 'Strength', ' Emotional balance is a defining strength. You regulate intensity, calm, and responsiveness fluidly, creating psychological safety and resilience. ', ' Adjusts response to context; stays composed; acts decisively when needed; recovers quickly. ', ' Emotional neutrality may reduce visible urgency. ', ' Signal urgency explicitly when required. Pair calm presence with clear timelines and decisive language.'),
(102, 'SRT ', ' E ', 'Balanced', ' Emotional regulation is mostly reliable, though sustained stress can blur responsiveness. ', ' Maintains composure; avoids extremes; adapts after feedback. ', ' Subtle delays; under-communication of urgency. ', ' Use escalation cues and “act-by” commitments to preserve responsiveness under pressure.'),
(103, 'SRT ', ' E ', 'Development', ' Balance fluctuates with stress. Emotional responses vary across situations. ', ' Alternates between calm and hesitation; seeks reassurance. ', ' Inconsistent leadership presence. ', ' Practice pre-defined response routines for high-pressure scenarios and conduct after-action reviews.'),
(104, 'SRT ', ' E ', 'Risk / Blind Spot', ' Emotional balance deteriorates under pressure, leading to indecision or withdrawal. ', ' Avoids engagement; delays responses. ', ' Team anxiety; unresolved issues. ', ' Reinforce emotional anchors through coaching, role clarity, and simplified decision rules.'),
(105, 'SRT ', ' A ', 'Strength', ' You maintain a healthy, well-balanced network of influence and learning. Inputs are diverse, filtered, and integrated thoughtfully. ', ' Engages mentors and peers; listens widely; validates advice before acting. ', ' Over-reliance on balance may reduce exposure to bold dissent. ', ' Periodically seek strong contrarian views to stress-test decisions and avoid comfort bias.'),
(106, 'SRT ', ' A ', 'Balanced', ' Associations are supportive and functional, though depth and diversity vary. ', ' Collaborates effectively; seeks guidance when needed. ', ' Limited challenge; familiar voices dominate. ', ' Refresh advisory mix annually and formalize decision filters.'),
(107, 'SRT ', ' A ', 'Development', ' Network engagement is inconsistent. Guidance is available but not systematically leveraged. ', ' Consults sporadically; uneven follow-through. ', ' Blind spots persist. ', ' Establish a core mentor panel and document learning outcomes from each interaction.'),
(108, 'SRT ', ' A ', 'Risk / Blind Spot', ' Association weakens under pressure, leading to isolation or unfiltered influence. ', ' Withdraws or relies on narrow inputs. ', ' Strategic drift; credibility risk. ', ' Rebuild association deliberately with diverse advisors and a two-source validation rule.'),
(109, 'SRT ', ' D ', 'Strength', ' Ethical judgment is integrated and context-aware. You balance principles, pragmatism, and responsibility effectively. ', ' Applies values consistently; owns decisions; navigates grey zones with maturity. ', ' Comfort with balance may delay firm stances in rare critical moments. ', ' Define non-negotiables clearly and act decisively when they are triggered.'),
(110, 'SRT ', ' D ', 'Balanced', ' Moral intent is strong, though judgment can soften in complex trade-offs. ', ' Generally fair decisions; selective escalation. ', ' Inconsistent edge-case handling. ', ' Use post-decision ethical reviews to sharpen clarity and consistency.'),
(111, 'SRT ', ' D ', 'Development', ' Ethical balance varies with context. Principles are known but not always operationalized. ', ' Hesitates in dilemmas; seeks external validation. ', ' Reduced moral authority. ', ' Translate values into explicit decision rules and practice scenario-based judgment.'),
(112, 'SRT ', ' D ', 'Risk / Blind Spot', ' Balance breaks down in ethical stress, leading to avoidance or indecision. ', ' Defers responsibility; delays moral stance. ', ' Trust erosion; ethical ambiguity. ', ' Reinstate guardrails, accountability, and ethics-focused coaching to restore moral balance.');

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE `participants` (
  `participant_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`participant_id`, `session_id`, `name`, `email`, `phone`, `designation`, `department`, `company`, `created_at`) VALUES
(1, 1, 'ashu', 'ashu@g.com', '123', '123', '12', 'Test', '2025-12-14 13:13:35'),
(2, 1, 'Test', 'as@g.com', '12321324', '123', '123', 'Test', '2025-12-14 17:27:48');

-- --------------------------------------------------------

--
-- Table structure for table `quadrant-interpretation`
--

CREATE TABLE `quadrant-interpretation` (
  `id` int(11) NOT NULL,
  `matrix` varchar(31) DEFAULT NULL,
  `x_axis` varchar(12) DEFAULT NULL,
  `y_axis` varchar(14) DEFAULT NULL,
  `quadrant` varchar(14) DEFAULT NULL,
  `narrative` varchar(237) DEFAULT NULL,
  `Development Focus:` varchar(227) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `quadrant-interpretation`
--

INSERT INTO `quadrant-interpretation` (`id`, `matrix`, `x_axis`, `y_axis`, `quadrant`, `narrative`, `Development Focus:`) VALUES
(1, 'Selflessness vs. Clarity', 'Selflessness', 'Clarity', 'Q1 (High-High)', 'You are a Wise Altruist — a leader who combines deep compassion with strategic precision. You align purpose with measurable outcomes, balancing heart and intellect to foster trust, accountability, and shared ownership among stakeholders.', 'To deepen this profile, document key decision cases that balanced empathy and hard judgment. Use these as teaching stories for your peers. Mentor others on how to uphold values while executing decisive action under pressure.'),
(2, 'Selflessness vs. Clarity', 'Selflessness', 'Clarity', 'Q2 (Low-High)', 'You are an Empath without Edge — generous and caring, yet often hesitant to make hard calls. Your inclusive intent builds goodwill, but lack of boundaries can blur priorities and delay progress.', 'Introduce structure into compassion. Create a decision rubric to clarify trade-offs, and practice boundary-setting scripts to protect focus without losing warmth. Learn to say “no” gracefully to safeguard purpose and timelines.'),
(3, 'Selflessness vs. Clarity', 'Selflessness', 'Clarity', 'Q3 (Low-Low)', 'You are a Lost Idealist — driven by good intent but lacking clarity and direction. Your energy disperses across efforts, leading to rework and frustration. Purpose feels present but not translated into outcomes.', 'Anchor your intent with structure. Define clear OKRs, schedule weekly check-ins, and celebrate small wins to rebuild momentum. A consistent rhythm of reflection and execution will turn ideals into tangible results.'),
(4, 'Selflessness vs. Clarity', 'Selflessness', 'Clarity', 'Q4 (High-Low)', 'You are an Efficient Egoist — sharp in strategy, but thin on empathy. You achieve results quickly, yet your win–lose framing may strain trust and create hidden resistance.', 'Balance intellect with empathy. Conduct stakeholder walkarounds and empathy interviews to understand unseen concerns. Involve others in co-design reviews to transform efficiency into shared success.'),
(5, 'Fear vs. Responsibility', 'Fear', 'Responsibility', 'Q1 (High-High)', 'You are an Accountable Courage leader — aware of risks and fears, yet guided by responsibility and principle. You face challenges transparently, make timely decisions, and create steady confidence in your teams.', 'Sustain this strength through regular scenario drills that simulate high-stakes decisions. Celebrate instances of principled risk-taking, and share decision logs to model calm accountability for others under pressure.'),
(6, 'Fear vs. Responsibility', 'Fear', 'Responsibility', 'Q2 (Low-High)', 'You are an Anxious Caretaker — deeply responsible but overly cautious. Your sense of duty is strong, yet fear of mistakes slows action and spreads stress across the team.', 'Build tolerance for ambiguity through bounded-risk experiments. Try small, reversible actions that show safety in learning. Over time, this will convert anxiety into responsible confidence.'),
(7, 'Fear vs. Responsibility', 'Fear', 'Responsibility', 'Q3 (Low-Low)', 'You are an Avoider — showing low urgency and low accountability. Important decisions drift, ownership blurs, and morale can suffer as uncertainty grows unchecked.', 'Reignite ownership through structure. Clarify roles using the RACI framework, adopt a daily commitment checklist, and engage a sponsor for oversight until reliability becomes habit.'),
(8, 'Fear vs. Responsibility', 'Fear', 'Responsibility', 'Q4 (High-Low)', 'You are a Bold but Reckless leader — quick to act, yet dismissive of due process or broader responsibility. While your energy inspires speed, it may leave gaps in compliance and trust.', 'Channel boldness through pre-mortems and minimum-viable checks. Implement a “hold-the-line” governance routine to ensure enthusiasm serves responsibility, not replaces it.'),
(9, 'Dharma vs. Desire', 'Dharma', 'Desire', 'Q1 (High-High)', 'You are a Purpose-Aligned Achiever — one who channels ambition as a form of service. You pursue growth and innovation within ethical boundaries, building long-term trust and sustainable success.', 'To strengthen this alignment, teach others the principle of means and ends. Define clear non-negotiables and introduce values-based KPIs. By mentoring teams in ethical scaling, you’ll multiply both impact and integrity.'),
(10, 'Dharma vs. Desire', 'Dharma', 'Desire', 'Q2 (Low-High)', 'You are a Conscientious Steward — grounded in values but modest in aspiration. You maintain steady operations and trusted relationships, yet your humility may limit bold growth.', 'Reignite visionary drive. Practice vision casting and empower others to explore higher goals. Celebrate quiet wins publicly to show that integrity and ambition can thrive together.'),
(11, 'Dharma vs. Desire', 'Dharma', 'Desire', 'Q3 (Low-Low)', 'You are a Drifter — lacking both a clear moral anchor and an energizing goal. This often leads to disengagement, scattered efforts, and diminishing team morale.', 'Re-anchor to purpose. Create a 30-day momentum plan with short, meaningful goals. Partner with a mentor or coach who can help you rebuild consistency, clarity, and direction.'),
(12, 'Dharma vs. Desire', 'Dharma', 'Desire', 'Q4 (High-Low)', 'You are an Ambitious Achiever — high on drive but light on ethical grounding. You deliver quick results, but risk long-term erosion of trust or reputation if the foundation isn’t principled.', 'Balance desire with discipline. Engage in ethical red-team reviews before key launches, and practice delayed-gratification sprints that reward thoughtful execution. Shadow a values-based mentor to refine your internal compass.'),
(13, 'Knowledge vs. Application', 'Knowledge', 'Application', 'Q1 (High-High)', 'You are a Learning Practitioner — one who lives wisdom through action. You translate insights into systems, test assumptions transparently, and refine methods until mastery compounds.', 'Keep knowledge alive by teaching it. Lead teach-back sessions, refine SOPs from lived experience, and track habits that connect reflection with daily execution. This will turn learning into institutional strength.'),
(14, 'Knowledge vs. Application', 'Knowledge', 'Application', 'Q2 (Low-High)', 'You are a Reflective Thinker — rich in frameworks but light in application. You enjoy analysis and ideation but risk becoming stuck in the “planning” phase without tangible outcomes.', 'Shift from thought to trial. Run time-boxed pilots and adopt a build–measure–learn rhythm. By compressing feedback cycles, you’ll turn insight into progress and reduce overthinking fatigue.'),
(15, 'Knowledge vs. Application', 'Knowledge', 'Application', 'Q3 (Low-Low)', 'You are a Detached Learner — light on both knowledge and practice. Without curiosity or consistent execution, growth becomes accidental rather than intentional.', 'Reignite curiosity and discipline. Engage in reading sprints, practice reps, and peer learning challenges to rebuild both content depth and application stamina. Learning must once again feel alive.'),
(16, 'Knowledge vs. Application', 'Knowledge', 'Application', 'Q4 (High-Low)', 'You are an Action Without Insight leader — constantly busy, but without reflection or deeper understanding. While productivity is visible, rework and burnout often follow.', 'Pause to analyze patterns. Hold root-cause sessions and use guardrails before scaling new actions. Apprenticing under reflective practitioners will help you convert motion into mastery.'),
(17, 'Association vs. Openness', 'Association', 'Openness', 'Q1 (High-High)', 'You are an Inclusive Influencer — a leader who surrounds yourself with wise company and remains deeply receptive to new perspectives. You build cultures of trust, dialogue, and shared growth across diverse teams.', 'Keep this circle dynamic. Convene a mentor board for regular reviews, nurture dissent rituals, and expand talent pipelines. Protect inclusion from becoming comfort by continuously widening your lens.'),
(18, 'Association vs. Openness', 'Association', 'Openness', 'Q2 (Low-High)', 'You are an Over-Accommodating leader — open to many voices but selective too little. Your generosity of attention creates goodwill, yet conflicting advice and noise dilute focus.', 'Refine your filters. Conduct an association audit to assess who adds clarity versus confusion. Build a “no-list” and define source-quality thresholds so openness serves direction, not distraction.'),
(19, 'Association vs. Openness', 'Association', 'Openness', 'Q3 (Low-Low)', 'You are an Isolated leader — limited in both network and receptivity. While independence may feel efficient, it creates blind spots, slows learning, and weakens cultural renewal.', 'Reconnect deliberately. Schedule warm introductions, join peer circles, and engage in monthly external immersions. Collaboration will refresh insight and dissolve silos.'),
(20, 'Association vs. Openness', 'Association', 'Openness', 'Q4 (High-Low)', 'You are a Dogmatic Driver — surrounded by strong allies but resistant to new ideas. Your consistency inspires loyalty, yet overcontrol can stagnate innovation and erode trust.', 'Reintroduce openness. Use devil’s advocate reviews and hypothesis testing to challenge assumptions. Rotate advisors periodically to keep strategy agile and learning alive.'),
(21, 'Time vs. Collective Orientation', 'Time', 'Collective', 'Q1 (High-High)', 'You are a Long-Term Collaborator — a leader who builds enduring systems and invests patiently in collective progress. You think in decades, not quarters, balancing vision with sustained teamwork and shared benefit.', 'Continue to nurture the long view. Craft a 10-year impact map and define commons-based KPIs that measure legacy, not just performance. Tell the story of stewardship so others learn to build beyond themselves.'),
(22, 'Time vs. Collective Orientation', 'Time', 'Collective', 'Q2 (Low-High)', 'You are a Collaborative but Impatient leader — deeply caring for others yet driven by short horizons. Your empathy builds unity, but the rush for outcomes can limit sustainable change.', 'Extend your time lens. Design roadmap horizons that show how today’s acts feed future stability. Create slack for design and reflection so collective good matures into durable systems.'),
(23, 'Time vs. Collective Orientation', 'Time', 'Collective', 'Q3 (Low-Low)', 'You are a Short-Term Soloist — focused on immediate gains and personal deliverables. You move fast, but short cycles and isolation can drain team energy and erode shared trust.', 'Rebalance for shared longevity. Re-contract with key stakeholders, review OKR balance between personal and team goals, and redesign rewards to reinforce collaboration over competition.'),
(24, 'Time vs. Collective Orientation', 'Time', 'Collective', 'Q4 (High-Low)', 'You are a Strategic but Detached leader — skilled in long-term planning but distant from people’s emotions and everyday realities. Your ideas are sound, yet buy-in and energy may lag.', 'Close the gap between vision and connection. Host townhalls, facilitate participatory design sessions, and create a shared-wins cadence that brings your long-range strategy to life through collective ownership.');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `item_id` varchar(8) DEFAULT NULL,
  `text` varchar(119) DEFAULT NULL,
  `matrix_id` varchar(31) DEFAULT NULL,
  `trait` varchar(14) DEFAULT NULL,
  `min` int(1) DEFAULT NULL,
  `max` int(1) DEFAULT NULL,
  `reverse` int(1) DEFAULT NULL,
  `weight` int(1) DEFAULT NULL,
  `lead_pillar` varchar(5) DEFAULT NULL,
  `lead_quadrant_hint` varchar(19) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`item_id`, `text`, `matrix_id`, `trait`, `min`, `max`, `reverse`, `weight`, `lead_pillar`, `lead_quadrant_hint`) VALUES
('QSC008', 'I believe success is best achieved by focusing on one’s own strengths, not by accommodating others.', 'Selflessness vs. Clarity', 'Selflessness', 1, 5, 1, 1, 'L;E;D', 'Benevolent Idealist'),
('QSC033', 'I prefer short-term gains, even if they come at the cost of others’ trust.', 'Selflessness vs. Clarity', 'Selflessness', 1, 5, 1, 1, 'L;E;D', 'Chaotic Opportunist'),
('QSC003', 'I feel energized when my work contributes to something larger than myself—like community, ecology, or spiritual growth.', 'Selflessness vs. Clarity', 'Selflessness', 1, 5, 0, 1, 'L;E;D', 'Ambitious Executor'),
('QSC015', 'I often put others’ needs ahead of my own, even when it leads to confusion or delay.', 'Selflessness vs. Clarity', 'Selflessness', 1, 5, 0, 1, 'L;E;D', 'Benevolent Idealist'),
('QSC018', 'I feel pulled toward service, yet I often second-guess my decisions.', 'Selflessness vs. Clarity', 'Selflessness', 1, 5, 0, 1, 'L;E;D', 'Dharmic Steward'),
('QSC022', 'I try to be fair and consistent, even if I don’t always inspire others.', 'Selflessness vs. Clarity', 'Selflessness', 1, 5, 0, 1, 'L;E;D', 'Chaotic Opportunist'),
('QSC035', 'How often do people perceive you as approachable when raising collective concerns?', 'Selflessness vs. Clarity', 'Selflessness', 1, 5, 0, 1, 'L', 'Dharmic Visionary'),
('QSC036', 'How often do you visibly role-model “service before self” in daily actions?', 'Selflessness vs. Clarity', 'Selflessness', 1, 5, 0, 1, 'L', 'Dharmic Servant'),
('QSC039', 'Compared to peers, how often do you act transparently even when no one is watching?', 'Selflessness vs. Clarity', 'Selflessness', 1, 5, 0, 1, 'D', 'Dharmic Visionary'),
('QSC013', 'I sometimes avoid taking action because I’m unsure how to balance kindness with effectiveness.', 'Selflessness vs. Clarity', 'Clarity', 1, 5, 1, 1, 'L;E;D', 'Chaotic Opportunist'),
('QSC017', 'I sometimes take on tasks with good intent, but struggle to complete them with impact.', 'Selflessness vs. Clarity', 'Clarity', 1, 5, 1, 1, 'L;E;D', 'Ambitious Executor'),
('QSC004', 'I prefer clarity over speed, especially when the stakes involve people’s well-being.', 'Selflessness vs. Clarity', 'Clarity', 1, 5, 0, 1, 'L;E;D', 'Dharmic Steward'),
('QSC009', 'I’m confident in my ability to execute plans, even if others disagree with my approach.', 'Selflessness vs. Clarity', 'Clarity', 1, 5, 0, 1, 'L;E;D', 'Dharmic Steward'),
('QSC019', 'I admire leaders who act with clarity, even if they’re not always emotionally expressive.', 'Selflessness vs. Clarity', 'Clarity', 1, 5, 0, 1, 'L;E;D', 'Dharmic Steward'),
('QSC037', 'How often have you acknowledged publicly when your own decision turned out wrong?', 'Selflessness vs. Clarity', 'Clarity', 1, 5, 0, 1, 'E', 'Dharmic Visionary'),
('QSC038', 'How often do you consciously role-model sattvic (clear, constructive) behaviours to your team?', 'Selflessness vs. Clarity', 'Clarity', 1, 5, 0, 1, 'A', 'Dharmic Visionary'),
('QSC002', 'When faced with a dilemma, I seek solutions that honor both ethical values and long-term strategy.', 'Selflessness vs. Clarity', 'Clarity', 1, 5, 0, 1, 'L;E;D', 'Chaotic Opportunist'),
('QSC007', 'I prefer measurable outcomes over emotional considerations when making choices.', 'Selflessness vs. Clarity', 'Clarity', 1, 5, 0, 1, 'L;E;D', 'Benevolent Idealist'),
('QTC005  ', 'I act quickly to secure advantage, even if it’s not sustainable.', 'Time vs. Collective Orientation', 'Time', 1, 5, 1, 1, 'L;D', 'Ambitious Executor'),
('QTC001  ', 'I focus on short-term wins even if they compromise long-term goals.', 'Time vs. Collective Orientation', 'Time', 1, 5, 1, 1, 'L;D', 'Dharmic Steward'),
('QTC010  ', 'I prioritize people’s needs over long-term planning.', 'Time vs. Collective Orientation', 'Time', 1, 5, 0, 1, 'L;D', 'Benevolent Idealist'),
('QTC015  ', 'I often feel torn between helping now and planning ahead.', 'Time vs. Collective Orientation', 'Time', 1, 5, 0, 1, 'L;D', 'Benevolent Idealist'),
('QTC018  ', 'I aim for stability more than transformation.', 'Time vs. Collective Orientation', 'Time', 1, 5, 0, 1, 'L;D', 'Dharmic Steward'),
('QTC036', 'How often do you measure the long-term impact of your decisions, not just short-term gains?', 'Time vs. Collective Orientation', 'Time', 1, 5, 0, 1, 'L', 'Dharmic Steward'),
('QTC006  ', 'I try to help others even when I don’t have a long-term plan.', 'Time vs. Collective Orientation', 'Time', 1, 5, 0, 1, 'L;D', 'Dharmic Steward'),
('QTC007  ', 'I often act with compassion but struggle to think strategically.', 'Time vs. Collective Orientation', 'Time', 1, 5, 0, 1, 'L;D', 'Benevolent Idealist'),
('QTC008  ', 'I care about the collective but tend to respond impulsively.', 'Time vs. Collective Orientation', 'Time', 1, 5, 0, 1, 'L;D', 'Benevolent Idealist'),
('QTC024  ', 'I want my work to be remembered more than shared.', 'Time vs. Collective Orientation', 'Collective', 1, 5, 1, 1, 'L;D', 'Chaotic Opportunist'),
('QTC029  ', 'I believe long-term strategy matters more than collective input.', 'Time vs. Collective Orientation', 'Collective', 1, 5, 1, 1, 'L;D', 'Ambitious Executor'),
('QTC009  ', 'I make ethical choices even when they’re not the most efficient.', 'Time vs. Collective Orientation', 'Collective', 1, 5, 0, 1, 'L;D', 'Dharmic Steward'),
('QTC014  ', 'I try to do what’s right, even if I’m unsure about future impact.', 'Time vs. Collective Orientation', 'Collective', 1, 5, 0, 1, 'L;D', 'Chaotic Opportunist'),
('QTC019  ', 'I lead with pragmatism rather than idealism.', 'Time vs. Collective Orientation', 'Collective', 1, 5, 0, 1, 'L;D', 'Dharmic Steward'),
('QTC025  ', 'I value long-term impact but prefer to lead independently.', 'Time vs. Collective Orientation', 'Collective', 1, 5, 0, 1, 'L;D', 'Benevolent Idealist'),
('QTC017  ', 'I consider both personal and collective interests when making decisions.', 'Time vs. Collective Orientation', 'Collective', 1, 5, 0, 1, 'L;D', 'Ambitious Executor'),
('QTC020  ', 'I weigh multiple perspectives before acting.', 'Time vs. Collective Orientation', 'Collective', 1, 5, 0, 1, 'L;D', 'Ambitious Executor'),
('QTC021  ', 'I think long-term but still prioritize personal legacy.', 'Time vs. Collective Orientation', 'Collective', 1, 5, 0, 1, 'L;D', 'Dharmic Steward'),
('QKA001  ', 'I rarely seek out new ideas or perspectives.', 'Knowledge vs. Application', 'Knowledge', 1, 5, 1, 1, 'A;D', 'Dharmic Steward'),
('QKA005  ', 'I rarely reflect on whether my actions are meaningful.', 'Knowledge vs. Application', 'Knowledge', 1, 5, 1, 1, 'A;D', 'Ambitious Executor'),
('QKA010  ', 'I feel confident acting even when I lack formal knowledge.', 'Knowledge vs. Application', 'Knowledge', 1, 5, 0, 1, 'A;D', 'Benevolent Idealist'),
('QKA012  ', 'I often rely on intuition and values rather than structured knowledge.', 'Knowledge vs. Application', 'Knowledge', 1, 5, 0, 1, 'A;D', 'Benevolent Idealist'),
('QKA014  ', 'I learn through experience more than through study.', 'Knowledge vs. Application', 'Knowledge', 1, 5, 0, 1, 'A;D', 'Chaotic Opportunist'),
('QKA017  ', 'I understand basic principles and use them to guide my actions.', 'Knowledge vs. Application', 'Knowledge', 1, 5, 0, 1, 'A;D', 'Ambitious Executor'),
('QKA018  ', 'I prefer proven methods over abstract theories.', 'Knowledge vs. Application', 'Knowledge', 1, 5, 0, 1, 'A;D', 'Dharmic Steward'),
('QKA020  ', 'I deliver results without needing deep philosophical clarity.', 'Knowledge vs. Application', 'Knowledge', 1, 5, 0, 1, 'A;D', 'Ambitious Executor'),
('QKA011  ', 'I try to do what’s right even if I don’t fully understand the issue.', 'Knowledge vs. Application', 'Knowledge', 1, 5, 0, 1, 'A;D', 'Ambitious Executor'),
('QKA004  ', 'I prefer to follow others rather than think or act independently.', 'Knowledge vs. Application', 'Application', 1, 5, 1, 1, 'A;D', 'Dharmic Steward'),
('QKA028  ', 'I feel fulfilled by learning even if I don’t apply it.', 'Knowledge vs. Application', 'Application', 1, 5, 1, 1, 'A;D', 'Dharmic Steward'),
('QKA007  ', 'I prefer doing over thinking.', 'Knowledge vs. Application', 'Application', 1, 5, 0, 1, 'A;D', 'Benevolent Idealist'),
('QKA024  ', 'I value intellectual depth even if it’s not immediately useful.', 'Knowledge vs. Application', 'Application', 1, 5, 0, 1, 'A;D', 'Chaotic Opportunist'),
('QKA035', 'How often do you use a failure as a learning moment for your team?', 'Knowledge vs. Application', 'Application', 1, 5, 0, 1, 'E', 'Dharmic Executor'),
('QKA036', 'Compared to peers, how often do you invest in mentoring juniors or peers?', 'Knowledge vs. Application', 'Application', 1, 5, 0, 1, 'A', 'Dharmic Executor'),
('QKA037', 'How often do you bring external wisdom (books, teachers, role models) into your leadership practice?', 'Knowledge vs. Application', 'Application', 1, 5, 0, 1, 'A', 'Detached Scholar'),
('QKA038', 'How often do you allocate time to clarify your role and duty (svadharma) instead of imitating others?', 'Knowledge vs. Application', 'Application', 1, 5, 0, 1, 'D', 'Dharmic Executor'),
('QKA006  ', 'I act quickly without needing to understand the full picture.', 'Knowledge vs. Application', 'Application', 1, 5, 0, 1, 'A;D', 'Dharmic Steward'),
('QAO004  ', 'I often surround myself with people who agree with me, regardless of their values.', 'Association vs. Openness', 'Association', 1, 5, 1, 1, 'A;E;L', 'Dharmic Steward'),
('QAO006  ', 'I’m open to new ideas, even if they come from questionable sources.', 'Association vs. Openness', 'Association', 1, 5, 1, 1, 'A;E;L', 'Dharmic Steward'),
('QAO015  ', 'I sometimes grow despite the company I keep.', 'Association vs. Openness', 'Association', 1, 5, 0, 1, 'A;E;L', 'Benevolent Idealist'),
('QAO017  ', 'I maintain decent relationships and stay open to feedback.', 'Association vs. Openness', 'Association', 1, 5, 0, 1, 'A;E;L', 'Ambitious Executor'),
('QAO036', 'How often do you intentionally build time with people who inspire ethical thinking?', 'Association vs. Openness', 'Association', 1, 5, 0, 1, 'A', 'Dharmic Integrator'),
('QAO037', 'How often do you review whether your team’s habits (speech, food, work culture) uplift or degrade quality?', 'Association vs. Openness', 'Association', 1, 5, 0, 1, 'A', 'Selective Learner'),
('QAO039', 'How often have you replaced toxic influences with more uplifting associations?', 'Association vs. Openness', 'Association', 1, 5, 0, 1, 'A', 'Dharmic Integrator'),
('QAO011  ', 'I want to grow but often feel unsupported by those around me.', 'Association vs. Openness', 'Association', 1, 5, 0, 1, 'A;E;L', 'Ambitious Executor'),
('QAO012  ', 'I seek guidance but struggle to find uplifting company.', 'Association vs. Openness', 'Association', 1, 5, 0, 1, 'A;E;L', 'Benevolent Idealist'),
('QAO003  ', 'I prefer to lead without seeking advice or input.', 'Association vs. Openness', 'Openness', 1, 5, 1, 1, 'A;E;L', 'Ambitious Executor'),
('QAO010  ', 'I value openness more than discernment.', 'Association vs. Openness', 'Openness', 1, 5, 1, 1, 'A;E;L', 'Benevolent Idealist'),
('QAO019  ', 'I value balanced company and moderate openness.', 'Association vs. Openness', 'Openness', 1, 5, 0, 1, 'A;E;L', 'Dharmic Steward'),
('QAO024  ', 'I trust mentors but maintain strong boundaries.', 'Association vs. Openness', 'Openness', 1, 5, 0, 1, 'A;E;L', 'Chaotic Opportunist'),
('QAO025  ', 'I grow slowly because I’m cautious about influence.', 'Association vs. Openness', 'Openness', 1, 5, 0, 1, 'A;E;L', 'Benevolent Idealist'),
('QAO035', 'How often do you seek advice from mentors or advisors before making key decisions?', 'Association vs. Openness', 'Openness', 1, 5, 0, 1, 'A', 'Dharmic Integrator'),
('QAO038', 'How often do you surround yourself with people who challenge you to grow?', 'Association vs. Openness', 'Openness', 1, 5, 0, 1, 'A', 'Conflicted Seeker'),
('QAO014  ', 'I try to improve myself but feel pulled in different directions.', 'Association vs. Openness', 'Openness', 1, 5, 0, 1, 'A;E;L', 'Chaotic Opportunist'),
('QAO016  ', 'I listen to others and reflect before making decisions.', 'Association vs. Openness', 'Openness', 1, 5, 0, 1, 'A;E;L', 'Benevolent Idealist'),
('QFR024', 'I rarely feel fear when duty calls.', 'Fear vs. Responsibility', 'Fear', 1, 5, 1, 1, 'D;E', 'Chaotic Opportunist'),
('QFR028', 'I feel indifferent to whether things succeed or fail.', 'Fear vs. Responsibility', 'Fear', 1, 5, 1, 1, 'D;E', 'Dharmic Steward'),
('QFR020', 'I reflect before acting, but don’t avoid difficult choices.', 'Fear vs. Responsibility', 'Fear', 1, 5, 0, 1, 'D;E', 'Ambitious Executor'),
('QFR036', 'Compared to peers, how often do you stay calm when facing sudden crises?', 'Fear vs. Responsibility', 'Fear', 1, 5, 0, 1, 'E', 'Dharmic Warrior'),
('QFR037', 'In high-pressure situations, how often do you maintain the same tone and body language as in normal times?', 'Fear vs. Responsibility', 'Fear', 1, 5, 0, 1, 'E', 'Dharmic Warrior'),
('QFR001', 'I often delay decisions because I fear making mistakes.', 'Fear vs. Responsibility', 'Fear', 1, 5, 0, 1, 'D;E', 'Dharmic Steward'),
('QFR002', 'I avoid taking action when situations feel overwhelming.', 'Fear vs. Responsibility', 'Fear', 1, 5, 0, 1, 'D;E', 'Chaotic Opportunist'),
('QFR004', 'I feel paralyzed when others expect me to lead.', 'Fear vs. Responsibility', 'Fear', 1, 5, 0, 1, 'D;E', 'Dharmic Steward'),
('QFR007', 'I hesitate to speak up even when I know what’s right.', 'Fear vs. Responsibility', 'Fear', 1, 5, 0, 1, 'D;E', 'Benevolent Idealist'),
('QFR013', 'I prefer routine leadership over bold initiatives. ', 'Fear vs. Responsibility', 'Responsibility', 1, 5, 1, 1, 'D;E', 'Chaotic Opportunist'),
('QFR035', 'How often do you celebrate effort/process, even when outcomes fell short?', 'Fear vs. Responsibility', 'Responsibility', 1, 5, 1, 1, 'E', 'Courageous Steward'),
('QFR038', 'How often do your team members comment on your ability to stay composed?', 'Fear vs. Responsibility', 'Responsibility', 1, 5, 0, 1, 'E', 'Courageous Steward'),
('QFR039', 'How often do you control the urge to speak harshly in meetings?', 'Fear vs. Responsibility', 'Responsibility', 1, 5, 0, 1, 'D', 'Courageous Steward'),
('QFR003', 'I hope problems will resolve themselves without my involvement.', 'Fear vs. Responsibility', 'Responsibility', 1, 5, 0, 1, 'D;E', 'Ambitious Executor'),
('QFR005', 'I avoid responsibility when I feel uncertain.', 'Fear vs. Responsibility', 'Responsibility', 1, 5, 0, 1, 'D;E', 'Ambitious Executor'),
('QFR006', 'I act only when others push me to take charge.', 'Fear vs. Responsibility', 'Responsibility', 1, 5, 0, 1, 'D;E', 'Dharmic Steward'),
('QFR009', 'I feel responsible but struggle to act on it.', 'Fear vs. Responsibility', 'Responsibility', 1, 5, 0, 1, 'D;E', 'Dharmic Steward'),
('QFR011', 'I fulfill my duties but rarely go beyond expectations.', 'Fear vs. Responsibility', 'Responsibility', 1, 5, 0, 1, 'D;E', 'Ambitious Executor'),
('QDD019', 'I rarely question the deeper impact of my work.', 'Dharma vs. Desire', 'Dharma', 1, 5, 1, 1, 'D;E', 'Dharmic Steward'),
('QDD036', 'How often have you taken an unpopular but dharmic decision despite the risk of criticism?', 'Dharma vs. Desire', 'Dharma', 1, 5, 0, 1, 'E', 'Righteous Conqueror'),
('QDD037', 'How often do you delay decisions until you are confident they align with your values?', 'Dharma vs. Desire', 'Dharma', 1, 5, 0, 1, 'D', 'Dharmic Renunciate'),
('QDD004', 'I pursue excellence even when no one is watching.', 'Dharma vs. Desire', 'Dharma', 1, 5, 0, 1, 'D;E', 'Dharmic Steward'),
('QDD006', 'I act out of duty, even when recognition is unlikely.', 'Dharma vs. Desire', 'Dharma', 1, 5, 0, 1, 'D;E', 'Dharmic Steward'),
('QDD007', 'I prefer guiding others quietly rather than leading from the front.', 'Dharma vs. Desire', 'Dharma', 1, 5, 0, 1, 'D;E', 'Benevolent Idealist'),
('QDD008', 'I often reflect on whether my actions align with timeless values.', 'Dharma vs. Desire', 'Dharma', 1, 5, 0, 1, 'D;E', 'Benevolent Idealist'),
('QDD010', 'I avoid ambition if it risks compromising my principles.', 'Dharma vs. Desire', 'Dharma', 1, 5, 0, 1, 'D;E', 'Benevolent Idealist'),
('QDD011', 'I make decisions that prioritize fairness over speed.', 'Dharma vs. Desire', 'Dharma', 1, 5, 0, 1, 'D;E', 'Ambitious Executor'),
('QDD035', 'How often do you resist pressure to cut ethical or sustainability corners for quick wins?', 'Dharma vs. Desire', 'Desire', 1, 5, 1, 1, 'L', 'Dharmic Renunciate'),
('QDD038', 'How often have you resisted the urge to misuse your authority for personal benefit?', 'Dharma vs. Desire', 'Desire', 1, 5, 1, 1, 'D', 'Dharmic Renunciate'),
('QDD005', 'I worry that my intensity might overshadow quieter voices.', 'Dharma vs. Desire', 'Desire', 1, 5, 0, 1, 'D;E', 'Ambitious Executor'),
('QDD014', 'I prefer long-term stability over short-term wins.', 'Dharma vs. Desire', 'Desire', 1, 5, 0, 1, 'D;E', 'Chaotic Opportunist'),
('QDD018', 'I prefer structure and predictability in leadership.', 'Dharma vs. Desire', 'Desire', 1, 5, 0, 1, 'D;E', 'Dharmic Steward'),
('QDD024', 'I admire disruptors more than stabilizers.', 'Dharma vs. Desire', 'Desire', 1, 5, 0, 1, 'D;E', 'Chaotic Opportunist'),
('QDD039', 'How often do you resist over-indulgence in food, comfort, or personal perks at work?', 'Dharma vs. Desire', 'Desire', 1, 5, 0, 1, 'D', 'Dharmic Renunciate'),
('QDD001', 'I often ask myself whether my bold goals serve a larger purpose.', 'Dharma vs. Desire', 'Desire', 1, 5, 0, 1, 'D;E', 'Dharmic Steward'),
('QDD002', 'I feel most fulfilled when my ambition uplifts others.', 'Dharma vs. Desire', 'Desire', 1, 5, 0, 1, 'D;E', 'Chaotic Opportunist'),
('GLDQ001', 'I turn to spiritual texts, role models, or higher values for guidance', 'GLDQ', 'Sattva', 1, 5, 0, 1, 'D;A;E', 'Dharmic Steward'),
('GLDQ002', 'I express my faith through respect for traditions, universal values, or spirituality', 'GLDQ', 'Sattva', 1, 5, 0, 1, 'D;A;E', 'Dharmic Steward'),
('GLDQ003', 'I see discipline as a steady practice for purification and growth', 'GLDQ', 'Sattva', 1, 5, 0, 1, 'D;A;E', 'Dharmic Steward'),
('GLDQ004', 'My guiding principle in life is duty and integrity', 'GLDQ', 'Sattva', 1, 5, 0, 1, 'D;A;E', 'Dharmic Steward'),
('GLDQ005', 'How often do people perceive you as approachable when raising collective concerns?', 'GLDQ', 'Sattva', 1, 5, 0, 1, 'L', 'Benevolent Idealist'),
('GLDQ006', 'How often do you visibly role-model “service before self” in daily actions?', 'GLDQ', 'Sattva', 1, 5, 0, 1, 'L', 'Dharmic Steward'),
('GLDQ007', 'How often do you celebrate effort/process, even when outcomes fell short?', 'GLDQ', 'Sattva', 1, 5, 0, 1, 'E', 'Benevolent Idealist'),
('GLDQ008', 'My meals are often spicy, oily, or fast foods', 'GLDQ', 'Rajas', 1, 5, 1, 1, 'D;A;E', 'Ambitious Executor'),
('GLDQ009', 'After meals, I usually feel excited first, then restless later', 'GLDQ', 'Rajas', 1, 5, 1, 1, 'D;A;E', 'Ambitious Executor'),
('GLDQ010', 'I turn to successful personalities and achievers for guidance', 'GLDQ', 'Rajas', 1, 5, 0, 1, 'D;A;E', 'Ambitious Executor'),
('GLDQ011', 'I express my faith by following influencers or trends that promise success', 'GLDQ', 'Rajas', 1, 5, 0, 1, 'D;A;E', 'Ambitious Executor'),
('GLDQ012', 'I see discipline as a way to gain progress or recognition', 'GLDQ', 'Rajas', 1, 5, 0, 1, 'D;A;E', 'Ambitious Executor'),
('GLDQ013', 'My guiding principle in life is ambition and achievement', 'GLDQ', 'Rajas', 1, 5, 0, 1, 'D;A;E', 'Ambitious Executor'),
('GLDQ014', 'I admire ambitious, results-driven leaders', 'GLDQ', 'Rajas', 1, 5, 0, 1, 'D;A;E', 'Ambitious Executor'),
('GLDQ015', 'I turn to popular trends, traditions, or casual beliefs for guidance', 'GLDQ', 'Tamas', 1, 5, 1, 1, 'D;A;E', 'Chaotic Opportunist'),
('GLDQ016', 'I express my faith casually, through superstition or neglect', 'GLDQ', 'Tamas', 1, 5, 1, 1, 'D;A;E', 'Chaotic Opportunist'),
('GLDQ017', 'My guiding principle in life is avoiding effort and responsibility', 'GLDQ', 'Tamas', 1, 5, 1, 1, 'D;A;E', 'Chaotic Opportunist'),
('GLDQ018', 'My speech is often careless, negative, or gossip-oriented', 'GLDQ', 'Tamas', 1, 5, 1, 1, 'D;A;E', 'Chaotic Opportunist'),
('GLDQ019', 'My personal discipline is irregular or neglected', 'GLDQ', 'Tamas', 1, 5, 1, 1, 'D;A;E', 'Chaotic Opportunist'),
('GLDQ020', 'I pursue goals with confusion or lack of responsibility', 'GLDQ', 'Tamas', 1, 5, 1, 1, 'D;A;E', 'Chaotic Opportunist'),
('GLDQ021', 'I recover from stress through unhealthy habits or avoidance', 'GLDQ', 'Tamas', 1, 5, 1, 1, 'D;A;E', 'Chaotic Opportunist');

-- --------------------------------------------------------

--
-- Table structure for table `report_files`
--

CREATE TABLE `report_files` (
  `report_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `html_path` varchar(500) DEFAULT NULL,
  `pdf_path` varchar(500) DEFAULT NULL,
  `generated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

CREATE TABLE `responses` (
  `response_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `question_id` varchar(20) NOT NULL,
  `answer_value` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `responses`
--

INSERT INTO `responses` (`response_id`, `participant_id`, `question_id`, `answer_value`, `created_at`) VALUES
(1, 1, 'GLDQ001', 4, '2025-12-14 13:13:35'),
(2, 1, 'GLDQ002', 3, '2025-12-14 13:13:35'),
(3, 1, 'GLDQ003', 3, '2025-12-14 13:13:35'),
(4, 1, 'GLDQ004', 3, '2025-12-14 13:13:35'),
(5, 1, 'GLDQ005', 4, '2025-12-14 13:13:35'),
(6, 1, 'GLDQ006', 3, '2025-12-14 13:13:35'),
(7, 1, 'GLDQ007', 4, '2025-12-14 13:13:35'),
(8, 1, 'GLDQ008', 4, '2025-12-14 13:13:35'),
(9, 1, 'GLDQ009', 4, '2025-12-14 13:13:35'),
(10, 1, 'GLDQ010', 4, '2025-12-14 13:13:35'),
(11, 1, 'GLDQ011', 2, '2025-12-14 13:13:35'),
(12, 1, 'GLDQ012', 2, '2025-12-14 13:13:35'),
(13, 1, 'GLDQ013', 1, '2025-12-14 13:13:35'),
(14, 1, 'GLDQ014', 2, '2025-12-14 13:13:35'),
(15, 1, 'GLDQ015', 3, '2025-12-14 13:13:35'),
(16, 1, 'GLDQ016', 4, '2025-12-14 13:13:35'),
(17, 1, 'GLDQ017', 5, '2025-12-14 13:13:35'),
(18, 1, 'GLDQ018', 5, '2025-12-14 13:13:35'),
(19, 1, 'GLDQ019', 4, '2025-12-14 13:13:35'),
(20, 1, 'GLDQ020', 4, '2025-12-14 13:13:35'),
(21, 1, 'GLDQ021', 3, '2025-12-14 13:13:35'),
(22, 1, 'QAO003  ', 3, '2025-12-14 13:13:35'),
(23, 1, 'QAO004  ', 3, '2025-12-14 13:13:35'),
(24, 1, 'QAO006  ', 3, '2025-12-14 13:13:35'),
(25, 1, 'QAO010  ', 3, '2025-12-14 13:13:35'),
(26, 1, 'QAO015  ', 3, '2025-12-14 13:13:35'),
(27, 1, 'QAO016  ', 3, '2025-12-14 13:13:35'),
(28, 1, 'QAO017  ', 3, '2025-12-14 13:13:35'),
(29, 1, 'QAO019  ', 3, '2025-12-14 13:13:35'),
(30, 1, 'QAO024  ', 2, '2025-12-14 13:13:35'),
(31, 1, 'QAO025  ', 3, '2025-12-14 13:13:35'),
(32, 1, 'QAO035', 3, '2025-12-14 13:13:35'),
(33, 1, 'QAO036', 2, '2025-12-14 13:13:35'),
(34, 1, 'QAO037', 4, '2025-12-14 13:13:35'),
(35, 1, 'QAO039', 4, '2025-12-14 13:13:35'),
(36, 1, 'QDD001', 1, '2025-12-14 13:13:35'),
(37, 1, 'QDD002', 5, '2025-12-14 13:13:35'),
(38, 1, 'QDD004', 5, '2025-12-14 13:13:35'),
(39, 1, 'QDD005', 2, '2025-12-14 13:13:35'),
(40, 1, 'QDD006', 4, '2025-12-14 13:13:35'),
(41, 1, 'QDD007', 4, '2025-12-14 13:13:35'),
(42, 1, 'QDD008', 4, '2025-12-14 13:13:35'),
(43, 1, 'QDD010', 4, '2025-12-14 13:13:35'),
(44, 1, 'QDD011', 3, '2025-12-14 13:13:35'),
(45, 1, 'QDD014', 3, '2025-12-14 13:13:35'),
(46, 1, 'QDD018', 3, '2025-12-14 13:13:35'),
(47, 1, 'QDD019', 3, '2025-12-14 13:13:35'),
(48, 1, 'QDD024', 3, '2025-12-14 13:13:35'),
(49, 1, 'QDD035', 3, '2025-12-14 13:13:35'),
(50, 1, 'QDD036', 3, '2025-12-14 13:13:35'),
(51, 1, 'QDD037', 3, '2025-12-14 13:13:35'),
(52, 1, 'QDD038', 3, '2025-12-14 13:13:35'),
(53, 1, 'QDD039', 3, '2025-12-14 13:13:35'),
(54, 1, 'QFR001', 3, '2025-12-14 13:13:35'),
(55, 1, 'QFR002', 4, '2025-12-14 13:13:35'),
(56, 1, 'QFR003', 4, '2025-12-14 13:13:35'),
(57, 1, 'QFR004', 4, '2025-12-14 13:13:35'),
(58, 1, 'QFR005', 4, '2025-12-14 13:13:35'),
(59, 1, 'QFR006', 4, '2025-12-14 13:13:35'),
(60, 1, 'QFR007', 4, '2025-12-14 13:13:35'),
(61, 1, 'QFR009', 4, '2025-12-14 13:13:35'),
(62, 1, 'QFR011', 4, '2025-12-14 13:13:35'),
(63, 1, 'QFR013', 4, '2025-12-14 13:13:35'),
(64, 1, 'QFR020', 4, '2025-12-14 13:13:35'),
(65, 1, 'QFR024', 4, '2025-12-14 13:13:35'),
(66, 1, 'QFR028', 4, '2025-12-14 13:13:35'),
(67, 1, 'QFR035', 4, '2025-12-14 13:13:35'),
(68, 1, 'QFR036', 4, '2025-12-14 13:13:35'),
(69, 1, 'QFR037', 4, '2025-12-14 13:13:35'),
(70, 1, 'QFR038', 4, '2025-12-14 13:13:35'),
(71, 1, 'QFR039', 4, '2025-12-14 13:13:35'),
(72, 1, 'QKA001  ', 4, '2025-12-14 13:13:35'),
(73, 1, 'QKA004  ', 3, '2025-12-14 13:13:35'),
(74, 1, 'QKA005  ', 3, '2025-12-14 13:13:35'),
(75, 1, 'QKA006  ', 5, '2025-12-14 13:13:35'),
(76, 1, 'QKA007  ', 5, '2025-12-14 13:13:35'),
(77, 1, 'QKA010  ', 2, '2025-12-14 13:13:35'),
(78, 1, 'QKA011  ', 3, '2025-12-14 13:13:35'),
(79, 1, 'QKA012  ', 3, '2025-12-14 13:13:35'),
(80, 1, 'QKA014  ', 3, '2025-12-14 13:13:35'),
(81, 1, 'QKA017  ', 3, '2025-12-14 13:13:35'),
(82, 1, 'QKA018  ', 3, '2025-12-14 13:13:35'),
(83, 1, 'QKA020  ', 3, '2025-12-14 13:13:35'),
(84, 1, 'QKA024  ', 3, '2025-12-14 13:13:35'),
(85, 1, 'QKA028  ', 2, '2025-12-14 13:13:35'),
(86, 1, 'QKA035', 3, '2025-12-14 13:13:35'),
(87, 1, 'QKA036', 4, '2025-12-14 13:13:35'),
(88, 1, 'QKA037', 4, '2025-12-14 13:13:35'),
(89, 1, 'QKA038', 4, '2025-12-14 13:13:35'),
(90, 1, 'QSC002', 4, '2025-12-14 13:13:35'),
(91, 1, 'QSC003', 4, '2025-12-14 13:13:35'),
(92, 1, 'QSC004', 4, '2025-12-14 13:13:35'),
(93, 1, 'QSC007', 4, '2025-12-14 13:13:35'),
(94, 1, 'QSC008', 4, '2025-12-14 13:13:35'),
(95, 1, 'QSC009', 5, '2025-12-14 13:13:35'),
(96, 1, 'QSC013', 5, '2025-12-14 13:13:35'),
(97, 1, 'QSC015', 4, '2025-12-14 13:13:35'),
(98, 1, 'QSC017', 4, '2025-12-14 13:13:35'),
(99, 1, 'QSC018', 4, '2025-12-14 13:13:35'),
(100, 1, 'QSC019', 4, '2025-12-14 13:13:35'),
(101, 1, 'QSC022', 4, '2025-12-14 13:13:35'),
(102, 1, 'QSC033', 3, '2025-12-14 13:13:35'),
(103, 1, 'QSC035', 2, '2025-12-14 13:13:35'),
(104, 1, 'QSC036', 1, '2025-12-14 13:13:35'),
(105, 1, 'QSC037', 1, '2025-12-14 13:13:35'),
(106, 1, 'QSC038', 1, '2025-12-14 13:13:35'),
(107, 1, 'QSC039', 1, '2025-12-14 13:13:35'),
(108, 1, 'QTC001  ', 2, '2025-12-14 13:13:35'),
(109, 1, 'QTC005  ', 2, '2025-12-14 13:13:35'),
(110, 1, 'QTC006  ', 3, '2025-12-14 13:13:35'),
(111, 1, 'QTC007  ', 3, '2025-12-14 13:13:35'),
(112, 1, 'QTC008  ', 3, '2025-12-14 13:13:35'),
(113, 1, 'QTC009  ', 3, '2025-12-14 13:13:35'),
(114, 1, 'QTC010  ', 3, '2025-12-14 13:13:35'),
(115, 1, 'QTC014  ', 4, '2025-12-14 13:13:35'),
(116, 1, 'QTC015  ', 4, '2025-12-14 13:13:35'),
(117, 1, 'QTC017  ', 4, '2025-12-14 13:13:35'),
(118, 1, 'QTC018  ', 4, '2025-12-14 13:13:35'),
(119, 1, 'QTC019  ', 4, '2025-12-14 13:13:35'),
(120, 1, 'QTC020  ', 4, '2025-12-14 13:13:35'),
(121, 1, 'QTC021  ', 4, '2025-12-14 13:13:35'),
(122, 1, 'QTC024  ', 4, '2025-12-14 13:13:35'),
(123, 1, 'QTC025  ', 4, '2025-12-14 13:13:35'),
(124, 1, 'QTC029  ', 5, '2025-12-14 13:13:35'),
(125, 1, 'QTC036', 5, '2025-12-14 13:13:35'),
(126, 1, 'QAO038', 4, '2025-12-14 13:13:35'),
(127, 1, 'QAO012  ', 4, '2025-12-14 13:13:35'),
(128, 1, 'QAO011  ', 4, '2025-12-14 13:13:35'),
(129, 1, 'QAO014  ', 4, '2025-12-14 13:13:35'),
(130, 2, 'GLDQ003', 1, '2025-12-14 17:27:48'),
(131, 2, 'GLDQ004', 2, '2025-12-14 17:27:48'),
(132, 2, 'GLDQ005', 3, '2025-12-14 17:27:48'),
(133, 2, 'GLDQ006', 4, '2025-12-14 17:27:48'),
(134, 2, 'GLDQ007', 5, '2025-12-14 17:27:48'),
(135, 2, 'GLDQ008', 5, '2025-12-14 17:27:48'),
(136, 2, 'GLDQ009', 5, '2025-12-14 17:27:48'),
(137, 2, 'GLDQ010', 5, '2025-12-14 17:27:48'),
(138, 2, 'GLDQ011', 5, '2025-12-14 17:27:48'),
(139, 2, 'GLDQ012', 5, '2025-12-14 17:27:48'),
(140, 2, 'GLDQ013', 5, '2025-12-14 17:27:48'),
(141, 2, 'GLDQ014', 5, '2025-12-14 17:27:48'),
(142, 2, 'GLDQ015', 5, '2025-12-14 17:27:48'),
(143, 2, 'GLDQ016', 5, '2025-12-14 17:27:48'),
(144, 2, 'GLDQ017', 5, '2025-12-14 17:27:48'),
(145, 2, 'GLDQ018', 5, '2025-12-14 17:27:48'),
(146, 2, 'GLDQ019', 5, '2025-12-14 17:27:48'),
(147, 2, 'GLDQ020', 5, '2025-12-14 17:27:48'),
(148, 2, 'GLDQ021', 5, '2025-12-14 17:27:48'),
(149, 2, 'QAO003  ', 5, '2025-12-14 17:27:48'),
(150, 2, 'QAO004  ', 5, '2025-12-14 17:27:48'),
(151, 2, 'QAO006  ', 5, '2025-12-14 17:27:48'),
(152, 2, 'QAO010  ', 5, '2025-12-14 17:27:48'),
(153, 2, 'QAO011  ', 5, '2025-12-14 17:27:48'),
(154, 2, 'QAO012  ', 5, '2025-12-14 17:27:48'),
(155, 2, 'QAO014  ', 5, '2025-12-14 17:27:48'),
(156, 2, 'QAO015  ', 5, '2025-12-14 17:27:48'),
(157, 2, 'QAO016  ', 4, '2025-12-14 17:27:48'),
(158, 2, 'QAO017  ', 4, '2025-12-14 17:27:48'),
(159, 2, 'QAO019  ', 3, '2025-12-14 17:27:48'),
(160, 2, 'QAO024  ', 3, '2025-12-14 17:27:48'),
(161, 2, 'QAO025  ', 2, '2025-12-14 17:27:48'),
(162, 2, 'QAO035', 1, '2025-12-14 17:27:48'),
(163, 2, 'QAO036', 2, '2025-12-14 17:27:48'),
(164, 2, 'QAO037', 2, '2025-12-14 17:27:48'),
(165, 2, 'QAO038', 3, '2025-12-14 17:27:48'),
(166, 2, 'QAO039', 3, '2025-12-14 17:27:48'),
(167, 2, 'QDD001', 3, '2025-12-14 17:27:48'),
(168, 2, 'QDD002', 4, '2025-12-14 17:27:48'),
(169, 2, 'QDD004', 4, '2025-12-14 17:27:48'),
(170, 2, 'QDD005', 4, '2025-12-14 17:27:48'),
(171, 2, 'QDD006', 4, '2025-12-14 17:27:48'),
(172, 2, 'QDD007', 4, '2025-12-14 17:27:48'),
(173, 2, 'QDD008', 4, '2025-12-14 17:27:48'),
(174, 2, 'QDD010', 4, '2025-12-14 17:27:48'),
(175, 2, 'QDD011', 4, '2025-12-14 17:27:48'),
(176, 2, 'QDD014', 4, '2025-12-14 17:27:48'),
(177, 2, 'QDD018', 4, '2025-12-14 17:27:48'),
(178, 2, 'QDD019', 4, '2025-12-14 17:27:48'),
(179, 2, 'QDD024', 3, '2025-12-14 17:27:48'),
(180, 2, 'QDD035', 2, '2025-12-14 17:27:48'),
(181, 2, 'QDD036', 3, '2025-12-14 17:27:48'),
(182, 2, 'QDD037', 3, '2025-12-14 17:27:48'),
(183, 2, 'QDD038', 3, '2025-12-14 17:27:48'),
(184, 2, 'QDD039', 3, '2025-12-14 17:27:48'),
(185, 2, 'QFR001', 4, '2025-12-14 17:27:48'),
(186, 2, 'QFR002', 4, '2025-12-14 17:27:48'),
(187, 2, 'QFR003', 3, '2025-12-14 17:27:48'),
(188, 2, 'QFR004', 3, '2025-12-14 17:27:48'),
(189, 2, 'QFR005', 4, '2025-12-14 17:27:48'),
(190, 2, 'QFR006', 4, '2025-12-14 17:27:48'),
(191, 2, 'QFR007', 3, '2025-12-14 17:27:48'),
(192, 2, 'QFR009', 3, '2025-12-14 17:27:48'),
(193, 2, 'QFR011', 3, '2025-12-14 17:27:48'),
(194, 2, 'QFR013', 4, '2025-12-14 17:27:48'),
(195, 2, 'QFR020', 4, '2025-12-14 17:27:48'),
(196, 2, 'QFR024', 2, '2025-12-14 17:27:48'),
(197, 2, 'QFR028', 2, '2025-12-14 17:27:48'),
(198, 2, 'QFR035', 3, '2025-12-14 17:27:48'),
(199, 2, 'QFR036', 3, '2025-12-14 17:27:48'),
(200, 2, 'QFR037', 3, '2025-12-14 17:27:48'),
(201, 2, 'QFR038', 3, '2025-12-14 17:27:48'),
(202, 2, 'QFR039', 3, '2025-12-14 17:27:48'),
(203, 2, 'QKA001  ', 3, '2025-12-14 17:27:48'),
(204, 2, 'QKA004  ', 3, '2025-12-14 17:27:48'),
(205, 2, 'QKA005  ', 3, '2025-12-14 17:27:48'),
(206, 2, 'QKA006  ', 3, '2025-12-14 17:27:48'),
(207, 2, 'QKA007  ', 3, '2025-12-14 17:27:48'),
(208, 2, 'QKA010  ', 3, '2025-12-14 17:27:48'),
(209, 2, 'QKA011  ', 3, '2025-12-14 17:27:48'),
(210, 2, 'QKA012  ', 3, '2025-12-14 17:27:48'),
(211, 2, 'QKA014  ', 3, '2025-12-14 17:27:48'),
(212, 2, 'QKA017  ', 3, '2025-12-14 17:27:48'),
(213, 2, 'QKA018  ', 3, '2025-12-14 17:27:48'),
(214, 2, 'QKA020  ', 4, '2025-12-14 17:27:48'),
(215, 2, 'QKA024  ', 4, '2025-12-14 17:27:48'),
(216, 2, 'QKA028  ', 3, '2025-12-14 17:27:48'),
(217, 2, 'QKA035', 2, '2025-12-14 17:27:48'),
(218, 2, 'QKA036', 4, '2025-12-14 17:27:48'),
(219, 2, 'QKA037', 4, '2025-12-14 17:27:48'),
(220, 2, 'QKA038', 4, '2025-12-14 17:27:48'),
(221, 2, 'QSC002', 4, '2025-12-14 17:27:48'),
(222, 2, 'QSC003', 3, '2025-12-14 17:27:48'),
(223, 2, 'QSC004', 3, '2025-12-14 17:27:48'),
(224, 2, 'QSC007', 3, '2025-12-14 17:27:48'),
(225, 2, 'QSC008', 3, '2025-12-14 17:27:48'),
(226, 2, 'QSC009', 3, '2025-12-14 17:27:48'),
(227, 2, 'QSC013', 3, '2025-12-14 17:27:48'),
(228, 2, 'QSC015', 3, '2025-12-14 17:27:48'),
(229, 2, 'QSC017', 3, '2025-12-14 17:27:48'),
(230, 2, 'QSC018', 3, '2025-12-14 17:27:48'),
(231, 2, 'QSC019', 3, '2025-12-14 17:27:48'),
(232, 2, 'QSC022', 2, '2025-12-14 17:27:48'),
(233, 2, 'QSC033', 2, '2025-12-14 17:27:48'),
(234, 2, 'QSC035', 3, '2025-12-14 17:27:48'),
(235, 2, 'QSC036', 2, '2025-12-14 17:27:48'),
(236, 2, 'QSC037', 3, '2025-12-14 17:27:48'),
(237, 2, 'QSC038', 3, '2025-12-14 17:27:48'),
(238, 2, 'QSC039', 3, '2025-12-14 17:27:48'),
(239, 2, 'QTC001  ', 2, '2025-12-14 17:27:48'),
(240, 2, 'QTC005  ', 2, '2025-12-14 17:27:48'),
(241, 2, 'QTC006  ', 3, '2025-12-14 17:27:48'),
(242, 2, 'QTC007  ', 3, '2025-12-14 17:27:48'),
(243, 2, 'QTC008  ', 3, '2025-12-14 17:27:48'),
(244, 2, 'QTC009  ', 3, '2025-12-14 17:27:48'),
(245, 2, 'QTC010  ', 3, '2025-12-14 17:27:48'),
(246, 2, 'QTC014  ', 3, '2025-12-14 17:27:48'),
(247, 2, 'QTC015  ', 3, '2025-12-14 17:27:48'),
(248, 2, 'QTC017  ', 3, '2025-12-14 17:27:48'),
(249, 2, 'QTC018  ', 3, '2025-12-14 17:27:48'),
(250, 2, 'QTC019  ', 3, '2025-12-14 17:27:48'),
(251, 2, 'QTC020  ', 3, '2025-12-14 17:27:48'),
(252, 2, 'QTC021  ', 3, '2025-12-14 17:27:48'),
(253, 2, 'QTC024  ', 3, '2025-12-14 17:27:48'),
(254, 2, 'QTC025  ', 3, '2025-12-14 17:27:48'),
(255, 2, 'QTC029  ', 3, '2025-12-14 17:27:48'),
(256, 2, 'QTC036', 3, '2025-12-14 17:27:48'),
(257, 2, 'GLDQ002', 3, '2025-12-14 17:27:48'),
(258, 2, 'GLDQ001', 3, '2025-12-14 17:27:48');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `result_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `result_json` longtext NOT NULL,
  `generated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`result_id`, `participant_id`, `result_json`, `generated_at`) VALUES
(1, 1, '{\"guna_T\":{\"Rajas\":28.571428571428573,\"Sattva\":60.714285714285715,\"Tamas\":25},\"guna_norm_pct\":{\"Rajas\":25,\"Sattva\":53.125,\"Tamas\":21.875},\"matrices\":[{\"name\":\"Selflessness vs. Clarity\",\"quadrant\":\"Q3\",\"x\":44.44444444444444,\"y\":47.22222222222222},{\"name\":\"Time vs. Collective\",\"quadrant\":\"Q1\",\"x\":66.66666666666667,\"y\":58.333333333333336},{\"name\":\"Knowledge vs. Application\",\"quadrant\":\"Q2\",\"x\":44.44444444444444,\"y\":72.22222222222223},{\"name\":\"Association vs. Openness\",\"quadrant\":\"Q1\",\"x\":58.333333333333336,\"y\":52.77777777777778},{\"name\":\"Fear vs. Responsibility\",\"quadrant\":\"Q1\",\"x\":61.111111111111114,\"y\":63.888888888888886},{\"name\":\"Dharma vs. Desire\",\"quadrant\":\"Q4\",\"x\":66.66666666666667,\"y\":47.22222222222222}],\"matrix_strengths\":[\"Time vs. Collective — High Strength\",\"Association vs. Openness — High Strength\",\"Fear vs. Responsibility — High Strength\"],\"matrix_watchouts\":[\"Selflessness vs. Clarity — Development Area\",\"Knowledge vs. Application — Development Area\",\"Dharma vs. Desire — Development Area\"],\"name\":\"ashu\",\"overall_T\":51.53909916723868,\"overall_raw\":53.87596899224806,\"participant_id\":1,\"pillars\":{\"A\":47.64150943396226,\"D\":53.98936170212766,\"E\":52.56410256410256,\"L\":57.6530612244898}}', '2025-12-14 13:25:50'),
(2, 2, '{\"guna_T\":{\"Rajas\":71.42857142857143,\"Sattva\":50,\"Tamas\":0},\"guna_norm_pct\":{\"Rajas\":58.82352941176471,\"Sattva\":41.17647058823529,\"Tamas\":0},\"matrices\":[{\"name\":\"Selflessness vs. Clarity\",\"quadrant\":\"Q2\",\"x\":47.22222222222222,\"y\":52.77777777777778},{\"name\":\"Time vs. Collective\",\"quadrant\":\"Q1\",\"x\":55.55555555555556,\"y\":50},{\"name\":\"Knowledge vs. Application\",\"quadrant\":\"Q1\",\"x\":52.77777777777778,\"y\":58.333333333333336},{\"name\":\"Association vs. Openness\",\"quadrant\":\"Q4\",\"x\":52.77777777777778,\"y\":38.888888888888886},{\"name\":\"Fear vs. Responsibility\",\"quadrant\":\"Q1\",\"x\":63.888888888888886,\"y\":52.77777777777778},{\"name\":\"Dharma vs. Desire\",\"quadrant\":\"Q1\",\"x\":63.888888888888886,\"y\":63.888888888888886}],\"matrix_strengths\":[\"Time vs. Collective — High Strength\",\"Knowledge vs. Application — High Strength\",\"Fear vs. Responsibility — High Strength\",\"Dharma vs. Desire — High Strength\"],\"matrix_watchouts\":[\"Selflessness vs. Clarity — Development Area\",\"Association vs. Openness — Development Area\"],\"name\":\"Test\",\"overall_T\":50.82425335856254,\"overall_raw\":52.13178294573643,\"participant_id\":2,\"pillars\":{\"A\":45.283018867924525,\"D\":52.659574468085104,\"E\":52.243589743589745,\"L\":52.55102040816327}}', '2025-12-14 17:28:17');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` int(11) NOT NULL,
  `session_name` varchar(255) NOT NULL,
  `session_description` text DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('active','closed') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `session_name`, `session_description`, `company_name`, `created_by`, `created_at`, `status`) VALUES
(1, 'Test - 14/12/2025, 6:19:37 pm', 'Initial session for Test', 'Test', NULL, '2025-12-14 12:49:37', 'active'),
(2, 'Trial - 14/12/2025, 10:53:40 pm', 'Initial session for Trial', 'Trial', NULL, '2025-12-14 17:23:40', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `session_links`
--

CREATE TABLE `session_links` (
  `link_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `link_token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `session_links`
--

INSERT INTO `session_links` (`link_id`, `session_id`, `link_token`, `created_at`) VALUES
(1, 1, '90d20594637b4e2cdee6f38a', '2025-12-14 12:49:37'),
(2, 2, 'df5761428d7dbe3ae4ab3366', '2025-12-14 17:23:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `leadership_type`
--
ALTER TABLE `leadership_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`participant_id`);

--
-- Indexes for table `quadrant-interpretation`
--
ALTER TABLE `quadrant-interpretation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report_files`
--
ALTER TABLE `report_files`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `responses`
--
ALTER TABLE `responses`
  ADD PRIMARY KEY (`response_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`result_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `session_links`
--
ALTER TABLE `session_links`
  ADD PRIMARY KEY (`link_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leadership_type`
--
ALTER TABLE `leadership_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `participant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `quadrant-interpretation`
--
ALTER TABLE `quadrant-interpretation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `report_files`
--
ALTER TABLE `report_files`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `responses`
--
ALTER TABLE `responses`
  MODIFY `response_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=259;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `session_links`
--
ALTER TABLE `session_links`
  MODIFY `link_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
