import { ReactNode } from 'react';

interface IProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const InfoBox = ({ title, value, icon }: IProps) => {
  return (
    <div className='bg-card rounded-xl relative p-3 pr-16 overflow-hidden'>
      <div className='text-sm mb-1'>{title}</div>
      <div className='font-semibold'>{value}</div>
      {icon}
    </div>
  );
};

export default InfoBox;
