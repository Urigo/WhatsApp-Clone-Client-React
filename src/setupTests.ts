import 'jest-dom/extend-expect'
import { GlobalWithFetchMock } from 'jest-fetch-mock'
import { act } from 'react-testing-library'

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock
customGlobal.fetch = require('jest-fetch-mock')
customGlobal.fetchMock = customGlobal.fetch
