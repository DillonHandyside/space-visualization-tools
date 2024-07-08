import './HoverLabel.css';

interface LabelProps {
	x: number;
	y: number;
	name: string;
}

const HoverLabel = ({ x, y, name }: LabelProps) => {
	return (
		<div className="hover-label" style={{ left: x, top: y }}>
			{name}
		</div>
	);
};

export default HoverLabel;
