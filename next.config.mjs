/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URLAPIPOKEMONALL: process.env.URLAPIPOKEMONALL,
        URLAPIPOKEMONTYPE: process.env.URLAPIPOKEMONTYPE,
      },
};

export default nextConfig;
