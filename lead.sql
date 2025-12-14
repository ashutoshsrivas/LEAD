-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 14, 2025 at 01:52 PM
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
(1, 'Test - 14/12/2025, 6:19:37 pm', 'Initial session for Test', 'Test', NULL, '2025-12-14 12:49:37', 'active');

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
(1, 1, '90d20594637b4e2cdee6f38a', '2025-12-14 12:49:37');

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
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`participant_id`);

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
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `participant_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `report_files`
--
ALTER TABLE `report_files`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `responses`
--
ALTER TABLE `responses`
  MODIFY `response_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `session_links`
--
ALTER TABLE `session_links`
  MODIFY `link_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
