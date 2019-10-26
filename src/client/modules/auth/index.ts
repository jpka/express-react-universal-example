export interface AuthState {
	token?: string
	user?: {
		id: string
		name: string
		username: string
	}
}

export interface LoginData {
	username: string
	password: string
}
