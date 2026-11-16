/**
 * 서비스별 목업 화면. 카드 안 "폰 화면" 자리에 들어간다.
 * 각 목업은 해당 서비스의 실제 메인 화면 구성·색·글꼴을 따른다.
 * 새 목업을 만들면 여기에 한 줄 추가하고 services.ts에서 { type: 'mockup', name } 으로 쓴다.
 */
import TellYouLater from './TellYouLater.astro';
import FomoBot from './FomoBot.astro';
import RecallCheck from './RecallCheck.astro';
import SalaryCheck from './SalaryCheck.astro';
import Quiz from './Quiz.astro';
import HomeTender from './HomeTender.astro';
import TwoDegrees from './TwoDegrees.astro';
import KoreanTripPlanner from './KoreanTripPlanner.astro';

export const mockups = {
  'tell-you-later': TellYouLater,
  fomobot: FomoBot,
  'recall-check': RecallCheck,
  'salary-check': SalaryCheck,
  quiz: Quiz,
  'home-tender': HomeTender,
  'two-degrees': TwoDegrees,
  'korean-trip-planner': KoreanTripPlanner,
} as const;

export type MockupName = keyof typeof mockups;
