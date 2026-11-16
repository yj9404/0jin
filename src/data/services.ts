/**
 * 0jin.app에 올라가는 서비스 목록.
 * 화면 순서·칸 배치는 여기서 정하지 않는다 → src/data/layout.ts
 *
 * status에 따라 화면에 보이는 것이 달라진다 (src/lib/card.ts):
 *   live     — 서비스 주소를 보여 주고, 카드는 첫 번째 서비스 주소로 이동
 *   wip      — 주소는 숨기고 "만드는 중" 표시. GitHub가 있으면 카드는 GitHub로
 *   archived — 커버를 흑백으로, 주소는 숨김. 카드는 GitHub로
 * 주소는 status와 상관없이 links에 남겨 둔다. 출시하면 status만 'live'로 바꾸면 된다.
 */
import type { ImageMetadata } from 'astro';
import type { MockupName } from '../components/screens';

export type ServiceStatus = 'live' | 'wip' | 'archived';

export type ServiceLink = {
  /** site: 서비스 주소, toss: 토스 미니앱 공유 링크, github: 저장소 */
  kind: 'site' | 'toss' | 'github';
  href: string;
  /** 생략하면 kind에 따라 정한다. site → 호스트 이름, toss → "토스에서 열기", github → "GitHub" */
  label?: string;
};

export type ServiceScreen =
  /** src/components/screens 의 서비스별 목업 컴포넌트 */
  | { type: 'mockup'; name: MockupName }
  /** 스크린샷. src/assets 에서 import한 이미지 또는 public/ 기준 경로("/screens/x.png") */
  | { type: 'image'; src: ImageMetadata | string; alt: string };

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  /** "2026.11" 형식 */
  since: string;
  /** archived에서 메타 줄에 "since – until"로 보인다 */
  until?: string;
  status: ServiceStatus;
  links: ServiceLink[];
  /** 카드 커버 배경색 */
  color: string;
  /** 커버 위 글자색(넓은 카드의 큰 제목). 생략하면 배경 밝기에 맞춰 검정/흰색 */
  ink?: string;
  /** 넓은 카드(span 2·3) 커버에 크게 쓰는 제목. \n으로 줄을 나눈다. 생략하면 name */
  coverTitle?: string;
  screen: ServiceScreen;
};

/**
 * 포모봇 웹 주소. fomobot.0jin.app으로 이관 예정이고, fomobot.net은 2027년 7월에 연장하지 않고 종료한다.
 * 이관하면 이 값만 'https://fomobot.0jin.app'으로 바꾸면 된다(메타 줄의 표시 이름도 호스트에서 자동으로 바뀐다).
 */
const FOMOBOT_WEB = 'https://fomobot.net';

export const services: Service[] = [
  {
    slug: 'tell-you-later',
    name: '할 말이 있는데 나중에 할게',
    tagline: '정한 날짜 전에는 쓴 사람도, 서버도 열 수 없는 편지 링크.',
    category: 'Web',
    since: '2026.11',
    status: 'live',
    links: [
      { kind: 'site', href: 'https://tell-you-later.0jin.app' },
      { kind: 'github', href: 'https://github.com/yj9404/tell-you-later' },
    ],
    color: '#FFD9C7',
    ink: '#5A2A1A',
    coverTitle: '할 말이 있는데\n나중에 할게',
    screen: { type: 'mockup', name: 'tell-you-later' },
  },
  {
    slug: 'fomobot',
    name: '포모봇',
    tagline: '코스피·나스닥 종목과 국내 아파트 단지의 수익률 순위를 한눈에.',
    category: 'Web',
    since: '2026.06',
    status: 'live',
    links: [
      { kind: 'site', href: FOMOBOT_WEB },
      { kind: 'toss', href: 'https://tossminiapp.com/s/nHNqtzdv' },
      { kind: 'github', href: 'https://github.com/yj9404/fomobot' },
    ],
    // 포모봇이 상승 종목에 쓰는 빨강(KR_UP)
    color: '#F04452',
    screen: { type: 'mockup', name: 'fomobot' },
  },
  {
    slug: 'recall-check',
    name: '리콜체크',
    tagline: '리콜 대상인지 바로 확인하는 토스 미니앱.',
    category: 'Toss Mini App',
    since: '2026.10',
    status: 'live',
    links: [
      { kind: 'toss', href: 'https://tossminiapp.com/s/738X1L98' },
      { kind: 'github', href: 'https://github.com/yj9404/toss-recall-check' },
    ],
    color: '#3182F6',
    screen: { type: 'mockup', name: 'recall-check' },
  },
  {
    slug: 'salary-check',
    name: '연봉체크',
    tagline: '궁금한 회사의 추정 연봉과 퇴사율을 찾아보는 토스 미니앱.',
    category: 'Toss Mini App',
    since: '2026.10',
    status: 'live',
    links: [
      { kind: 'toss', href: 'https://tossminiapp.com/s/bYVSn4Lm' },
      { kind: 'github', href: 'https://github.com/yj9404/toss-salary-check' },
    ],
    // 연봉체크 --brand-primary-weak
    color: '#EEF2FD',
    screen: { type: 'mockup', name: 'salary-check' },
  },
  {
    slug: 'quiz',
    name: '퀴즈',
    tagline: '휴대폰으로 QR 찍고 다 같이 푸는 실시간 퀴즈.',
    category: 'Web',
    since: '2026.10',
    status: 'live',
    links: [
      { kind: 'site', href: 'https://quiz.0jin.app' },
      { kind: 'github', href: 'https://github.com/yj9404/quiz' },
    ],
    // 퀴즈 --gold(버터)
    color: '#FFC94D',
    ink: '#4A3426',
    screen: { type: 'mockup', name: 'quiz' },
  },
  {
    slug: 'home-tender',
    name: 'HomeTender',
    tagline: '홈파티 손님이 링크로 들어와 칵테일을 주문하는 서비스.',
    category: 'Web',
    since: '2026.02',
    status: 'live',
    links: [
      { kind: 'site', href: 'https://home-tender.vercel.app' },
      { kind: 'github', href: 'https://github.com/yj9404/home-tender' },
    ],
    // HomeTender --color-primary
    color: '#F43F5E',
    screen: { type: 'mockup', name: 'home-tender' },
  },
  {
    slug: 'two-degrees',
    name: '투디그리',
    tagline: '지인의 지인까지만 연결하는 소개팅 주선 서비스.',
    category: 'Web',
    since: '2026.03',
    until: '2026.08',
    status: 'archived',
    links: [
      // 지금은 종료 안내 화면. 나중에 완전히 닫을 수 있다.
      { kind: 'site', href: 'https://two-degrees.vercel.app' },
      { kind: 'github', href: 'https://github.com/yj9404/two-degrees' },
    ],
    color: '#2563EB',
    screen: { type: 'mockup', name: 'two-degrees' },
  },
  {
    slug: 'korean-trip-planner',
    name: 'Korea Trip Planner',
    tagline: '한국인·외국인 가족이 함께 쓰는 한국 여행 도우미.',
    category: 'Web',
    since: '2026.02',
    until: '2026.03',
    status: 'archived',
    links: [
      // 서버를 내린 상태
      { kind: 'site', href: 'https://korean-trip-planner.firebaseapp.com' },
      { kind: 'github', href: 'https://github.com/yj9404/korean-trip-planner' },
    ],
    color: '#6366F1',
    screen: { type: 'mockup', name: 'korean-trip-planner' },
  },
];
