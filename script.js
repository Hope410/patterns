new Vue({
	el: '#app',
	data: {
		map: null,
		pattern: new Pattern(128, 128),
		mapConfig: { width: 512, height: 512, groupType: 'p1' },
		groupTypes: [
			'p1',
			'pg',
			'pm',
			'cm',
			'p2',
			'pgg',
			'pmm'
		]
	},
	watch: {
		mapConfig: {
			handler(config) {
				console.log('change')
				this.map = new PatternMap(this.pattern, config);
			},
			deep: true
		}
	},
	mounted() {
		this.map = new PatternMap(this.pattern, this.mapConfig);
	}
})