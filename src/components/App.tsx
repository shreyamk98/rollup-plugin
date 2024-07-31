import React from 'react';

const App: React.FC = () => {
	const [count, setCount] = React.useState(0);
	return (
		<div>
			<h1>Hello, Vite with React and TypeScript!</h1>
			<Button count={count} setCount={setCount} />
		</div>
	);
};

function Button({ count, setCount }: { count: number; setCount: (v: number) => void }) {
	return <button onClick={() => setCount(count + 1)}>count is {count}</button>;
}

// const Button: React.FC<{ count: number; setCount: (v: number) => void }> = ({ count, setCount }) => {
// 	return <button onClick={() => setCount(count + 1)}>count is {count}</button>;
// };

export default App;
