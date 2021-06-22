export const format = (time) => {
	let date = new Date(time)
	var h = date.getHours()
	var mm = date.getMinutes()
	var d = date.getDate()
	var m = date.getMonth() + 1
	var y = date.getFullYear()

	return (h <= 9 ? '0' + h : h) + ':' + (mm <= 9 ? '0' + mm : mm) + ' ' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y
}