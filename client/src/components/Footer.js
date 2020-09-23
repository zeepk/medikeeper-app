import React from 'react';
import Logo from '../assets/images/logo.png';

const Footer = () => {
	const links = [
		{
			header: 'Project',
			links: [
				{
					name: 'Source Code',
					url: 'https://github.com/zeepk/medikeeper-app',
				},
				{
					name: 'Documentation',
					url: 'https://github.com/zeepk/medikeeper-app/blob/master/README.md',
				},
				{
					name: 'Hosting',
					url: 'https://dashboard.heroku.com/apps',
				},
			],
		},
		{
			header: 'About Me',
			links: [
				{
					name: 'Portfolio',
					url: 'https://matthughes.dev/',
				},
				{
					name: 'Github',
					url: 'https://github.com/zeepk',
				},
				{
					name: 'Twitch',
					url: 'https://www.twitch.tv/zee_pk',
				},
				{
					name: 'Linkedin',
					url: 'https://www.linkedin.com/in/matthughes-dev/',
				},
				{
					name: 'Twitter',
					url: 'https://twitter.com/matthughes2112',
				},
			],
		},
		{
			header: 'About',
			links: [
				{
					name: 'Our Team',
					url: '/',
				},
				{
					name: 'Mission Statement',
					url: '/',
				},
				{
					name: 'Careers',
					url: '/',
				},
				{
					name: 'Contact Us',
					url: '/',
				},
				{
					name: 'Copyright',
					url: '/',
				},
			],
		},
	];
	return (
		<div
			className="p-grid"
			style={{
				textAlign: 'center',
				backgroundColor: 'BLACK',
				margin: 0,
				padding: '0 20vw 2vh 20vw',
				fontSize: '.9rem',
				position: 'absolute',
				bottom: 0,
				width: '100%',
			}}
		>
			<div className="p-md-3 p-col-12">
				<img
					alt="logo"
					src={Logo}
					style={{ width: '50%', display: 'block', margin: '0 auto' }}
				></img>
			</div>
			{links.map((footerItem) => (
				<div key={footerItem.header} className="p-md-3 p-col-6">
					<p style={{ color: 'white', fontSize: '1.2rem' }}>
						{footerItem.header}
					</p>
					<div>
						{footerItem.links.map((link) => (
							<div style={{ margin: '5px 0' }} key={link.name}>
								<a
									href={link.url}
									className="footer-link"
									style={{ color: 'var(--font-color)' }}
								>
									{link.name}
								</a>
							</div>
						))}
					</div>
				</div>
			))}

			<div className="p-col"></div>
		</div>
	);
};

export default Footer;
