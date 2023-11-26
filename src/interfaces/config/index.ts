
interface ApiConfigProps {
 apiUrl: string
 httpTimeout: number
}

export interface ConfigProps {
 port: number
 api: ApiConfigProps

}