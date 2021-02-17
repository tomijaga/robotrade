const mod = (n, m) => ((n % m) + m) % m;

const getETHours = (time) => mod(time.getUTCHours() - 5, 24);

export default getETHours;
