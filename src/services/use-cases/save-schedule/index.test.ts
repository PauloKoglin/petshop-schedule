import { LoadSchedule, SaveSchedule } from "../../../domain/use-cases"
import { SaveScheduleInCache } from ".."
import { CacheStorage } from '../../contracts'

import { mock, MockProxy } from 'jest-mock-extended'
import { Guid } from "../../../domain/use-cases/guid"

describe('SaveScheduleInCache', () => {
    let sut: SaveSchedule
    let cacheMock: MockProxy<CacheStorage>
    let loadScheduleMock: MockProxy<LoadSchedule>
    let guidMock: MockProxy<Guid>
    
    beforeEach(() => {
        cacheMock = mock()
        guidMock = mock()
        loadScheduleMock = mock()
        loadScheduleMock.loadAll.mockResolvedValue([{
            id: '',
            petName: 'any_value',
            ownerName: 'any_value',
            startDate: new Date(),
            endDate: new Date(),
            services: []
        }])
        sut = new SaveScheduleInCache(cacheMock, loadScheduleMock, guidMock)
    })

    it('should call cache get once', async () => {
        const input: SaveSchedule.Input = {
            id: '',
            petName: 'any_value',
            ownerName: 'any_value',
            startDate: new Date(),
            endDate: new Date(),
            services: []
        }

        await sut.perform(input)

        expect(loadScheduleMock.loadAll).toBeCalledTimes(1)
    })

    it('should add input to returned by loadAll', async () => {
        const input: SaveSchedule.Input = {
            id: '',
            petName: 'any_value',
            ownerName: 'any_value',
            startDate: new Date('2022-01-01'),
            endDate: new Date('2022-01-02'),
            services: []
        }
        const existingSchedule: SaveSchedule.Input = {
            id: 'any_id',
            petName: 'existing_pet',
            ownerName: 'existing_owner',
            startDate: new Date('2022-01-01'),
            endDate: new Date('2022-01-02'),
            services: []
        }
        const expected = [existingSchedule, {...input, id: 'any_guid'}]
        cacheMock.set.mockImplementation()
        loadScheduleMock.loadAll.mockResolvedValueOnce([existingSchedule])
        guidMock.generate.mockReturnValueOnce('any_guid')

        await sut.perform(input)

        expect(cacheMock.set).toBeCalledTimes(1)
        expect(cacheMock.set).toBeCalledWith('schedules', expected)
    })

    it('should call guid.generate once if no id is provided', async () => {
        const input: SaveSchedule.Input = {
            id: '',
            petName: 'any_value',
            ownerName: 'any_value',
            startDate: new Date(),
            endDate: new Date(),
            services: []
        }
        guidMock.generate.mockImplementation()

        await sut.perform(input)

        expect(guidMock.generate).toBeCalledTimes(1)
    })

    it('should call save existing schedule if valid id is provided', async () => {
        const input: SaveSchedule.Input = {
            id: 'any_valid_id',
            petName: 'new_petname',
            ownerName: 'any_value',
            startDate: new Date(),
            endDate: new Date(),
            services: []
        }
        guidMock.generate.mockImplementation()
        loadScheduleMock.loadAll.mockResolvedValueOnce([{
            id: 'any_valid_id',
            petName: 'old_petname',
            ownerName: 'any_value',
            startDate: new Date(),
            endDate: new Date(),
            services: []
        }])

        await sut.perform(input)

        expect(cacheMock.set).toBeCalledTimes(1)
        expect(cacheMock.set).toBeCalledWith('schedules', [input])
    })
})