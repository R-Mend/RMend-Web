import configureMockStore from 'redux-mock-store';
import thunkMiddlewear from 'redux-thunk';
import { reportConstants } from '../constants';

const mockStore = configureMockStore([thunkMiddlewear]);
const apiUrl = process.env.REACT_APP_API_URL;


// Action Tests
import fetchMock from 'fetch-mock';
import { reportActions } from '../actions';

describe('When getReports is called', () => {
    afterEach(() => { fetchMock.restore(); });

    it('creates the GET_REPORT_SUCCESS action when done', async () => {
        
        fetchMock.get(`${apiUrl}/reports/`, {
            body: [],
            headers: { 'content-type': 'application/json' }
        });

        const expectedActions = [
            {type: reportConstants.GET_REPORTS_REQUEST},
            {type: reportConstants.GET_REPORTS_SUCCESS, reports: []}
        ];

        const store = mockStore({ reports: [] });
        await store.dispatch(reportActions.getReports({
            'longitude': -86.62170408951287, 
            'latitude': 36.57142381906437}
        ));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe('When getAdminReports is called', () => {
    afterEach(() => { fetchMock.restore(); });

    it('creates the GET_ADMIN_REPORT_SUCCESS action when done', async () => {
        
        fetchMock.get(`${apiUrl}/authority/123456789/reports/`, {
            body: [],
            headers: { 'content-type': 'application/json' }
        });

        const expectedActions = [
            {type: reportConstants.GET_ADMIN_REPORTS_REQUEST},
            {type: reportConstants.GET_ADMIN_REPORTS_SUCCESS, reports: []}
        ];

        const store = mockStore({ reports: [] });
        await store.dispatch(reportActions.getAdminReports(123456789));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe('When createReport is called', () => {
    afterEach(() => { fetchMock.restore(); });

    it('creates the CREATE_REPORT_SUCCESS action when done', async () => {

        fetchMock.post(`${apiUrl}/reports/create`, {
            body: {
                sender_name: 'Test Name',
                sender_email: 'test@email.com',
                sender_phone: '123456789'
            },
            headers: { 'content-type': 'application/json' }
        });

        const expectedActions = [
            {type: reportConstants.CREATE_REPORT_REQUEST},
            {
                type: reportConstants.CREATE_REPORT_SUCCESS, 
                report: {
                    sender_name: 'Test Name',
                    sender_email: 'test@email.com',
                    sender_phone: '123456789'
                }
            }
        ];

        const store = mockStore({reports: [], isUpdated: false});
        await store.dispatch(reportActions.createReport({
            sender_name: 'Test Name',
            sender_email: 'test@email.com',
            sender_phone: '123456789'
        }));
        expect(store.getActions()).toEqual(expectedActions)
    });
});

describe('When updateReport is called', () => {
    afterEach(() => { fetchMock.restore(); });

    it('creates the UPDATE_REPORT_SUCCESS action when done', async () => {

        fetchMock.put(`${apiUrl}/authority/123456789/reports/123456789/update`, {
            body: {
                sender_name: 'Test Name',
                sender_email: 'test@email.com',
                sender_phone: '123456789'
            },
            headers: {'content-type': 'application/json'}
        });

        const expectedActions = [
            {type: reportConstants.UPDATE_REPORT_REQUEST},
            {
                type: reportConstants.UPDATE_REPORT_SUCCESS,
                report: {
                    sender_name: 'Test Name',
                    sender_email: 'test@email.com',
                    sender_phone: '123456789'
                }
            }
        ];

        const store = mockStore({reports: [], isUpdated: false});
        await store.dispatch(reportActions.updateReport(
            123456789,
            {
                id: 123456789,
                sender_name: 'Test Name',
                sender_email: 'test@email.com',
                sender_phone: '123456789'
            }
        ));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe('When deleteReport is called', () => {
    afterEach(() => { fetchMock.restore(); });

    it('creates the DELETE_REPORT_SUCCESS action when done', async () => {

        fetchMock.delete(`${apiUrl}/authority/123456789/reports/123456789/delete`, {
            body: 123456,
            headers: {'content-type': 'application/json'}
        });

        const expectedActions = [
            {type: reportConstants.DELETE_REPORT_REQUEST},
            {type: reportConstants.DELETE_REPORT_SUCCESS, reportId: 123456}
        ];
      
        const store = mockStore({reports: [], isUpdated: false});
        await store.dispatch(reportActions.deleteReport(123456789, 123456789));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

// Reducer Tests
import { report } from '../reducers/report.reducer.js';

describe('When reducer is given an action', () => {
    it('should return the initial state by default', () => {
        expect(report(undefined, {})).toEqual({
            reports: [],
            isUpdated: false,
        });
    });

    it('should update state when a GET_..._SUCCESS action is created', () => {
        expect(report(
            {
                reports: [], 
                isUpdated: false
            }, 
            {
                type: reportConstants.GET_REPORTS_SUCCESS,
                reports: [{name: 'test1', name: 'test2', name: 'test3'}]
            }
        )).toEqual({
            reports: [{name: 'test1', name: 'test2', name: 'test3'}],
            isUpdated: true
        });

        expect(report(
            {
                reports: [], 
                isUpdated: false
            }, 
            {
                type: reportConstants.GET_ADMIN_REPORTS_SUCCESS,
                reports: [{name: 'test1', name: 'test2', name: 'test3'}]
            }
        )).toEqual({
            reports: [{name: 'test1', name: 'test2', name: 'test3'}],
            isUpdated: true
        });
    });

    it('should add a report when a CREATE_REPORT_SUCCESS action is created', () => {
        expect(report(
            { 
                reports: [{name: 'test1'}] 
            },
            {
                type: reportConstants.CREATE_REPORT_SUCCESS,
                report: {name: 'test2'}
            }
        )).toEqual({
            reports: [{name: 'test1'}, {name: 'test2'}]
        });
    });

    it('should update a report when a UPDATE_REPORT_SUCCESS action is created', () => {
        expect(report(
            { 
                reports: [{id: 12345, name: 'test1'}] 
            },
            {
                type: reportConstants.UPDATE_REPORT_SUCCESS,
                report: {id: 12345, name: 'test2'}
            }
        )).toEqual({
            reports: [{id: 12345, name: 'test2'}]
        });
    });

    it('should remove a report when a DELETE_REPORT_SUCCESS action is created', () => {
        expect(report(
            {
                reports: [{id: 123456, name:'test1'}]
            },
            {
                type: reportConstants.DELETE_REPORT_SUCCESS,
                reportId: 123456
            }
        )).toEqual({
            reports: []
        });
    });
});