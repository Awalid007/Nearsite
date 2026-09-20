import React from 'react';
import { BookingModal } from './BookingModal';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlan?: string;
  prefilledBusiness?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = (props) => {
  return <BookingModal {...props} />;
};

export { BookingModal };
