import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

const yoon310 = localFont({
  src: '../public/fonts/YDIYGO310.woff2',
  display: 'swap',
});

const title = '더와이 컨설팅 - The Why Consulting';

export const metadata: Metadata = {
  title,
  description:
    '더와이컨설팅은 개인과 조직의 행복한 관계를 꿈꾸는 커뮤니케이션 교육 전문기업입니다.',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://thewhy.kr',
    title,
    siteName: 'The Y Consulting',
    images: ['/images/main-logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={yoon310.className}>{children}</body>
    </html>
  );
}
