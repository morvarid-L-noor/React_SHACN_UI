import { Card, CardContent } from '@/components/ui/card';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  subTitle: string;
  icon: ReactNode;
};

const SettingCard = ({ icon, subTitle, title }: Props) => {
  return (
    <Card className="h-full bg-card-primary-gradient">
      <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
        <div className="rounded-full text-primary">{icon}</div>
        <p className="text-xl text-primary">{title}</p>
        <p className="text-sm text-gray-400">{subTitle}</p>
      </CardContent>
    </Card>
  );
};

export default SettingCard;

// box-shadow: 0px 0px 15px 0px #0000001A;
