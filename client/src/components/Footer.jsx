import React from 'react';

const Footer = () => {
	const links = [
		{ name: 'Code Source', link: 'https://github.com/zeepk/medikeeper-app' },
		{ name: 'Copyright Info', link: '/' },
		{ name: 'Contact Us', link: '/' },
		{ name: 'Copyright Info', link: '/' },
		{ name: 'Contact Us', link: '/' },
	];
	return (
		<div
			className="p-grid"
			style={{
				textAlign: 'left',
				backgroundColor: '#6b6b6b',
				margin: 0,
				padding: '0 5vw 2vh 5vw',
				fontSize: '.9rem',
				position: 'absolute',
				bottom: 0,
				width: '100vw',
			}}
		>
			{links.map((footerItem) => (
				<div key={footerItem} className="p-md-2 p-col-12">
					<a
						href={footerItem.link}
						className="footer-link"
						style={{ color: 'white' }}
					>
						{footerItem.name}
					</a>
				</div>
			))}

			<div className="p-col"></div>
		</div>
	);
};

export default Footer;
