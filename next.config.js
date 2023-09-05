/** @type {import('next').NextConfig} */
const nextConfig = {
	headers: async () => {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: "Referrer-Policy",
						value: "origin-when-cross-origin",
					},
				],
			},
		];
	},
	images: {
		domains: ['crafatar.com'],
	},
	output: 'standalone',
};

module.exports = nextConfig;
