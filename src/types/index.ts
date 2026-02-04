export type RecordType = 'LDAP' | 'Локальная'

export interface TagObject {
  text: string
}

export interface AccountRecord {
  id: string
  tags: TagObject[]
  type: RecordType
  login: string
  password: string | null
}
