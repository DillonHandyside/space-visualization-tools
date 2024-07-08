import { ReactNode } from 'react';
import './LeftPanel.css';

interface LeftPanelProps {
	children: ReactNode;
}

const LeftPanel = ({ children }: LeftPanelProps) => {
	return <div className="left-panel">{children}</div>;
};

export default LeftPanel;
