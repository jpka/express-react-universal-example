import Cookies from 'universal-cookie'

const cookieSvc = {
	cookies: new Cookies(),
	init(customCookies?: string) {
		this.cookies = new Cookies(customCookies)
	}
}

export default cookieSvc
