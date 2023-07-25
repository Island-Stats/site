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
};

module.exports = nextConfig;
