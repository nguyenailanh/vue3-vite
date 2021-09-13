;(window.webpackJsonp = window.webpackJsonp || []).push([
	[6],
	{
		884: function (module, exports, __webpack_require__) {
			const cssKeywords = __webpack_require__(936),
				reverseKeywords = {}
			for (const key of Object.keys(cssKeywords))
				reverseKeywords[cssKeywords[key]] = key
			const convert = {
				rgb: { channels: 3, labels: 'rgb' },
				hsl: { channels: 3, labels: 'hsl' },
				hsv: { channels: 3, labels: 'hsv' },
				hwb: { channels: 3, labels: 'hwb' },
				cmyk: { channels: 4, labels: 'cmyk' },
				xyz: { channels: 3, labels: 'xyz' },
				lab: { channels: 3, labels: 'lab' },
				lch: { channels: 3, labels: 'lch' },
				hex: { channels: 1, labels: ['hex'] },
				keyword: { channels: 1, labels: ['keyword'] },
				ansi16: { channels: 1, labels: ['ansi16'] },
				ansi256: { channels: 1, labels: ['ansi256'] },
				hcg: { channels: 3, labels: ['h', 'c', 'g'] },
				apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
				gray: { channels: 1, labels: ['gray'] },
			}
			module.exports = convert
			for (const model of Object.keys(convert)) {
				if (!('channels' in convert[model]))
					throw new Error('missing channels property: ' + model)
				if (!('labels' in convert[model]))
					throw new Error('missing channel labels property: ' + model)
				if (convert[model].labels.length !== convert[model].channels)
					throw new Error('channel and label counts mismatch: ' + model)
				const { channels: channels, labels: labels } = convert[model]
				delete convert[model].channels,
					delete convert[model].labels,
					Object.defineProperty(convert[model], 'channels', {
						value: channels,
					}),
					Object.defineProperty(convert[model], 'labels', { value: labels })
			}
			;(convert.rgb.hsl = function (rgb) {
				const r = rgb[0] / 255,
					g = rgb[1] / 255,
					b = rgb[2] / 255,
					min = Math.min(r, g, b),
					max = Math.max(r, g, b),
					delta = max - min
				let h, s
				max === min
					? (h = 0)
					: r === max
					? (h = (g - b) / delta)
					: g === max
					? (h = 2 + (b - r) / delta)
					: b === max && (h = 4 + (r - g) / delta),
					(h = Math.min(60 * h, 360)),
					h < 0 && (h += 360)
				const l = (min + max) / 2
				return (
					(s =
						max === min
							? 0
							: l <= 0.5
							? delta / (max + min)
							: delta / (2 - max - min)),
					[h, 100 * s, 100 * l]
				)
			}),
				(convert.rgb.hsv = function (rgb) {
					let rdif, gdif, bdif, h, s
					const r = rgb[0] / 255,
						g = rgb[1] / 255,
						b = rgb[2] / 255,
						v = Math.max(r, g, b),
						diff = v - Math.min(r, g, b),
						diffc = function (c) {
							return (v - c) / 6 / diff + 0.5
						}
					return (
						0 === diff
							? ((h = 0), (s = 0))
							: ((s = diff / v),
							  (rdif = diffc(r)),
							  (gdif = diffc(g)),
							  (bdif = diffc(b)),
							  r === v
									? (h = bdif - gdif)
									: g === v
									? (h = 1 / 3 + rdif - bdif)
									: b === v && (h = 2 / 3 + gdif - rdif),
							  h < 0 ? (h += 1) : h > 1 && (h -= 1)),
						[360 * h, 100 * s, 100 * v]
					)
				}),
				(convert.rgb.hwb = function (rgb) {
					const r = rgb[0],
						g = rgb[1]
					let b = rgb[2]
					const h = convert.rgb.hsl(rgb)[0],
						w = (1 / 255) * Math.min(r, Math.min(g, b))
					return (
						(b = 1 - (1 / 255) * Math.max(r, Math.max(g, b))),
						[h, 100 * w, 100 * b]
					)
				}),
				(convert.rgb.cmyk = function (rgb) {
					const r = rgb[0] / 255,
						g = rgb[1] / 255,
						b = rgb[2] / 255,
						k = Math.min(1 - r, 1 - g, 1 - b)
					return [
						100 * ((1 - r - k) / (1 - k) || 0),
						100 * ((1 - g - k) / (1 - k) || 0),
						100 * ((1 - b - k) / (1 - k) || 0),
						100 * k,
					]
				}),
				(convert.rgb.keyword = function (rgb) {
					const reversed = reverseKeywords[rgb]
					if (reversed) return reversed
					let currentClosestKeyword,
						currentClosestDistance = 1 / 0
					for (const keyword of Object.keys(cssKeywords)) {
						const value = cssKeywords[keyword],
							distance =
								((y = value),
								((x = rgb)[0] - y[0]) ** 2 +
									(x[1] - y[1]) ** 2 +
									(x[2] - y[2]) ** 2)
						distance < currentClosestDistance &&
							((currentClosestDistance = distance),
							(currentClosestKeyword = keyword))
					}
					var x, y
					return currentClosestKeyword
				}),
				(convert.keyword.rgb = function (keyword) {
					return cssKeywords[keyword]
				}),
				(convert.rgb.xyz = function (rgb) {
					let r = rgb[0] / 255,
						g = rgb[1] / 255,
						b = rgb[2] / 255
					;(r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92),
						(g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92),
						(b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92)
					return [
						100 * (0.4124 * r + 0.3576 * g + 0.1805 * b),
						100 * (0.2126 * r + 0.7152 * g + 0.0722 * b),
						100 * (0.0193 * r + 0.1192 * g + 0.9505 * b),
					]
				}),
				(convert.rgb.lab = function (rgb) {
					const xyz = convert.rgb.xyz(rgb)
					let x = xyz[0],
						y = xyz[1],
						z = xyz[2]
					;(x /= 95.047),
						(y /= 100),
						(z /= 108.883),
						(x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116),
						(y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116),
						(z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116)
					return [116 * y - 16, 500 * (x - y), 200 * (y - z)]
				}),
				(convert.hsl.rgb = function (hsl) {
					const h = hsl[0] / 360,
						s = hsl[1] / 100,
						l = hsl[2] / 100
					let t2, t3, val
					if (0 === s) return (val = 255 * l), [val, val, val]
					t2 = l < 0.5 ? l * (1 + s) : l + s - l * s
					const t1 = 2 * l - t2,
						rgb = [0, 0, 0]
					for (let i = 0; i < 3; i++)
						(t3 = h + (1 / 3) * -(i - 1)),
							t3 < 0 && t3++,
							t3 > 1 && t3--,
							(val =
								6 * t3 < 1
									? t1 + 6 * (t2 - t1) * t3
									: 2 * t3 < 1
									? t2
									: 3 * t3 < 2
									? t1 + (t2 - t1) * (2 / 3 - t3) * 6
									: t1),
							(rgb[i] = 255 * val)
					return rgb
				}),
				(convert.hsl.hsv = function (hsl) {
					const h = hsl[0]
					let s = hsl[1] / 100,
						l = hsl[2] / 100,
						smin = s
					const lmin = Math.max(l, 0.01)
					;(l *= 2),
						(s *= l <= 1 ? l : 2 - l),
						(smin *= lmin <= 1 ? lmin : 2 - lmin)
					return [
						h,
						100 * (0 === l ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s)),
						100 * ((l + s) / 2),
					]
				}),
				(convert.hsv.rgb = function (hsv) {
					const h = hsv[0] / 60,
						s = hsv[1] / 100
					let v = hsv[2] / 100
					const hi = Math.floor(h) % 6,
						f = h - Math.floor(h),
						p = 255 * v * (1 - s),
						q = 255 * v * (1 - s * f),
						t = 255 * v * (1 - s * (1 - f))
					switch (((v *= 255), hi)) {
						case 0:
							return [v, t, p]
						case 1:
							return [q, v, p]
						case 2:
							return [p, v, t]
						case 3:
							return [p, q, v]
						case 4:
							return [t, p, v]
						case 5:
							return [v, p, q]
					}
				}),
				(convert.hsv.hsl = function (hsv) {
					const h = hsv[0],
						s = hsv[1] / 100,
						v = hsv[2] / 100,
						vmin = Math.max(v, 0.01)
					let sl, l
					l = (2 - s) * v
					const lmin = (2 - s) * vmin
					return (
						(sl = s * vmin),
						(sl /= lmin <= 1 ? lmin : 2 - lmin),
						(sl = sl || 0),
						(l /= 2),
						[h, 100 * sl, 100 * l]
					)
				}),
				(convert.hwb.rgb = function (hwb) {
					const h = hwb[0] / 360
					let wh = hwb[1] / 100,
						bl = hwb[2] / 100
					const ratio = wh + bl
					let f
					ratio > 1 && ((wh /= ratio), (bl /= ratio))
					const i = Math.floor(6 * h),
						v = 1 - bl
					;(f = 6 * h - i), 0 != (1 & i) && (f = 1 - f)
					const n = wh + f * (v - wh)
					let r, g, b
					switch (i) {
						default:
						case 6:
						case 0:
							;(r = v), (g = n), (b = wh)
							break
						case 1:
							;(r = n), (g = v), (b = wh)
							break
						case 2:
							;(r = wh), (g = v), (b = n)
							break
						case 3:
							;(r = wh), (g = n), (b = v)
							break
						case 4:
							;(r = n), (g = wh), (b = v)
							break
						case 5:
							;(r = v), (g = wh), (b = n)
					}
					return [255 * r, 255 * g, 255 * b]
				}),
				(convert.cmyk.rgb = function (cmyk) {
					const c = cmyk[0] / 100,
						m = cmyk[1] / 100,
						y = cmyk[2] / 100,
						k = cmyk[3] / 100
					return [
						255 * (1 - Math.min(1, c * (1 - k) + k)),
						255 * (1 - Math.min(1, m * (1 - k) + k)),
						255 * (1 - Math.min(1, y * (1 - k) + k)),
					]
				}),
				(convert.xyz.rgb = function (xyz) {
					const x = xyz[0] / 100,
						y = xyz[1] / 100,
						z = xyz[2] / 100
					let r, g, b
					return (
						(r = 3.2406 * x + -1.5372 * y + -0.4986 * z),
						(g = -0.9689 * x + 1.8758 * y + 0.0415 * z),
						(b = 0.0557 * x + -0.204 * y + 1.057 * z),
						(r = r > 0.0031308 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r),
						(g = g > 0.0031308 ? 1.055 * g ** (1 / 2.4) - 0.055 : 12.92 * g),
						(b = b > 0.0031308 ? 1.055 * b ** (1 / 2.4) - 0.055 : 12.92 * b),
						(r = Math.min(Math.max(0, r), 1)),
						(g = Math.min(Math.max(0, g), 1)),
						(b = Math.min(Math.max(0, b), 1)),
						[255 * r, 255 * g, 255 * b]
					)
				}),
				(convert.xyz.lab = function (xyz) {
					let x = xyz[0],
						y = xyz[1],
						z = xyz[2]
					;(x /= 95.047),
						(y /= 100),
						(z /= 108.883),
						(x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116),
						(y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116),
						(z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116)
					return [116 * y - 16, 500 * (x - y), 200 * (y - z)]
				}),
				(convert.lab.xyz = function (lab) {
					let x, y, z
					;(y = (lab[0] + 16) / 116),
						(x = lab[1] / 500 + y),
						(z = y - lab[2] / 200)
					const y2 = y ** 3,
						x2 = x ** 3,
						z2 = z ** 3
					return (
						(y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787),
						(x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787),
						(z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787),
						(x *= 95.047),
						(y *= 100),
						(z *= 108.883),
						[x, y, z]
					)
				}),
				(convert.lab.lch = function (lab) {
					const l = lab[0],
						a = lab[1],
						b = lab[2]
					let h
					;(h = (360 * Math.atan2(b, a)) / 2 / Math.PI), h < 0 && (h += 360)
					return [l, Math.sqrt(a * a + b * b), h]
				}),
				(convert.lch.lab = function (lch) {
					const l = lch[0],
						c = lch[1],
						hr = (lch[2] / 360) * 2 * Math.PI
					return [l, c * Math.cos(hr), c * Math.sin(hr)]
				}),
				(convert.rgb.ansi16 = function (args, saturation = null) {
					const [r, g, b] = args
					let value =
						null === saturation ? convert.rgb.hsv(args)[2] : saturation
					if (((value = Math.round(value / 50)), 0 === value)) return 30
					let ansi =
						30 +
						((Math.round(b / 255) << 2) |
							(Math.round(g / 255) << 1) |
							Math.round(r / 255))
					return 2 === value && (ansi += 60), ansi
				}),
				(convert.hsv.ansi16 = function (args) {
					return convert.rgb.ansi16(convert.hsv.rgb(args), args[2])
				}),
				(convert.rgb.ansi256 = function (args) {
					const r = args[0],
						g = args[1],
						b = args[2]
					if (r === g && g === b)
						return r < 8
							? 16
							: r > 248
							? 231
							: Math.round(((r - 8) / 247) * 24) + 232
					return (
						16 +
						36 * Math.round((r / 255) * 5) +
						6 * Math.round((g / 255) * 5) +
						Math.round((b / 255) * 5)
					)
				}),
				(convert.ansi16.rgb = function (args) {
					let color = args % 10
					if (0 === color || 7 === color)
						return (
							args > 50 && (color += 3.5),
							(color = (color / 10.5) * 255),
							[color, color, color]
						)
					const mult = 0.5 * (1 + ~~(args > 50))
					return [
						(1 & color) * mult * 255,
						((color >> 1) & 1) * mult * 255,
						((color >> 2) & 1) * mult * 255,
					]
				}),
				(convert.ansi256.rgb = function (args) {
					if (args >= 232) {
						const c = 10 * (args - 232) + 8
						return [c, c, c]
					}
					let rem
					args -= 16
					return [
						(Math.floor(args / 36) / 5) * 255,
						(Math.floor((rem = args % 36) / 6) / 5) * 255,
						((rem % 6) / 5) * 255,
					]
				}),
				(convert.rgb.hex = function (args) {
					const string = (
						((255 & Math.round(args[0])) << 16) +
						((255 & Math.round(args[1])) << 8) +
						(255 & Math.round(args[2]))
					)
						.toString(16)
						.toUpperCase()
					return '000000'.substring(string.length) + string
				}),
				(convert.hex.rgb = function (args) {
					const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i)
					if (!match) return [0, 0, 0]
					let colorString = match[0]
					3 === match[0].length &&
						(colorString = colorString
							.split('')
							.map((char) => char + char)
							.join(''))
					const integer = parseInt(colorString, 16)
					return [(integer >> 16) & 255, (integer >> 8) & 255, 255 & integer]
				}),
				(convert.rgb.hcg = function (rgb) {
					const r = rgb[0] / 255,
						g = rgb[1] / 255,
						b = rgb[2] / 255,
						max = Math.max(Math.max(r, g), b),
						min = Math.min(Math.min(r, g), b),
						chroma = max - min
					let grayscale, hue
					return (
						(grayscale = chroma < 1 ? min / (1 - chroma) : 0),
						(hue =
							chroma <= 0
								? 0
								: max === r
								? ((g - b) / chroma) % 6
								: max === g
								? 2 + (b - r) / chroma
								: 4 + (r - g) / chroma),
						(hue /= 6),
						(hue %= 1),
						[360 * hue, 100 * chroma, 100 * grayscale]
					)
				}),
				(convert.hsl.hcg = function (hsl) {
					const s = hsl[1] / 100,
						l = hsl[2] / 100,
						c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l)
					let f = 0
					return (
						c < 1 && (f = (l - 0.5 * c) / (1 - c)), [hsl[0], 100 * c, 100 * f]
					)
				}),
				(convert.hsv.hcg = function (hsv) {
					const s = hsv[1] / 100,
						v = hsv[2] / 100,
						c = s * v
					let f = 0
					return c < 1 && (f = (v - c) / (1 - c)), [hsv[0], 100 * c, 100 * f]
				}),
				(convert.hcg.rgb = function (hcg) {
					const h = hcg[0] / 360,
						c = hcg[1] / 100,
						g = hcg[2] / 100
					if (0 === c) return [255 * g, 255 * g, 255 * g]
					const pure = [0, 0, 0],
						hi = (h % 1) * 6,
						v = hi % 1,
						w = 1 - v
					let mg = 0
					switch (Math.floor(hi)) {
						case 0:
							;(pure[0] = 1), (pure[1] = v), (pure[2] = 0)
							break
						case 1:
							;(pure[0] = w), (pure[1] = 1), (pure[2] = 0)
							break
						case 2:
							;(pure[0] = 0), (pure[1] = 1), (pure[2] = v)
							break
						case 3:
							;(pure[0] = 0), (pure[1] = w), (pure[2] = 1)
							break
						case 4:
							;(pure[0] = v), (pure[1] = 0), (pure[2] = 1)
							break
						default:
							;(pure[0] = 1), (pure[1] = 0), (pure[2] = w)
					}
					return (
						(mg = (1 - c) * g),
						[
							255 * (c * pure[0] + mg),
							255 * (c * pure[1] + mg),
							255 * (c * pure[2] + mg),
						]
					)
				}),
				(convert.hcg.hsv = function (hcg) {
					const c = hcg[1] / 100,
						v = c + (hcg[2] / 100) * (1 - c)
					let f = 0
					return v > 0 && (f = c / v), [hcg[0], 100 * f, 100 * v]
				}),
				(convert.hcg.hsl = function (hcg) {
					const c = hcg[1] / 100,
						l = (hcg[2] / 100) * (1 - c) + 0.5 * c
					let s = 0
					return (
						l > 0 && l < 0.5
							? (s = c / (2 * l))
							: l >= 0.5 && l < 1 && (s = c / (2 * (1 - l))),
						[hcg[0], 100 * s, 100 * l]
					)
				}),
				(convert.hcg.hwb = function (hcg) {
					const c = hcg[1] / 100,
						v = c + (hcg[2] / 100) * (1 - c)
					return [hcg[0], 100 * (v - c), 100 * (1 - v)]
				}),
				(convert.hwb.hcg = function (hwb) {
					const w = hwb[1] / 100,
						v = 1 - hwb[2] / 100,
						c = v - w
					let g = 0
					return c < 1 && (g = (v - c) / (1 - c)), [hwb[0], 100 * c, 100 * g]
				}),
				(convert.apple.rgb = function (apple) {
					return [
						(apple[0] / 65535) * 255,
						(apple[1] / 65535) * 255,
						(apple[2] / 65535) * 255,
					]
				}),
				(convert.rgb.apple = function (rgb) {
					return [
						(rgb[0] / 255) * 65535,
						(rgb[1] / 255) * 65535,
						(rgb[2] / 255) * 65535,
					]
				}),
				(convert.gray.rgb = function (args) {
					return [
						(args[0] / 100) * 255,
						(args[0] / 100) * 255,
						(args[0] / 100) * 255,
					]
				}),
				(convert.gray.hsl = function (args) {
					return [0, 0, args[0]]
				}),
				(convert.gray.hsv = convert.gray.hsl),
				(convert.gray.hwb = function (gray) {
					return [0, 100, gray[0]]
				}),
				(convert.gray.cmyk = function (gray) {
					return [0, 0, 0, gray[0]]
				}),
				(convert.gray.lab = function (gray) {
					return [gray[0], 0, 0]
				}),
				(convert.gray.hex = function (gray) {
					const val = 255 & Math.round((gray[0] / 100) * 255),
						string = ((val << 16) + (val << 8) + val).toString(16).toUpperCase()
					return '000000'.substring(string.length) + string
				}),
				(convert.rgb.gray = function (rgb) {
					return [((rgb[0] + rgb[1] + rgb[2]) / 3 / 255) * 100]
				})
		},
		935: function (module, exports, __webpack_require__) {
			const conversions = __webpack_require__(884),
				route = __webpack_require__(937),
				convert = {}
			Object.keys(conversions).forEach((fromModel) => {
				;(convert[fromModel] = {}),
					Object.defineProperty(convert[fromModel], 'channels', {
						value: conversions[fromModel].channels,
					}),
					Object.defineProperty(convert[fromModel], 'labels', {
						value: conversions[fromModel].labels,
					})
				const routes = route(fromModel)
				Object.keys(routes).forEach((toModel) => {
					const fn = routes[toModel]
					;(convert[fromModel][toModel] = (function wrapRounded(fn) {
						const wrappedFn = function (...args) {
							const arg0 = args[0]
							if (null == arg0) return arg0
							arg0.length > 1 && (args = arg0)
							const result = fn(args)
							if ('object' == typeof result)
								for (let len = result.length, i = 0; i < len; i++)
									result[i] = Math.round(result[i])
							return result
						}
						return (
							'conversion' in fn && (wrappedFn.conversion = fn.conversion),
							wrappedFn
						)
					})(fn)),
						(convert[fromModel][toModel].raw = (function wrapRaw(fn) {
							const wrappedFn = function (...args) {
								const arg0 = args[0]
								return null == arg0
									? arg0
									: (arg0.length > 1 && (args = arg0), fn(args))
							}
							return (
								'conversion' in fn && (wrappedFn.conversion = fn.conversion),
								wrappedFn
							)
						})(fn))
				})
			}),
				(module.exports = convert)
		},
		936: function (module, exports, __webpack_require__) {
			'use strict'
			module.exports = {
				aliceblue: [240, 248, 255],
				antiquewhite: [250, 235, 215],
				aqua: [0, 255, 255],
				aquamarine: [127, 255, 212],
				azure: [240, 255, 255],
				beige: [245, 245, 220],
				bisque: [255, 228, 196],
				black: [0, 0, 0],
				blanchedalmond: [255, 235, 205],
				blue: [0, 0, 255],
				blueviolet: [138, 43, 226],
				brown: [165, 42, 42],
				burlywood: [222, 184, 135],
				cadetblue: [95, 158, 160],
				chartreuse: [127, 255, 0],
				chocolate: [210, 105, 30],
				coral: [255, 127, 80],
				cornflowerblue: [100, 149, 237],
				cornsilk: [255, 248, 220],
				crimson: [220, 20, 60],
				cyan: [0, 255, 255],
				darkblue: [0, 0, 139],
				darkcyan: [0, 139, 139],
				darkgoldenrod: [184, 134, 11],
				darkgray: [169, 169, 169],
				darkgreen: [0, 100, 0],
				darkgrey: [169, 169, 169],
				darkkhaki: [189, 183, 107],
				darkmagenta: [139, 0, 139],
				darkolivegreen: [85, 107, 47],
				darkorange: [255, 140, 0],
				darkorchid: [153, 50, 204],
				darkred: [139, 0, 0],
				darksalmon: [233, 150, 122],
				darkseagreen: [143, 188, 143],
				darkslateblue: [72, 61, 139],
				darkslategray: [47, 79, 79],
				darkslategrey: [47, 79, 79],
				darkturquoise: [0, 206, 209],
				darkviolet: [148, 0, 211],
				deeppink: [255, 20, 147],
				deepskyblue: [0, 191, 255],
				dimgray: [105, 105, 105],
				dimgrey: [105, 105, 105],
				dodgerblue: [30, 144, 255],
				firebrick: [178, 34, 34],
				floralwhite: [255, 250, 240],
				forestgreen: [34, 139, 34],
				fuchsia: [255, 0, 255],
				gainsboro: [220, 220, 220],
				ghostwhite: [248, 248, 255],
				gold: [255, 215, 0],
				goldenrod: [218, 165, 32],
				gray: [128, 128, 128],
				green: [0, 128, 0],
				greenyellow: [173, 255, 47],
				grey: [128, 128, 128],
				honeydew: [240, 255, 240],
				hotpink: [255, 105, 180],
				indianred: [205, 92, 92],
				indigo: [75, 0, 130],
				ivory: [255, 255, 240],
				khaki: [240, 230, 140],
				lavender: [230, 230, 250],
				lavenderblush: [255, 240, 245],
				lawngreen: [124, 252, 0],
				lemonchiffon: [255, 250, 205],
				lightblue: [173, 216, 230],
				lightcoral: [240, 128, 128],
				lightcyan: [224, 255, 255],
				lightgoldenrodyellow: [250, 250, 210],
				lightgray: [211, 211, 211],
				lightgreen: [144, 238, 144],
				lightgrey: [211, 211, 211],
				lightpink: [255, 182, 193],
				lightsalmon: [255, 160, 122],
				lightseagreen: [32, 178, 170],
				lightskyblue: [135, 206, 250],
				lightslategray: [119, 136, 153],
				lightslategrey: [119, 136, 153],
				lightsteelblue: [176, 196, 222],
				lightyellow: [255, 255, 224],
				lime: [0, 255, 0],
				limegreen: [50, 205, 50],
				linen: [250, 240, 230],
				magenta: [255, 0, 255],
				maroon: [128, 0, 0],
				mediumaquamarine: [102, 205, 170],
				mediumblue: [0, 0, 205],
				mediumorchid: [186, 85, 211],
				mediumpurple: [147, 112, 219],
				mediumseagreen: [60, 179, 113],
				mediumslateblue: [123, 104, 238],
				mediumspringgreen: [0, 250, 154],
				mediumturquoise: [72, 209, 204],
				mediumvioletred: [199, 21, 133],
				midnightblue: [25, 25, 112],
				mintcream: [245, 255, 250],
				mistyrose: [255, 228, 225],
				moccasin: [255, 228, 181],
				navajowhite: [255, 222, 173],
				navy: [0, 0, 128],
				oldlace: [253, 245, 230],
				olive: [128, 128, 0],
				olivedrab: [107, 142, 35],
				orange: [255, 165, 0],
				orangered: [255, 69, 0],
				orchid: [218, 112, 214],
				palegoldenrod: [238, 232, 170],
				palegreen: [152, 251, 152],
				paleturquoise: [175, 238, 238],
				palevioletred: [219, 112, 147],
				papayawhip: [255, 239, 213],
				peachpuff: [255, 218, 185],
				peru: [205, 133, 63],
				pink: [255, 192, 203],
				plum: [221, 160, 221],
				powderblue: [176, 224, 230],
				purple: [128, 0, 128],
				rebeccapurple: [102, 51, 153],
				red: [255, 0, 0],
				rosybrown: [188, 143, 143],
				royalblue: [65, 105, 225],
				saddlebrown: [139, 69, 19],
				salmon: [250, 128, 114],
				sandybrown: [244, 164, 96],
				seagreen: [46, 139, 87],
				seashell: [255, 245, 238],
				sienna: [160, 82, 45],
				silver: [192, 192, 192],
				skyblue: [135, 206, 235],
				slateblue: [106, 90, 205],
				slategray: [112, 128, 144],
				slategrey: [112, 128, 144],
				snow: [255, 250, 250],
				springgreen: [0, 255, 127],
				steelblue: [70, 130, 180],
				tan: [210, 180, 140],
				teal: [0, 128, 128],
				thistle: [216, 191, 216],
				tomato: [255, 99, 71],
				turquoise: [64, 224, 208],
				violet: [238, 130, 238],
				wheat: [245, 222, 179],
				white: [255, 255, 255],
				whitesmoke: [245, 245, 245],
				yellow: [255, 255, 0],
				yellowgreen: [154, 205, 50],
			}
		},
		937: function (module, exports, __webpack_require__) {
			const conversions = __webpack_require__(884)
			function deriveBFS(fromModel) {
				const graph = (function buildGraph() {
						const graph = {},
							models = Object.keys(conversions)
						for (let len = models.length, i = 0; i < len; i++)
							graph[models[i]] = { distance: -1, parent: null }
						return graph
					})(),
					queue = [fromModel]
				for (graph[fromModel].distance = 0; queue.length; ) {
					const current = queue.pop(),
						adjacents = Object.keys(conversions[current])
					for (let len = adjacents.length, i = 0; i < len; i++) {
						const adjacent = adjacents[i],
							node = graph[adjacent]
						;-1 === node.distance &&
							((node.distance = graph[current].distance + 1),
							(node.parent = current),
							queue.unshift(adjacent))
					}
				}
				return graph
			}
			function link(from, to) {
				return function (args) {
					return to(from(args))
				}
			}
			function wrapConversion(toModel, graph) {
				const path = [graph[toModel].parent, toModel]
				let fn = conversions[graph[toModel].parent][toModel],
					cur = graph[toModel].parent
				for (; graph[cur].parent; )
					path.unshift(graph[cur].parent),
						(fn = link(conversions[graph[cur].parent][cur], fn)),
						(cur = graph[cur].parent)
				return (fn.conversion = path), fn
			}
			module.exports = function (fromModel) {
				const graph = deriveBFS(fromModel),
					conversion = {},
					models = Object.keys(graph)
				for (let len = models.length, i = 0; i < len; i++) {
					const toModel = models[i]
					null !== graph[toModel].parent &&
						(conversion[toModel] = wrapConversion(toModel, graph))
				}
				return conversion
			}
		},
		938: function (module, __webpack_exports__, __webpack_require__) {
			'use strict'
			__webpack_require__.d(__webpack_exports__, 'a', function () {
				return $
			}),
				__webpack_require__.d(__webpack_exports__, 'b', function () {
					return U
				}),
				__webpack_require__.d(__webpack_exports__, 'c', function () {
					return ve
				})
			var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
				react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
					react__WEBPACK_IMPORTED_MODULE_0__
				)
			function l() {
				return (l =
					Object.assign ||
					function (e) {
						for (var r = 1; r < arguments.length; r++) {
							var t = arguments[r]
							for (var o in t)
								Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
						}
						return e
					}).apply(this, arguments)
			}
			function u(e, r) {
				if (null == e) return {}
				var t,
					o,
					n = {},
					a = Object.keys(e)
				for (o = 0; o < a.length; o++)
					r.indexOf((t = a[o])) >= 0 || (n[t] = e[t])
				return n
			}
			var c =
				'undefined' != typeof window
					? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect
					: react__WEBPACK_IMPORTED_MODULE_0__.useEffect
			function i(e) {
				var r = Object(react__WEBPACK_IMPORTED_MODULE_0__.useRef)(e)
				return (
					Object(react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
						r.current = e
					}),
					Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
						return r.current && r.current(e)
					}, [])
				)
			}
			var s,
				f = function (e, r, t) {
					return (
						void 0 === r && (r = 0),
						void 0 === t && (t = 1),
						e > t ? t : e < r ? r : e
					)
				},
				v = function (e) {
					return 'touches' in e
				},
				d = function (e, r) {
					var t = e.getBoundingClientRect(),
						o = v(r) ? r.touches[0] : r
					return {
						left: f((o.pageX - (t.left + window.pageXOffset)) / t.width),
						top: f((o.pageY - (t.top + window.pageYOffset)) / t.height),
					}
				},
				h = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(function (r) {
					var t = r.onMove,
						s = r.onKey,
						f = u(r, ['onMove', 'onKey']),
						h = Object(react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),
						m = Object(react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),
						g = Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
						p = g[0],
						b = g[1],
						_ = i(t),
						C = i(s),
						E = Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
							function (e) {
								e.preventDefault(),
									(v(e) ? e.touches.length > 0 : e.buttons > 0) && h.current
										? _(d(h.current, e))
										: b(!1)
							},
							[_]
						),
						x = Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
							function (e) {
								var r = e.nativeEvent
								r.preventDefault(),
									(function (e) {
										return !(
											(m.current && !v(e)) ||
											(m.current || (m.current = v(e)), 0)
										)
									})(r) && (_(d(h.current, r)), b(!0))
							},
							[_]
						),
						H = Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
							function (e) {
								var r = e.which || e.keyCode
								r < 37 ||
									r > 40 ||
									(e.preventDefault(),
									C({
										left: 39 === r ? 0.05 : 37 === r ? -0.05 : 0,
										top: 40 === r ? 0.05 : 38 === r ? -0.05 : 0,
									}))
							},
							[C]
						),
						N = Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
							function () {
								return b(!1)
							},
							[]
						),
						w = Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
							function (e) {
								var r = e ? window.addEventListener : window.removeEventListener
								r(m.current ? 'touchmove' : 'mousemove', E),
									r(m.current ? 'touchend' : 'mouseup', N)
							},
							[E, N]
						)
					return (
						c(
							function () {
								return (
									w(p),
									function () {
										p && w(!1)
									}
								)
							},
							[p, w]
						),
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
							'div',
							l({}, f, {
								className: 'react-colorful__interactive',
								ref: h,
								onTouchStart: x,
								onMouseDown: x,
								onKeyDown: H,
								tabIndex: 0,
								role: 'slider',
							})
						)
					)
				}),
				m = function (e) {
					return e.filter(Boolean).join(' ')
				},
				g = function (r) {
					var t = r.color,
						o = r.left,
						n = r.top,
						a = void 0 === n ? 0.5 : n,
						l = m(['react-colorful__pointer', r.className])
					return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						'div',
						{
							className: l,
							style: { top: 100 * a + '%', left: 100 * o + '%' },
						},
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', {
							className: 'react-colorful__pointer-fill',
							style: { backgroundColor: t },
						})
					)
				},
				p = function (e, r, t) {
					return (
						void 0 === r && (r = 0),
						void 0 === t && (t = Math.pow(10, r)),
						Math.round(t * e) / t
					)
				},
				b = function (e) {
					return (
						'#' === e[0] && (e = e.substr(1)),
						e.length < 6
							? {
									r: parseInt(e[0] + e[0], 16),
									g: parseInt(e[1] + e[1], 16),
									b: parseInt(e[2] + e[2], 16),
									a: 1,
							  }
							: {
									r: parseInt(e.substr(0, 2), 16),
									g: parseInt(e.substr(2, 2), 16),
									b: parseInt(e.substr(4, 2), 16),
									a: 1,
							  }
					)
				},
				_ = function (e) {
					var r =
						/hsla?\((\d+\.?\d*),\s*(\d+\.?\d*)%?,\s*(\d+\.?\d*)%?,?\s*(\d+\.?\d*)?\)/.exec(
							e
						)
					return r
						? E({
								h: Number(r[1]),
								s: Number(r[2]),
								l: Number(r[3]),
								a: void 0 === r[4] ? 1 : Number(r[4]),
						  })
						: { h: 0, s: 0, v: 0, a: 1 }
				},
				E = function (e) {
					var r = e.s,
						t = e.l
					return {
						h: e.h,
						s:
							(r *= (t < 50 ? t : 100 - t) / 100) > 0
								? ((2 * r) / (t + r)) * 100
								: 0,
						v: t + r,
						a: e.a,
					}
				},
				x = function (e) {
					var r = e.s,
						t = e.v,
						o = e.a,
						n = ((200 - r) * t) / 100
					return {
						h: p(e.h),
						s: p(
							n > 0 && n < 200
								? ((r * t) / 100 / (n <= 100 ? n : 200 - n)) * 100
								: 0
						),
						l: p(n / 2),
						a: p(o, 2),
					}
				},
				H = function (e) {
					var r = x(e)
					return 'hsl(' + r.h + ', ' + r.s + '%, ' + r.l + '%)'
				},
				N = function (e) {
					var r = x(e)
					return 'hsla(' + r.h + ', ' + r.s + '%, ' + r.l + '%, ' + r.a + ')'
				},
				w = function (e) {
					var r = e.h,
						t = e.s,
						o = e.v,
						n = e.a
					;(r = (r / 360) * 6), (t /= 100), (o /= 100)
					var a = Math.floor(r),
						l = o * (1 - t),
						u = o * (1 - (r - a) * t),
						c = o * (1 - (1 - r + a) * t),
						i = a % 6
					return {
						r: p(255 * [o, u, l, l, c, o][i]),
						g: p(255 * [c, o, o, u, l, l][i]),
						b: p(255 * [l, l, c, o, o, u][i]),
						a: p(n, 2),
					}
				},
				q = function (e) {
					var r = /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d+\.?\d*)?\)/.exec(e)
					return r
						? I({
								r: Number(r[1]),
								g: Number(r[2]),
								b: Number(r[3]),
								a: void 0 === r[4] ? 1 : Number(r[4]),
						  })
						: { h: 0, s: 0, v: 0, a: 1 }
				},
				O = function (e) {
					var r = e.toString(16)
					return r.length < 2 ? '0' + r : r
				},
				I = function (e) {
					var r = e.r,
						t = e.g,
						o = e.b,
						n = e.a,
						a = Math.max(r, t, o),
						l = a - Math.min(r, t, o),
						u = l
							? a === r
								? (t - o) / l
								: a === t
								? 2 + (o - r) / l
								: 4 + (r - t) / l
							: 0
					return {
						h: p(60 * (u < 0 ? u + 6 : u)),
						s: p(a ? (l / a) * 100 : 0),
						v: p((a / 255) * 100),
						a: n,
					}
				},
				z = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(function (r) {
					var t = r.hue,
						o = r.onChange,
						n = m(['react-colorful__hue', r.className])
					return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						'div',
						{ className: n },
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
							h,
							{
								onMove: function (e) {
									o({ h: 360 * e.left })
								},
								onKey: function (e) {
									o({ h: f(t + 360 * e.left, 0, 360) })
								},
								'aria-label': 'Hue',
								'aria-valuetext': p(t),
							},
							react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(g, {
								className: 'react-colorful__hue-pointer',
								left: t / 360,
								color: H({ h: t, s: 100, v: 100, a: 1 }),
							})
						)
					)
				}),
				B = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(function (r) {
					var t = r.hsva,
						o = r.onChange,
						n = { backgroundColor: H({ h: t.h, s: 100, v: 100, a: 1 }) }
					return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						'div',
						{ className: 'react-colorful__saturation', style: n },
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
							h,
							{
								onMove: function (e) {
									o({ s: 100 * e.left, v: 100 - 100 * e.top })
								},
								onKey: function (e) {
									o({
										s: f(t.s + 100 * e.left, 0, 100),
										v: f(t.v - 100 * e.top, 0, 100),
									})
								},
								'aria-label': 'Color',
								'aria-valuetext':
									'Saturation ' + p(t.s) + '%, Brightness ' + p(t.v) + '%',
							},
							react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(g, {
								className: 'react-colorful__saturation-pointer',
								top: 1 - t.v / 100,
								left: t.s / 100,
								color: H(t),
							})
						)
					)
				}),
				K = function (e, r) {
					if (e === r) return !0
					for (var t in e) if (e[t] !== r[t]) return !1
					return !0
				},
				A = function (e, r) {
					return e.replace(/\s/g, '') === r.replace(/\s/g, '')
				}
			function D(e, r, l) {
				var u = i(l),
					c = Object(react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
						return e.toHsva(r)
					}),
					s = c[0],
					f = c[1],
					v = Object(react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
						color: r,
						hsva: s,
					})
				Object(react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(
					function () {
						if (!e.equal(r, v.current.color)) {
							var t = e.toHsva(r)
							;(v.current = { hsva: t, color: r }), f(t)
						}
					},
					[r, e]
				),
					Object(react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(
						function () {
							var r
							K(s, v.current.hsva) ||
								e.equal((r = e.fromHsva(s)), v.current.color) ||
								((v.current = { hsva: s, color: r }), u(r))
						},
						[s, e, u]
					)
				var d = Object(react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
					function (e) {
						f(function (r) {
							return Object.assign({}, r, e)
						})
					},
					[]
				)
				return [s, d]
			}
			var L,
				T = function () {
					c(function () {
						if ('undefined' != typeof document && !L) {
							;(L = document.createElement('style')).innerHTML =
								'.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>\')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}'
							var e = s || __webpack_require__.nc
							e && L.setAttribute('nonce', e), document.head.appendChild(L)
						}
					}, [])
				},
				X = function (r) {
					var t = r.className,
						o = r.colorModel,
						n = r.color,
						a = void 0 === n ? o.defaultColor : n,
						c = r.onChange,
						i = u(r, ['className', 'colorModel', 'color', 'onChange'])
					T()
					var s = D(o, a, c),
						f = s[0],
						v = s[1],
						d = m(['react-colorful', t])
					return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						'div',
						l({}, i, { className: d }),
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(B, {
							hsva: f,
							onChange: v,
						}),
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(z, {
							hue: f.h,
							onChange: v,
							className: 'react-colorful__last-control',
						})
					)
				},
				Y = {
					defaultColor: '000',
					toHsva: function (e) {
						return I(b(e))
					},
					fromHsva: function (e) {
						return (t = (r = w(e)).g), (o = r.b), '#' + O(r.r) + O(t) + O(o)
						var r, t, o
					},
					equal: function (e, r) {
						return e.toLowerCase() === r.toLowerCase() || K(b(e), b(r))
					},
				},
				$ = function (r) {
					return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						X,
						l({}, r, { colorModel: Y })
					)
				},
				P = function (r) {
					var t = r.className,
						o = r.hsva,
						n = r.onChange,
						a = {
							backgroundImage:
								'linear-gradient(90deg, ' +
								N(Object.assign({}, o, { a: 0 })) +
								', ' +
								N(Object.assign({}, o, { a: 1 })) +
								')',
						},
						l = m(['react-colorful__alpha', t])
					return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						'div',
						{ className: l },
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', {
							className: 'react-colorful__alpha-gradient',
							style: a,
						}),
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
							h,
							{
								onMove: function (e) {
									n({ a: e.left })
								},
								onKey: function (e) {
									n({ a: f(o.a + e.left) })
								},
								'aria-label': 'Alpha',
								'aria-valuetext': p(100 * o.a) + '%',
							},
							react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(g, {
								className: 'react-colorful__alpha-pointer',
								left: o.a,
								color: N(o),
							})
						)
					)
				},
				R = function (r) {
					var t = r.className,
						o = r.colorModel,
						n = r.color,
						a = void 0 === n ? o.defaultColor : n,
						c = r.onChange,
						i = u(r, ['className', 'colorModel', 'color', 'onChange'])
					T()
					var s = D(o, a, c),
						f = s[0],
						v = s[1],
						d = m(['react-colorful', t])
					return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						'div',
						l({}, i, { className: d }),
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(B, {
							hsva: f,
							onChange: v,
						}),
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(z, {
							hue: f.h,
							onChange: v,
						}),
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(P, {
							hsva: f,
							onChange: v,
							className: 'react-colorful__last-control',
						})
					)
				},
				Q = {
					defaultColor: 'hsla(0, 0%, 0%, 1)',
					toHsva: _,
					fromHsva: N,
					equal: A,
				},
				U = function (r) {
					return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						R,
						l({}, r, { colorModel: Q })
					)
				},
				fe = {
					defaultColor: 'rgba(0, 0, 0, 1)',
					toHsva: q,
					fromHsva: function (e) {
						var r = w(e)
						return 'rgba(' + r.r + ', ' + r.g + ', ' + r.b + ', ' + r.a + ')'
					},
					equal: A,
				},
				ve = function (r) {
					return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						R,
						l({}, r, { colorModel: fe })
					)
				}
		},
	},
])
