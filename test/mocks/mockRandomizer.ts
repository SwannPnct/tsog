import {afterAll, vi} from 'vitest'
import * as randomizer from '../../src/helpers/randomizer'

export const mockRandomizer = () => {
	const randomStringMock = vi.spyOn(randomizer, 'randomString').mockReturnValue('string-string-string-string-string')
	const randomNumberMock = vi.spyOn(randomizer, 'randomNumber').mockReturnValue(1)
	const randomBooleanMock = vi.spyOn(randomizer, 'randomBoolean').mockReturnValue(true)
	const randomArrayMock = vi.spyOn(randomizer, 'randomArray').mockReturnValue(Array(2))
	const randomPickMock = vi.spyOn(randomizer, 'randomPick').mockImplementation((array) => array[0])

	afterAll(() => {
		randomStringMock.mockRestore()
		randomNumberMock.mockRestore()
		randomBooleanMock.mockRestore()
		randomArrayMock.mockRestore()
		randomPickMock.mockRestore()
	})

	return {
		randomStringMock,
		randomNumberMock,
		randomBooleanMock,
		randomArrayMock,
		randomPickMock
	}
}